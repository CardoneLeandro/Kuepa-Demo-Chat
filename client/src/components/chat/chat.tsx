import axios from "axios";
import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { Message, User} from "../../types/message.types";
import { UserCredentials } from "../../types/user.types";
import "bootstrap/dist/css/bootstrap.min.css";
import "./chat.style.css";


const socket = io("http://localhost:5001");

const Chat: React.FC<{ credentials: UserCredentials; }> = ({
  credentials
}) => {
  const [view, setView] = useState<"live" | "history">("live");
  const [messages, setMessages] = useState<Message[]>([]);
  const [history, setHistory] = useState<Message[]>([]);
  const [role, setRole] = useState<"user" | "moderator">("user");
  console.log(role);
  const [newMessage, setNewMessage] = useState<string>("");
  const [userSelected, setUserSelected] = useState<string>("");
  const [users, setUsers] = useState<User[] | undefined >(undefined);

  useEffect(() => {
    socket.on("receive_message", (message: Message) => {
      setMessages((prevMessages) => [message, ...prevMessages]);

      if (view === "history" && userSelected === message.user.userId) {
        setHistory((prevHistory) => [message, ...prevHistory]);
      }
    });

    return () => {
      socket.off("receive_message");
    };
  }, [view, userSelected, history]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        user: {
          userId: credentials.id,
          userName: credentials.userName,
          role: credentials.role,
        },
        date: new Date(),
        content: newMessage,
      };
      socket.emit("send_message", message);
      setNewMessage("");
    }
  };

  const handleGetHistory = async (userSelected: string) => {
    const data = {
      userSelected,
      role: credentials.role,
    };
    try {
      const response = await axios.post(
        "http://localhost:5001/messages/",
        data
      );
      if (response.status !== 200) {
        throw new Error("Error fetching history");
      }
      if (!response.data) {
        throw new Error("No history found");
      } else {
        setRole(response.data.role);
        setHistory(
          response.data.messages.reverse().map((item: any) => {
            return {
              user: {
                usernName: userSelected,
                role: data.role,
                userId: userSelected,
              },
              date: item.date,
              content: item.content,
            };
          })
        );
      }
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  const getUsers = async () => {
    try {
      const response = await axios.post("http://localhost:5001/users/get-users");
      setUsers(response.data.users);
    } catch (error) {
      console.error(error);
    }
  };

  const uniqueUsersMap = new Map();
  messages.forEach((msg) => {
    uniqueUsersMap.set(msg.user.userId, {
      id: msg.user.userId,
      userName: msg.user.userName,
    });
  });

  const formatMessage = (message: Message) => {
    const userRole = message.user.role === "moderator" ? ` (moderador)` : "";
    return (
      <div
        key={message.date.toString()}
        className={`card ${
          message.user.userId === credentials.id ? "sent" : "received"
        }`}
      >
        <div className="card-header">{message.user.userName}</div>
        <div className="card-body">
          <blockquote className="blockquote mb-0">
            <p>{message.content}</p>
            <footer className="blockquote-footer">
              {new Date(message.date).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true })}
              <cite title="Source Title">{userRole}</cite>
            </footer>
          </blockquote>
        </div>
      </div>
    );
  };

  return (
    <div className="chatContainer">
      {view === "history" ? (
        <div className="chatToggle">
          <form
            style={{ width: "100%" }}
            onSubmit={(e) => {
              e.preventDefault();
              handleGetHistory(userSelected);
            }}
          >
            <select
              style={{ width: "80%", borderRadius: "4px" }}
              title="Select User"
              onChange={(e) => setUserSelected(e.target.value)}
              value={userSelected}
            >
              <option disabled value="">
                Select User
              </option>
              {users && users.map((user: any) => (
                <option key={user._id} value={user._id}>
                  {user.userName}
                </option>
              ))}
            </select>
            <button style={{ marginLeft: "8px", padding: "8px" }} type="submit">
              Buscar
            </button>
          </form>
        </div>
      ) : null}
      <div className="chatBox">
        {view === "history"
          ? history.map(formatMessage)
          : messages.map(formatMessage)}
      </div>
      <div className="inputBox">
        <input
          style={{ width: "100%" }}
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
          placeholder="Escribe un mensaje..."
        />
        <button style={{ padding: "16px" }} onClick={handleSendMessage}>
          Enviar
        </button>
        {credentials.role === "moderator" && (
          <button
            className="toggleButton"
            onClick={() => {
              getUsers();
              setView(view === "history" ? "live" : "history");
              setHistory([]);
            }}
          >
            {view === "history" ? "Live Chat" : "History"}
          </button>
        )}
      </div>
    </div>
  );
};
export default Chat;
