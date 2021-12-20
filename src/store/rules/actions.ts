import { action } from "typesafe-actions";
import { actionTypes } from "./types";
import { IAction } from "../../interfaces/IAction";
import { IGetTickerRequest, ICreateTickerRequest, ITicker, IGetRulesRequest, IRule, ICreateRulesRequest, IDeleteRulesRequest } from "../../interfaces/IRules";

export const getRulesRequest = (data: IAction<IGetRulesRequest>) => action(actionTypes.GET_RULES_REQUEST, data);
export const getRulesSuccess = (data: IRule[]) => action(actionTypes.GET_RULES_SUCCESS, data);
export const getRulesError = (data: any) => action(actionTypes.GET_RULES_ERROR, data);

export const createRulesRequest = (data: IAction<ICreateRulesRequest>) => action(actionTypes.CREATE_RULES_REQUEST, data);
export const createRulesSuccess = (data: IRule) => action(actionTypes.CREATE_RULES_SUCCESS, data);

export const deleteRulesRequest = (data: IAction<IDeleteRulesRequest>) => action(actionTypes.DELETE_RULES_REQUEST, data);
export const deleteRulesSuccess = (data: { gameName: string }) => action(actionTypes.DELETE_RULES_SUCCESS, data);

export const getTickerRequest = (data: IAction<IGetTickerRequest>) => action(actionTypes.GET_TICKER_REQUEST, data);
export const getTickerSuccess = (data: ITicker) => action(actionTypes.GET_TICKER_SUCCESS, data);
export const getTickerError = (data: any) => action(actionTypes.GET_TICKER_ERROR, data);

export const createTickerRequest = (data: IAction<ICreateTickerRequest>) => action(actionTypes.CREATE_TICKER_REQUEST, data);
export const createTickerSuccess = (data: ITicker) => action(actionTypes.CREATE_TICKER_SUCCESS, data);
