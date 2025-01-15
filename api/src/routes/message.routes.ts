import { Router } from 'express';
import { getUserMessages } from '../controllers/message.controller';


const messageRouter = Router();

messageRouter.post("/", getUserMessages);

export default messageRouter;