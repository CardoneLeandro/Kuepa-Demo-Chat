import { Router } from 'express';
import { register, login, getUsers } from '../controllers/user.controller';
import { RegisterUserDto } from '../dtos/user-register.dto';
import { validateDto } from '../middlewares/dto-validator';
import { LoginUserDto } from '../dtos/user-login.dto';

const userRouter = Router();

userRouter.post("/register", validateDto(RegisterUserDto), register);
userRouter.post('/login',validateDto(LoginUserDto), login);
userRouter.post('/get-users', getUsers);

export default userRouter;