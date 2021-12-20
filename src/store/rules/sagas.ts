import { all, fork, put, takeEvery } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import qs from "qs";

import config from "../../config";
import { actionTypes } from "./types";
import {
  getRulesSuccess,
  createRulesSuccess,
  getRulesError,
  getTickerError,
  getTickerSuccess,
  createTickerSuccess,
  deleteRulesSuccess,
} from "./actions";
import manageHandlers from "../manageHandlers/actions";
import { ITicker, IGetTickerRequest, ICreateTickerRequest, IRule, IGetRulesRequest, ICreateRulesRequest, IDeleteRulesRequest } from "../../interfaces/IRules";
import { IAction } from "../../interfaces/IAction";

function* getRulesRequest(action: IAction<IGetRulesRequest>) {
  try {
    const parsedParams = qs.stringify({
      ...action.payload,
    });

    const { data }: AxiosResponse<IRule[]> = yield axios.get(`${config.url}/game-rule?${parsedParams}`);
    yield put(getRulesSuccess(data));
  } catch (err) {
    yield put(getRulesError(err.response.data));
    // yield put(manageHandlers.handleError({ message: err.response.data.message }))
  }
}

function* createRulesRequest(action: IAction<ICreateRulesRequest>) {
  try {
    yield put(manageHandlers.handleRequest({}));

    const { data }: AxiosResponse<IRule> = yield axios.post(`${config.url}/game-rule/create`, action.payload);

    yield put(createRulesSuccess(data));
    yield put(manageHandlers.handleSuccess({ message: "The rule was successful updated" }));
  } catch (err) {
    yield put(manageHandlers.handleError({ message: err.response.data.message }));
  }
}

function* deleteRulesRequest(action: IAction<IDeleteRulesRequest>) {
  try {
    yield put(manageHandlers.handleRequest({}));
    yield axios.post(`${config.url}/game-rule/delete`, action.payload);
    yield put(deleteRulesSuccess({ gameName: action.payload.gameName }));
    yield put(manageHandlers.handleSuccess({ message: "The rule was successful deleted" }));
  } catch (err) {
    yield put(manageHandlers.handleError({ message: err.response.data.message }));
  }
}

function* getTickerRequest(action: IAction<IGetTickerRequest>) {
  try {
    const parsedParams = qs.stringify({
      ...action.payload
    });

    const { data }: AxiosResponse<ITicker> = yield axios.get(`${config.url}/ticker?${parsedParams}`);
    yield put(getTickerSuccess(data));
  } catch (err) {
    yield put(getTickerError(err.response.data));
    // yield put(manageHandlers.handleError({ message: err.response.data.message }))
  }
}

function* createTickerRequest(action: IAction<ICreateTickerRequest>) {
  try {
    yield put(manageHandlers.handleRequest({}));

    const { data }: AxiosResponse<ITicker> = yield axios.post(`${config.url}/ticker/create`, action.payload);

    yield put(createTickerSuccess(data));
    yield put(manageHandlers.handleSuccess({ message: "The ticker was successful updated" }));
  } catch (err) {
    yield put(manageHandlers.handleError({ message: err.response.data.message }));
  }
}

function* watchRequests() {
  yield takeEvery(actionTypes.GET_RULES_REQUEST, getRulesRequest);
  yield takeEvery(actionTypes.CREATE_RULES_REQUEST, createRulesRequest);
  yield takeEvery(actionTypes.DELETE_RULES_REQUEST, deleteRulesRequest);
  yield takeEvery(actionTypes.GET_TICKER_REQUEST, getTickerRequest);
  yield takeEvery(actionTypes.CREATE_TICKER_REQUEST, createTickerRequest);
}

function* rootSaga() {
  yield all([fork(watchRequests)]);
}

export default rootSaga;
