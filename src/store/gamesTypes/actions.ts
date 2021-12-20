import { action } from "typesafe-actions";
import { actionTypes } from "./types";
import { IRequestParams } from "../../interfaces/IGames";
import { IAction } from "../../interfaces/IAction";
import { IRequestGetChance, IResponseGetChance } from "../../interfaces/IChance";

// Tickets
export const ticketsRequest = (data: IAction<IRequestParams>) => action(actionTypes.TICKETS_REQUEST, data);
export const ticketsSuccess = (data: any) => action(actionTypes.TICKETS_SUCCESS, data);

// Create ticket
export const createTicketRequest = (data: any) => action(actionTypes.CREATE_TICKET_REQUEST, data);
export const createTicketSuccess = (data: { ticket: any; type: any; }) => action(actionTypes.CREATE_TICKET_SUCCESS, data);

// Chances
export const chancesRequest = (data: IAction<IRequestGetChance>) => action(actionTypes.CHANCES_REQUEST, data);
export const chancesSuccess = (data: IResponseGetChance) => action(actionTypes.CHANCES_SUCCESS, data);
export const onSetChance = (data: object) =>  action(actionTypes.ON_SET_CHANCE, data);
