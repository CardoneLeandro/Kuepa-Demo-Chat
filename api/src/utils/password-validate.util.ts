import bcrypt from 'bcrypt'
import { IUser } from '../models/user.model'

export const passwordValidate = async (user:IUser, password:string):Promise<boolean> => {
    const passwordMatch = await bcrypt.compare(password, user.password);
    return passwordMatch
} 