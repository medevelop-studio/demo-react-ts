import { all, fork, put, takeEvery, takeLatest } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import qs from "qs";

import config from "../../config";
import { actionTypes } from "./types";
import {
  ticketsSuccess,
  createTicketSuccess,
  chancesSuccess
} from "./actions";
import manageHandlers from "../manageHandlers/actions";
import { userEdit } from "../auth/actions";
import { changeBalance, } from "../../helpers";
import { IResponseParams, ITicket,  ICreateTicketRequest, IRequestParams } from "../../interfaces/IGames";
import { IAction } from "../../interfaces/IAction";
import { IRequestGetChance, IResponseGetChance } from "../../interfaces/IChance";

// Tickets
function* ticketsRequest(action: IAction<IRequestParams>) {
  try {
    const parsedParams: string = qs.stringify(action.payload.getParams);

    const response: AxiosResponse<IResponseParams<ITicket[]>> = yield axios.get(`${config.url}/ticket?${parsedParams}`);

    yield put(
      ticketsSuccess({
        tickets: response.data,
        type: action.payload.getParams.type
      })
    );
  } catch (err) { }
}

// Create ticket
function* createTicketRequest(action: IAction<ICreateTicketRequest>) {
  try {
    yield put(manageHandlers.handleRequest({}));

    const { data }: AxiosResponse<ITicket> = yield axios.post(`${config.url}/ticket/create`, {
      ...action.payload.values,
      price: action.payload.values.price ? changeBalance(action.payload.values.price, true) : undefined
    });

    yield put(createTicketSuccess({ ticket: data, type: action.payload.type }));
    yield put(userEdit({
      balance: changeBalance(data.player.balance),
      scedualPaymentBalance: changeBalance(data.player.scedualPaymentBalance)
    }));

    yield put(manageHandlers.handleSuccess({}));
  } catch (err) {
    yield put(manageHandlers.handleError({ message: err.response.data.message }));
  }
}

// Chances
function* chancesRequest(action: IAction<IRequestGetChance>) {
  try {
    const parsedParams = qs.stringify({
      amountPerPage: config.amountPerPage,
      ...action.payload
    });

    const { data }: AxiosResponse<IResponseGetChance> = yield axios.get(`${config.url}/chance?${parsedParams}`);
    yield put(chancesSuccess(data));
  } catch (err) { }
}

function* setChanceResult(action) {
  try {
    yield put(manageHandlers.handleRequest({}));
    const response = yield axios.post(`${config.url}/chance`, {...action.payload});
    if (response) {
      yield put(manageHandlers.handleSuccess({}));
    }
  } catch (err) {
    yield put(manageHandlers.handleError({ message: err.response.data.message }));
  }
}

function* watchRequests() {
  yield takeEvery(actionTypes.TICKETS_REQUEST, ticketsRequest);

  yield takeEvery(actionTypes.CREATE_TICKET_REQUEST, createTicketRequest);

  yield takeEvery(actionTypes.CHANCES_REQUEST, chancesRequest);

  yield takeLatest(actionTypes.ON_SET_CHANCE, setChanceResult);
}

function* rootSaga() {
  yield all([fork(watchRequests)]);
}

export default rootSaga;
