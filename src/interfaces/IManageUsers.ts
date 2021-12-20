import { IProfile } from "./IProfile";
import { IComment, IRequestComment } from "./IComment";
import { IScedualPayment, IRequestGetScedualPayment } from "./IScedualPayment";

export interface IManageUsersProps {
  user: IProfile;
  allUsers: IProfileWithChildren[];
  userTree: IProfile[];
  usersLoaded: boolean;
  comment: IComment;
  scedualPayment: IScedualPayment;
  history: any;
  onUserSelect: (name: string) => void;
  manageUsersRequest(): void;
  manageUsersExpansion(users: IProfileWithChildren[]): void;
  commentRequest(params: IRequestComment): void;
  commentSuccess(params: object): void;
  scedualPaymentRequest(params: IRequestGetScedualPayment): void;
  scedualPaymentSuccess(params: object): void;
  translate(text: string): string;
}

export interface IProfileWithChildren extends Omit<IProfile, "parent"> {
  parent: IProfileWithChildren;
  children: IProfileWithChildren[];
  _isShow: boolean;
  _isShowChildren: boolean;
}

export interface IManageUsersState {
  permissionLevel: number;
  userData: any;
  createUserIsOpen: boolean;
  userBalanceIsOpen: boolean;
  userBanIsOpen: boolean;
  cashbackIsOpen: boolean;
  profitIsOpen: boolean;
  limitIsOpen: boolean;
  scedualPaymentIsOpen: boolean;
  changePasswordIsOpen: boolean;
  amountPerPage: number;
  changeCommentIsOpen: boolean;
  searchLogin: string;
  searchedUserId: number;
}

export interface IUserRequestCreate {
  login: string;
  password: string;
  permissionLevel: number;
  name: string;
  balance: number;
  cashbackPercent: number;
  providerMaxLimit?: number;
  parent?: IProfile;
}

export interface IRequestBanUser {
  userId: number;
  userStatus: number;
}

export interface IRequestCashback {
  userId: number;
  cashbackPercent: number;
}

export interface IRequestProfit {
  userId: number;
  profitPercent: number;
}

export interface IRequestProviderMaxLimit {
  userId: number;
  providerMaxLimit: number;
}

export interface IRequestChangePassword {
  userId: number;
  newPassword: string;
  confirmPassword: string;
}
