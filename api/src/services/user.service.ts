import User, { IUser } from "../models/user.model";
import bcrypt from "bcrypt";
import { JWTS } from "../config/var.config";
import { user_login, user_register } from "../interfaces/user.interfaces";
import { USERS_ROLES } from "../config/roles.config";
import { passwordValidate } from "../utils/password-validate.util";

export const registerUser = async (params: user_register) =>
    {
  const existingUser = await User.findOne({ userName: params.userName });
  if (existingUser) {
    throw new Error("user already exists");
  }
  if (!params.role) {
    params.role = USERS_ROLES.USER;
  }
  const { password, ...rest } = params;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ ...rest, password: hashedPassword });
  await user.save();
  return;
};

export const loginUser = async (params: user_login) => {
  console.log('CONTROLADOR DE USUARIOS', {'params': params})
  const user = await User.findOne({ userName: params.userName }).select('+password');
  console.log('CONTROLADOR DE USUARIOS', {'user': user})
  if (!user) {
    throw new Error("invalid credentials");
  }
  const passwordMatch = await passwordValidate(user, params.password);
  if (!passwordMatch) {
    throw new Error("invalid credentials");
  }
  const credentials = {
    id: user._id,
    userName: user.userName,
    fullName: user.fullName,
    role: user.role,}
  return credentials;
};

export const getAllUsers = async () => {
  const users = User.find({})
  return users;
};
