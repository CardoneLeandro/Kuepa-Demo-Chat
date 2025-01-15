import mongoose, { Schema, Document } from "mongoose";

export interface IMessage extends Document {
  userId: mongoose.Types.ObjectId;
  userName: string;
  role: string;
  content: string;
  date: Date;
}

const MessageSchema = new Schema<IMessage>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  userName: { type: String, required: true },
  role: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

export default mongoose.model<IMessage>("Message", MessageSchema);
