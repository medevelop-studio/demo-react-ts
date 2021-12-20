import { IEvoGame } from './IEvoGames';
import { IProfile, IHandlerStatus } from "./IProfile";

export interface IBalance {
  user: IProfile;
  balanceHistory: IBalanceGet;
  balanceLoaded: boolean;
  gamesList: IEvoGame[];
  handlerStatus: IHandlerStatus;
  translate(text: string): string;
  balanceHistoryRequest(getParams: IRequestHistoryBalance): void;
  gamesRequest(): void;
}

export interface IBalanceGet {
  totalCount: number;
  pageNumber: number;
  amountPerPage: number;
  data: {
    balances: IBalanceGetResponse[];
    profitAmount: number;
  };
}

export interface IBalanceHistory {
  data: {
    balances: IBalanceGetResponse[];
    profitAmount: number;
  };
  balanceLoaded: boolean;
}

export interface IBalanceHistoryResponse {
  totalCount: number;
  pageNumber: number;
  amountPerPage: number;
  data: {
    balances: IBalanceGetResponse[];
    profitAmount: number;
  };
}

export interface IBalanceGetResponse {
  id: number;
  type: number;
  creator: IProfile;
  target: IProfile;
  playerCashback: IProfile;
  amount: number;
  providerTransactionId: number;
  providerGameId: number;
  providerGameName?: string;
  creatorCurrentBalance: number;
  targetCurrentBalance: number;
  createDate: Date;
  updateDate: Date;
  version: number;
}

export interface IRequestHistoryBalance {
  getParams: {
    type?: number;
    creator?: number;
    target?: number;
    playerCashback?: number;
    timeFrom?: number;
    timeTo?: number;
    pageNumber?: number;
    amountPerPage?: number;
  };
  isRequestFromHeader?: boolean;
}

export interface IRequestTransactionBalance {
  target: number;
  amount: number;
}

export interface IResponseBalance {
  creator: IProfile;
  target: IProfile;
}
