'use client'
import { useEffect, useState } from "react";
import Chat from "../components/chat/chat";
import { useNavigate } from "react-router-dom";
import { UserCredentials } from "../types/user.types";
import Stream from "../components/stream/stream";
import 'bootstrap/dist/css/bootstrap.min.css';
import './page.style.css';

const ClassPage = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState<UserCredentials | null>(null);
  useEffect(() => {
    const storedCredentials = localStorage.getItem("credentials");
    if (!storedCredentials) {
      navigate("/");
    } else {
      setCredentials(JSON.parse(storedCredentials));
    }
  }, [navigate]);

 

  if (!credentials) {
    return <div>Cargando...</div>;
  }
  return (
    <div className="streamPage">
        <Stream />
        <Chat credentials={credentials}/>
    </div>
  );
};

export default ClassPage;
