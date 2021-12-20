import { IProfile, IHandlerStatus } from "./IProfile";
import { IBalanceGetResponse } from "./IBalance";
import { IEvoGame } from "./IEvoGames";
import { IProfileWithChildren } from "./IManageUsers";
import { ITotalTableState } from "../store/manageUsers/reducer";

export interface IStatisticsProps {
  user: IProfile;
  statistics: IStatisticGet;
  usersLoaded: boolean;
  values: { start: string; end: string };
  errors: { start: string; end: string };
  handlerStatus: IHandlerStatus;
  gamesList: IEvoGame[];
  translate(text: string): string;
  statisticsRequest(getParams: IRequestUserStatistic): void;
  gamesRequest(): void;
}

export interface IStatisticsState {
  // userData: IProfile | null;
  userData: any;
  statistics: IStatisticGet;
  searchLogin: string;
  searchType: string;
  currentLogin: string;
  currentType: number[];
  userBalanceIsOpen: boolean;
  amountPerPage: number;
  startDate?: number;
  endDate?: number;
}

export interface IProviderStatisticsState extends Omit<IStatisticsState, 'statistics'> {
  statistics: IBalanceGetResponse[];
  searchLogin: string;
  searchedUserId: number;
}

export interface IStatisticGet {
  totalCount: number;
  pageNumber: number;
  amountPerPage: number;
  balanceHistory: IBalanceGetResponse[];
}

export interface IRequestUserStatistic {
  getParams: {
    target?: number;
    type?: string;
    login?: string;
    timeFrom?: number;
    timeTo?: number;
    pageNumber?: number;
    amountPerPage?: number;
  }
}

export interface IProviderStatisticsProps {
  user: IProfile;
  providerStatistics: IProviderStatisticGet[];
  userTreeStatistics: IProfileWithChildren[];
  allUserStatistics: IProfileWithChildren[];
  usersStatisticsLoaded: boolean;
  usersLoaded: boolean;
  totalTableState: ITotalTableState;
  values: { start: string; end: string };
  errors: { start: string; end: string };
  handlerStatus: IHandlerStatus;
  translate(text: string): string;
  providerStatisticsRequest(getParams: IRequestUserStatistic): void;
  providerUsersExpansion(users: IProfileWithChildren[]): void;
}

export interface IProviderStatisticGet {
  user: IProfileWithChildren;
  betCount: number;
  canceledBet: number;
  debitAmount: number;
  winAmount: number;
  profitAmount: number;
  agentProfitAmount: number;
  masterProfitAmount: number;
}

export interface IProfileWithChildrenAndStatistics extends Omit<IProfileWithChildren, 'children'> {
  children: IProfileWithChildrenAndStatistics[];
  betCount: number;
  canceledBet: number;
  debitAmount: number;
  winAmount: number;
  profitAmount: number;
  agentProfitAmount: number;
  masterProfitAmount: number;
  summaryProfitAmount?: number;
  systemCommission: number;
}
