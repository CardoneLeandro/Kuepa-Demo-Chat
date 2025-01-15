import mongoose from "mongoose";
export interface SaveMessageParams {
  userId: mongoose.Types.ObjectId;
  userName: string;
  role: string;
  content: string;
}
