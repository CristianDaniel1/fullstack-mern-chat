import { Request, Response } from 'express';
import { UserModel } from '../../models/user.model';
import { bcryptAdapter } from '../../config/bcript.adapter';
import { generateToken } from '../../utils/jwt';
import cloudinary from '../../config/cloudinary';

export class AuthController {
  constructor() {}

  public signup = async (req: Request, res: Response): Promise<any> => {
    try {
      const { fullName, email, password } = req.body;

      if (!fullName || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      if (password.length < 6) {
        return res
          .status(400)
          .json({ message: 'Password must be at least 6 characters' });
      }

      const user = await UserModel.findOne({ email });

      if (user)
        return res.status(400).json({ message: 'Email already exists' });

      const hashedPassword = bcryptAdapter.hash(password);

      const newUser = new UserModel({
        fullName,
        email,
        password: hashedPassword,
      });

      if (!newUser) {
        res.status(400).json({ message: 'Invalid user data' });
      }

      generateToken({ id: newUser.id }, res);

      await newUser.save();

      res.status(201).json({
        id: newUser.id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } catch (error: any) {
      console.error('Error in signup controller', error.message);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  public login = async (req: Request, res: Response): Promise<any> => {
    try {
      const { email, password } = req.body;

      const user = await UserModel.findOne({ email });

      if (!user)
        return res.status(400).json({ message: 'Invalid credentials' });

      const isMatching = bcryptAdapter.compare(password, user.password);

      if (!isMatching)
        return res.status(400).json({ message: 'Invalid credentials' });

      generateToken({ id: user.id }, res);

      res.status(200).json({
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        profilePic: user.profilePic,
      });
    } catch (error: any) {
      console.error('Error in login controller', error.message);

      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  public logout = async (req: Request, res: Response): Promise<any> => {
    try {
      res
        .clearCookie('access_token')
        .status(200)
        .json({ message: 'Logged out successfully' });
    } catch (error: any) {
      console.error('Error in logout controller', error.message);

      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  public updateProfile = async (req: Request, res: Response): Promise<any> => {
    try {
      const { profilePic, user } = req.body;

      if (!profilePic)
        return res.status(400).json({ message: 'Profile pic is required' });

      const upload = await cloudinary.uploader.upload(profilePic);

      const updatedUser = await UserModel.findByIdAndUpdate(
        user,
        {
          profilePic: upload.secure_url,
        },
        { new: true }
      );

      res.status(200).json({ user: updatedUser });
    } catch (error: any) {
      console.error('Error in updateProfile controller', error.message);

      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  public checkAuth = async (req: Request, res: Response) => {
    try {
      const { user } = req.body;

      const { id, email, fullName, profilePic, createdAt, updatedAt } = user;

      res
        .status(200)
        .json({ id, email, fullName, profilePic, createdAt, updatedAt });
    } catch (error: any) {
      console.error('Error in checkAuth controller', error.message);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
}
