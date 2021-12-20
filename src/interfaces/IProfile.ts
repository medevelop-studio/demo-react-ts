export interface IResponseLogin {
  ACCESS_TOKEN: string;
  user: IProfile;
}

export interface IProfile {
  id: number;
  login: string;
  permissionLevel: number;
  name: string;
  balance: number;
  cashbackPercent: number;
  cashbackBalance: number;
  scedualPaymentBalance: number;
  providerMaxLimit: number;
  parent?: IProfile;
  status: number;
  createDate: Date;
  updateDate: Date;
  version: number;
}

export interface IUserData {
  userId: number;
  name: string;
  cashbackPercent?: number;
  profitPercent?: number;
  providerMaxLimit?: number;
}

export interface IHandlerStatus {
  status: string;
  message: string
};
