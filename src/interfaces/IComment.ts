import { IProfile } from "./IProfile";

export interface IComment {
  id: number;
  creator: IProfile;
  target: IProfile;
  text: string;
  createDate: Date;
  updateDate: Date;
  version: number;
}

export interface IRequestComment {
  getParams: {
    creator?: number;
    target: number;
    text?: string;
  }
}
