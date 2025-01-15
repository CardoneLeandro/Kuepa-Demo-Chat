import mongoose, { Schema, Document } from 'mongoose';
import { USERS_ROLES } from '../config/roles.config';

export interface IUser extends Document {
  fullName: string;
  userName: string;
  password: string;
  role: USERS_ROLES;
}

const UserSchema = new Schema<IUser>(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      minlength: 4,
      maxlength: 50,
    },
    userName: {
      type: String,
      required: true,
      trim: true,
      minlength: 4,
      maxlength: 50,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      required: true,
      enum: Object.values(USERS_ROLES),
      default: USERS_ROLES.USER,
    },
  },
  { timestamps: true },
 
  
);

export default mongoose.model<IUser>('User', UserSchema);