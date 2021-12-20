import { action } from "typesafe-actions";
import { actionTypes } from "./types";
import { IStatisticGet, IRequestUserStatistic, IProviderStatisticGet } from "../../interfaces/IStatistics";
import { IComment, IRequestComment } from "../../interfaces/IComment";
import {
  IProfileWithChildren,
  IRequestCashback,
  IRequestProfit,
  IUserRequestCreate,
  IRequestBanUser,
  IRequestChangePassword,
  IRequestProviderMaxLimit
} from "../../interfaces/IManageUsers";
import { IProfile } from "../../interfaces/IProfile";
import { IAction } from "../../interfaces/IAction";
import { IRequestTransactionBalance } from "../../interfaces/IBalance";
import {
  IRequestGetScedualPayment,
  IScedualPayment,
  IRequestCreateScedualPayment,
  IRequestDeleteScedualPayment
} from "../../interfaces/IScedualPayment";

import {ILoginHistory} from "../../interfaces/ILoginHistory";

export const manageUsersRequest = (data: any) => action(actionTypes.MANAGE_USERS_REQUEST, data);
export const manageUsersSuccess = (data: IProfileWithChildren[]) => action(actionTypes.MANAGE_USERS_SUCCESS, data);
export const manageUsersExpansion = (data: any) => action(actionTypes.MANAGE_USERS_EXPANSION, data);

export const statisticsRequest = (data: IAction<IRequestUserStatistic>) => action(actionTypes.STATISTICS_REQUEST, data);
export const statisticsSuccess = (data: IStatisticGet) => action(actionTypes.STATISTICS_SUCCESS, data);

export const providerStatisticsRequest = (data: IAction<IRequestUserStatistic>) => action(actionTypes.PROVIDER_STATISTICS_REQUEST, data);
export const providerStatisticsSuccess = (data: IProviderStatisticGet[]) => action(actionTypes.PROVIDER_STATISTICS_SUCCESS, data);
export const providerUsersExpansion = (data: any) => action(actionTypes.PROVIDER_USERS_EXPANSION, data);

export const createUserRequest = (data: IAction<IUserRequestCreate>) => action(actionTypes.CREATE_USER_REQUEST, data);
export const createUserSuccess = (data: IProfile) => action(actionTypes.CREATE_USER_SUCCESS, data);

export const createUserJoinRequest = (data: IAction<IUserRequestCreate>) => action(actionTypes.CREATE_USER_JOIN_REQUEST, data);
export const createUserJoinSuccess = (data: IProfile) => action(actionTypes.CREATE_USER_JOIN_SUCCESS, data);

export const addBalanceRequest = (data: IAction<IRequestTransactionBalance>) => action(actionTypes.ADD_BALANCE_REQUEST, data);
export const takeBalanceRequest = (data: IAction<IRequestTransactionBalance>) => action(actionTypes.TAKE_BALANCE_REQUEST, data);
export const userBalanceSuccess = (data: { target: IProfile; creator: IProfile }) => action(actionTypes.USER_BALANCE_SUCCESS, data);

export const userBanRequest = (data: IAction<IRequestBanUser>) => action(actionTypes.USER_BAN_REQUEST, data);
export const userBanSuccess = (data: IProfile) => action(actionTypes.USER_BAN_SUCCESS, data);

export const cashbackRequest = (data: IAction<IRequestCashback>) => action(actionTypes.CASHBACK_REQUEST, data);
export const cashbackSuccess = (data: IProfile) => action(actionTypes.CASHBACK_SUCCESS, data);

export const profitRequest = (data: IAction<IRequestProfit>) => action(actionTypes.PROFIT_REQUEST, data);
export const profitSuccess = (data: IProfile) => action(actionTypes.PROFIT_SUCCESS, data);

export const providerMaxLimitRequest = (data: IAction<IRequestProviderMaxLimit>) => action(actionTypes.PROVIDER_MAX_LIMIT_REQUEST, data);
export const providerMaxLimitSuccess = (data: IProfile) => action(actionTypes.PROVIDER_MAX_LIMIT_SUCCESS, data);

export const changePasswordRequest = (data: IAction<IRequestChangePassword>) => action(actionTypes.CHANGE_PASSWORD_REQUEST, data);
export const changePasswordSuccess = () => action(actionTypes.CHANGE_PASSWORD_SUCCESS);

export const commentRequest = (data: IAction<IRequestComment>) => action(actionTypes.GET_COMMENT_REQUEST, data);
export const commentSuccess = (data: IComment) => action(actionTypes.COMMENT_SUCCESS, data);
export const changeCommentRequest = (data: IAction<IRequestComment>) => action(actionTypes.CHANGE_COMMENT_REQUEST, data);

export const scedualPaymentRequest = (data: IAction<IRequestGetScedualPayment>) => action(actionTypes.SCEDUAL_PAYMENT_REQUEST, data);
export const scedualPaymentSuccess = (data: IScedualPayment) => action(actionTypes.SCEDUAL_PAYMENT_SUCCESS, data);
export const setScedualPaymentRequest = (data: IAction<IRequestCreateScedualPayment>) =>
  action(actionTypes.SET_SCEDUAL_PAYMENT_REQUEST, data);
export const deleteScedualPaymentRequest = (data: IAction<IRequestDeleteScedualPayment>) =>
  action(actionTypes.DELETE_SCEDUAL_PAYMENT_REQUEST, data);

export const loginHistoryRequest = (id: number) => action(actionTypes.GET_LOGIN_HISTORY_REQUEST, id);
export const loginHistorySuccess = (data: ILoginHistory) => action(actionTypes.GET_LOGIN_HISTORY_SUCCESS, data);

export const onUserSelect = (login: string) =>  action(actionTypes.ON_USER_SELECT, login);
