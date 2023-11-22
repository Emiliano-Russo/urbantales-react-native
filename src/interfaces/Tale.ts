import { IUser } from "./User";

export interface ITale {
  id: string;
  title: string;
  category: string;
  narrative: string;
  image: string;
  latitude: string;
  longitude: string;
  createdAt: Date;
  isAnonymous: boolean;
  mark: string;
  likesCount: number;
  dislikesCount: number;
  user?: IUser; //we need this one (the user who created the tale)
  reactions?: ITaleReaction[]; //we dont need this cause we got likecounts and dislikescount
  reports?: ITaleReport[]; // we dont need this one
  reads: ITaleRead[]; //if we wanna show how many people read it (maybe we need a number)
}

export interface ITaleCreate {
  title: string;
  image: string;
  narrative: string;
  category: string;
  latitude: string;
  longitude: string;
  isAnonymous: boolean;
  mark: string;
}

export interface ITaleRead {
  id: string;
  user: IUser;
  tale: ITale;
}

export interface ITaleMini {
  id: string;
  title: string;
  image: string;
}

export interface ITaleReport {
  id: string;
  tale: ITale;
  user: IUser;
  reason: string;
  createdAt: Date;
}

//probably never gonna use this one
export interface ITaleReaction {
  id: string;
  user: IUser;
  tale: ITale;
  type: ReactionType;
  createdAt: Date;
}

export enum ReactionType {
  LIKE = "like",
  DISLIKE = "dislike",
}
