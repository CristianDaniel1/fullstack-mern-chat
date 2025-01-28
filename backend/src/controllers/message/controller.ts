import { Request, Response } from 'express';
import { UserModel } from '../../models/user.model';
import { MessageModel } from '../../models/message.model';
import cloudinary from '../../config/cloudinary';
import { getReceiverSocketId, io } from '../../utils/socket';

export class MessageController {
  constructor() {}

  public getAllUsers = async (req: Request, res: Response): Promise<any> => {
    try {
      const loggedInUser = req.body.user;

      const users = await UserModel.find({ _id: { $ne: loggedInUser } });

      res.status(200).json(users);
    } catch (error: any) {
      console.error('Error in getAllUsers: ', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  public getMessages = async (req: Request, res: Response): Promise<any> => {
    try {
      const { id: receiverId } = req.params;

      const senderId = req.body.user;

      const messages = await MessageModel.find({
        $or: [
          { senderId, receiverId },
          { senderId: receiverId, receiverId: senderId },
        ],
      });

      res.status(200).json(messages);
    } catch (error: any) {
      console.error('Error in getMessages: ', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  public sendMessage = async (req: Request, res: Response): Promise<any> => {
    try {
      const { text, image, user } = req.body;
      const { id: receiverId } = req.params;

      const senderId = user.id;

      let imageUrl: string | undefined;

      if (image) {
        const upload = await cloudinary.uploader.upload(image);
        imageUrl = upload.secure_url;
      }

      const newMessage = new MessageModel({
        senderId,
        receiverId,
        text,
        image: imageUrl,
      });

      await newMessage.save();

      const receiverSocketId = getReceiverSocketId(receiverId);

      if (receiverSocketId) {
        io.to(receiverSocketId).emit('newMessage', newMessage);
      }

      res.status(201).json(newMessage);
    } catch (error: any) {
      console.error('Error in sendMessage: ', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
}
