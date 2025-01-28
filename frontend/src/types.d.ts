export type UserAuth = {
  id: string;
  email: string;
  fullName: string;
  profilePic: string;
  createdAt: string;
  updatedAt: string;
};

export type LoginData = {
  email: string;
  password: string;
};

export type SignupData = {
  fullName: string;
} & LoginData;

export type FormDataType = {
  'full-name': string;
} & LoginData;

export type MessageInfo = {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
};
