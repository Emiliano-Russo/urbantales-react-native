import { ITale, ITaleRead, ITaleReport } from "./Tale";

export interface IUser {
  id: string;
  createdAt: Date;
  lastLogin: Date;
  provider: string;
  googleId?: string;
  name: string;
  email: string;
  fcmToken: string;
  //profileImage: string;
  emailVerified: boolean;
  tales?: ITale[];
  taleReports?: ITaleReport[];
  taleReads: ITaleRead[];
  subscription?: ISubscription;
}

export interface ISubscription {
  id: string;
  status: string;
  type: string;
  startDate: Date;
  endDate: Date;
  lastPaymentDate: Date;
  nextPaymentDate: Date;
  paymentMethod: string;
  paymentReceipt: string;
  autoRenew: boolean;
  user: IUser;
}

export interface IUpdateUserDto {
  name?: string;
}

export interface IUserCreateDto {
  name: string;
  email: string;
  password: string;
  provider: string;
  googleId?: string;
}

export interface IUserLoginResponseDto {
  accessToken: string;
  user: IUser;
}
