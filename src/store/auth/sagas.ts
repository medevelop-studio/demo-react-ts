import { all, fork, put, takeEvery } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import qs from "qs";

import config from "../../config";
import { actionTypes } from "./types";
import { profileError, authSuccess, balanceHistorySuccess, ticketHistorySuccess } from "./actions";
import manageHandlers from "../manageHandlers/actions";
import setAuthorizationHeader from "../setAuthorizationHeader";
import { IResponseLogin, IProfile } from "../../interfaces/IProfile";
import { IRequestHistoryBalance, IBalanceHistoryResponse } from "../../interfaces/IBalance";
import { IAction } from "../../interfaces/IAction";

export interface ILogin {
  getParams: {
    username: string;
    password: string;
  }
}

function* loginRequest(action: IAction<ILogin>) {
  try {
    yield put(manageHandlers.handleRequest({}));
    const response: AxiosResponse<IResponseLogin> = yield axios.post(`${config.url}/auth/login`, action.payload);
    localStorage.ACCESS_TOKEN = response.data.ACCESS_TOKEN;
    setAuthorizationHeader(response.data.ACCESS_TOKEN);
    yield put(authSuccess(response.data.user));
    yield put(manageHandlers.handleSuccess({}));
  } catch (err) {
    yield put(manageHandlers.handleError({ message: err.response.data.message }));
  }
}

function* profileRequest() {
  try {
    setAuthorizationHeader(localStorage.ACCESS_TOKEN);
    const response: AxiosResponse<IProfile> = yield axios.get(`${config.url}/auth/profile`);
    yield put(authSuccess(response.data));
  } catch (err) {
    yield put(profileError());
  }
}

// Balance history
function* balanceHistoryRequest(action: IAction<IRequestHistoryBalance>) {
  try {
    if (!action.payload.isRequestFromHeader) {
      yield put(manageHandlers.handleRequest({}));
    }

    const parsedParams: string = qs.stringify({
      ...action.payload.getParams,
      amountPerPage: config.amountPerPage as number
    });

    const { data }: AxiosResponse<IBalanceHistoryResponse> = yield axios.get(`${config.url}/balance?${parsedParams}`);

    yield put(balanceHistorySuccess(data));
    if (!action.payload.isRequestFromHeader) {
      yield put(manageHandlers.handleSuccess({}));
    }
  } catch (err) { }
}

// Ticket history
function* ticketHistoryRequest(action) {
  try {
    const parsedParams = qs.stringify({
      ...action.payload.getParams,
      amountPerPage: config.amountPerPage
    });

    const response = yield axios.get(`${config.url}/ticket?${parsedParams}`);
    yield put(ticketHistorySuccess(response.data));
  } catch (err) { }
}

function* watchRequests() {
  yield takeEvery(actionTypes.LOGIN_REQUEST, loginRequest);
  yield takeEvery(actionTypes.PROFILE_REQUEST, profileRequest);

  yield takeEvery(actionTypes.BALANCE_HISTORY_REQUEST, balanceHistoryRequest);

  yield takeEvery(actionTypes.TICKET_HISTORY_REQUEST, ticketHistoryRequest);
}

function* rootSaga() {
  yield all([fork(watchRequests)]);
}

export default rootSaga;
