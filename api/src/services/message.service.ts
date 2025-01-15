import Message from "../models/message.model";
import User from "../models/user.model";
import { SaveMessageParams } from "../interfaces/message.interfaces";
import mongoose from "mongoose";

interface IResponseMessage {
  userName: string;
  date: Date;
  content: string;
}

interface IResponse {
  role: string;
  messages: IResponseMessage[];
}

export const getMessages = async (
  userId: mongoose.Types.ObjectId
): Promise<IResponse | undefined> => {
  const user = await User.findById(userId);

  if (!user) {
    console.log('Usuario no encontrado');
    return undefined;
  }

  const messages = await Message.find({ userId });

  const formattedMessages: IResponseMessage[] = messages.map((msg) => ({
    userName: msg.userName,
    date: msg.date,
    content: msg.content,
  }));

  const response = {
    role: user.role,
    messages: formattedMessages,
  };

  console.log(response);
  return response;
};

export const saveMessage = async ({
  userId,
  userName,
  role,
  content,
}: SaveMessageParams) => {
  const message = new Message({ userId, userName, role, content });
  await message.save();
};
