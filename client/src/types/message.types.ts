export interface User {
  userName: string;
  role: "user" | "moderator";
  userId: string;
}
export interface History {
  userName: string;
  date: Date;
  content: string;
}
export interface Message {
  user: User;
  date: Date;
  content: string;
}
