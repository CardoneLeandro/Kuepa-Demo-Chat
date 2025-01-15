import { Request, Response } from "express";
import { registerUser, loginUser, getAllUsers } from "../services/user.service";

export const register = async (req: Request, res: Response): Promise<any> => {
  console.log('1')
  const { fullName, userName, password, confirmPassword, role } = req.body;
  if (password !== confirmPassword) {
    return res.status(401).json({ message: "Passwords do not match" });
  }
  try {
    await registerUser({ fullName, userName, password, role });
    return res.status(201).json({ message: "Register Successfully" });
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const login = async (req: Request, res: Response): Promise<any> => {
  const { userName, password } = req.body;
  try {
    const credentials = await loginUser({ userName, password });
    return res.status(200).json({ credentials });
  } catch (error) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
};

export const getUsers = async (req: Request, res: Response): Promise<any> => {
  try {
    const users = await getAllUsers();
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
};
