import { action } from "typesafe-actions";
import { actionTypes } from "./types";
import { IProfile } from "../../interfaces/IProfile";
import { IRequestHistoryBalance, IBalanceHistoryResponse } from "../../interfaces/IBalance";
import { IAction } from "../../interfaces/IAction";

export const loginRequest = (data: { username: string; password: string; }) => action(actionTypes.LOGIN_REQUEST, data);
export const authSuccess = (data: IProfile) => action(actionTypes.AUTH_SUCCESS, data);

export const profileRequest = () => action(actionTypes.PROFILE_REQUEST);
export const profileError = () => {
  localStorage.removeItem("ACCESS_TOKEN");
  return action(actionTypes.PROFILE_ERROR);
};

export const userEdit = (data: { balance: number; scedualPaymentBalance: number }) => action(actionTypes.USER_EDIT, data);
export const profileLogout = () => action(actionTypes.PROFILE_LOGOUT);

// Balance history
export const balanceHistoryRequest = (data: IAction<IRequestHistoryBalance>) => action(actionTypes.BALANCE_HISTORY_REQUEST, data);
export const balanceHistorySuccess = (data: IBalanceHistoryResponse) => action(actionTypes.BALANCE_HISTORY_SUCCESS, data);

// Ticket history
export const ticketHistoryRequest = (data: any) => action(actionTypes.TICKET_HISTORY_REQUEST, data);
export const ticketHistorySuccess = (data: any) => action(actionTypes.TICKET_HISTORY_SUCCESS, data);
