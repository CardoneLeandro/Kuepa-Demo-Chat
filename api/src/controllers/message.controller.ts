import { Request, Response } from "express";
import { getMessages } from "../services/message.service";

export const getUserMessages = async (
  req: Request,
  res: Response
): Promise<any> => {
  console.log('1')
  const { userSelected, role } = req.body;
  console.log('2', userSelected, role)
  const userId = userSelected;

  if (role !== "moderator") {
    console.log('3')
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    console.log('4')
    const messages = await getMessages(userId);

    console.log('5')
    return res.status(200).json( messages );
  } catch (error) {
    console.log('6')
    return res.status(404).json({ message: (error as Error).message });
  }
};
