import { all, fork, put, takeEvery } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import qs from "qs";

import config from "../../config";
import { actionTypes } from "./types";
import {
  manageUsersSuccess,
  createUserSuccess,
  createUserJoinSuccess,
  userBanSuccess,
  userBalanceSuccess,
  cashbackSuccess,
  profitSuccess,
  changePasswordSuccess,
  statisticsSuccess,
  commentSuccess,
  providerMaxLimitSuccess,
  providerStatisticsSuccess,
  scedualPaymentSuccess,
  loginHistorySuccess
} from "./actions";
import manageHandlers from "../manageHandlers/actions";
import { userEdit } from "../auth/actions";
import { changeBalance } from "../../helpers";
import { loginRequest } from "../auth/actions";
import {
  IProfileWithChildren,
  IUserRequestCreate,
  IRequestBanUser,
  IRequestCashback,
  IRequestChangePassword,
  IRequestProviderMaxLimit,
  IRequestProfit
} from "../../interfaces/IManageUsers";
import { IRequestUserStatistic, IStatisticGet, IProviderStatisticGet } from "../../interfaces/IStatistics";
import { IAction } from "../../interfaces/IAction";
import { IProfile } from "../../interfaces/IProfile";
import { IRequestTransactionBalance, IResponseBalance } from "../../interfaces/IBalance";
import { IRequestComment, IComment } from "../../interfaces/IComment";
import { IRequestGetScedualPayment, IScedualPaymentGet, IRequestCreateScedualPayment, IScedualPayment, IRequestDeleteScedualPayment } from "../../interfaces/IScedualPayment";
import { userDictionary } from "../../common/dictionary";

import {ILoginHistory, IRequestLoginHistory} from "../../interfaces/ILoginHistory";

interface ILoginPayload {
  username: string;
  password: string;
}

function* manageUsersRequest() {
  try {
    const response: AxiosResponse<IProfileWithChildren[]> = yield axios.get(`${config.url}/tree/children`);
    yield put(manageUsersSuccess(response.data));
  } catch (err) {
    yield put(manageHandlers.handleError({ message: err.response.data.message }));
  }
}

function* statisticsRequest(action: IAction<IRequestUserStatistic>) {
  try {
    yield put(manageHandlers.handleRequest({}));

    const parsedParams: string = qs.stringify({
      ...action.payload.getParams,
      amountPerPage: config.amountPerPage as number
    });
    const { data }: AxiosResponse<IStatisticGet> = yield axios.get(`${config.url}/statistic/tree?${parsedParams}`);

    yield put(statisticsSuccess(data));
    yield put(manageHandlers.handleSuccess({}));
  } catch (err) {
    yield put(manageHandlers.handleError({ message: err.response.data.message }));
  }
}

function* providerStatisticsRequest(action: IAction<IRequestUserStatistic>) {
  try {
    yield put(manageHandlers.handleRequest({}));

    const parsedParams: string = qs.stringify(action.payload.getParams);
    const { data }: AxiosResponse<IProviderStatisticGet[]> = yield axios.get(`${config.url}/statistic/provider?${parsedParams}`);

    yield put(providerStatisticsSuccess(data));
    yield put(manageHandlers.handleSuccess({}));
  } catch (err) {
    yield put(manageHandlers.handleError({ message: err.response.data.message }));
  }
}

function* createUserRequest(action: IAction<IUserRequestCreate>) {
  try {
    yield put(manageHandlers.handleRequest({}));
    const response: AxiosResponse<IProfile> = yield axios.post(`${config.url}/user/create`, action.payload);
    yield put(createUserSuccess(response.data));
    yield put(manageHandlers.handleSuccess({}));
  } catch (err) {
    yield put(manageHandlers.handleError({ message: err.response.data.message }));
  }
}

function* createUserJoinRequest(action: IAction<IUserRequestCreate>) {
  try {
    yield put(manageHandlers.handleRequest({}));
    const response: AxiosResponse<IProfile> = yield axios.post(`${config.url}/user/join`, action.payload);
    yield put(createUserJoinSuccess(response.data));

    const payload: ILoginPayload = {
      username: action.payload.login,
      password: action.payload.password
    };

    yield put(loginRequest(payload));
  } catch (err) {
    yield put(manageHandlers.handleError({ message: err.response.data.message }));
  }
}

function* addBalanceRequest(action: IAction<IRequestTransactionBalance>) {
  try {
    yield put(manageHandlers.handleRequest({}));

    const { data }: AxiosResponse<IResponseBalance> = yield axios.post(`${config.url}/balance/transfer`, {
      ...action.payload,
      amount: changeBalance(action.payload.amount, true)
    });

    yield put(
      userBalanceSuccess({
        target: data.target,
        creator: data.creator
      })
    );

    if (data.creator.permissionLevel !== userDictionary.USER_ADMIN_PERMISSION_LEVEL) {
      yield put(
        userEdit({
          balance: changeBalance(data.creator.balance),
          scedualPaymentBalance: changeBalance(data.creator.scedualPaymentBalance)
        })
      );
    }

    yield put(manageHandlers.handleSuccess({}));
  } catch (err) {
    yield put(manageHandlers.handleError({ message: err.response.data.message }));
  }
}

function* takeBalanceRequest(action: IAction<IRequestTransactionBalance>) {
  try {
    yield put(manageHandlers.handleRequest({}));

    const { data }: AxiosResponse<IResponseBalance> = yield axios.post(`${config.url}/balance/take`, {
      ...action.payload,
      amount: changeBalance(action.payload.amount, true)
    });

    yield put(
      userBalanceSuccess({
        target: data.target,
        creator: data.creator
      })
    );

    if (data.creator.permissionLevel !== userDictionary.USER_ADMIN_PERMISSION_LEVEL) {
      yield put(
        userEdit({
          balance: changeBalance(data.creator.balance),
          scedualPaymentBalance: changeBalance(data.creator.scedualPaymentBalance)
        })
      );
    }

    yield put(manageHandlers.handleSuccess({}));
  } catch (err) {
    yield put(manageHandlers.handleError({ message: err.response.data.message }));
  }
}

function* userBanRequest(action: IAction<IRequestBanUser>) {
  try {
    yield put(manageHandlers.handleRequest({}));

    const response: AxiosResponse<IProfile> = yield axios.post(`${config.url}/user/ban`, action.payload);

    yield put(userBanSuccess(response.data));
    yield put(manageHandlers.handleSuccess({}));
  } catch (err) {
    yield put(manageHandlers.handleError({ message: err.response.data.message }));
  }
}

function* cashbackRequest(action: IAction<IRequestCashback>) {
  try {
    yield put(manageHandlers.handleRequest({}));

    const response: AxiosResponse<IProfile> = yield axios.post(`${config.url}/user/cashback`, action.payload);

    yield put(cashbackSuccess(response.data));
    yield put(manageHandlers.handleSuccess({}));
  } catch (err) {
    yield put(manageHandlers.handleError({ message: err.response.data.message }));
  }
}

function* profitRequest(action: IAction<IRequestProfit>) {
  try {
    yield put(manageHandlers.handleRequest({}));

    const response: AxiosResponse<IProfile> = yield axios.post(`${config.url}/user/profit`, action.payload);

    yield put(profitSuccess(response.data));
    yield put(manageHandlers.handleSuccess({}));
  } catch (err) {
    yield put(manageHandlers.handleError({ message: err.response.data.message }));
  }
}

function* providerMaxLimitRequest(action: IAction<IRequestProviderMaxLimit>) {
  try {
    yield put(manageHandlers.handleRequest({}));

    const response: AxiosResponse<IProfile> = yield axios.post(`${config.url}/user/changeProviderMaxLimit`, {
      ...action.payload,
      providerMaxLimit: changeBalance(action.payload.providerMaxLimit, true)
    });

    yield put(providerMaxLimitSuccess(response.data));
    yield put(manageHandlers.handleSuccess({}));
  } catch (err) {
    yield put(manageHandlers.handleError({ message: err.response.data.message }));
  }
}

function* changePasswordRequest(action: IAction<IRequestChangePassword>) {
  try {
    yield put(manageHandlers.handleRequest({}));
    yield axios.post(`${config.url}/user/changePassword`, action.payload);
    yield put(changePasswordSuccess());
    yield put(manageHandlers.handleSuccess({}));
  } catch (err) {
    yield put(manageHandlers.handleError({ message: err.response.data.message }));
  }
}

function* commentRequest(action: IAction<IRequestComment>) {
  const parsedParams: string = qs.stringify({
    ...action.payload.getParams
  });

  try {
    const response: AxiosResponse<IComment> = yield axios.get(`${config.url}/comment?${parsedParams}`);
    yield put(commentSuccess(response.data));
  } catch (err) {
    yield put(manageHandlers.handleError({ message: err.response.data.message }));
  }
}

function* changeCommentRequest(action: IAction<IRequestComment>) {
  try {
    yield put(manageHandlers.handleRequest({}));

    const response: AxiosResponse<IComment> = yield axios.post(`${config.url}/comment/create`, action.payload);

    yield put(commentSuccess(response.data));
    yield put(manageHandlers.handleSuccess({}));
  } catch (err) {
    yield put(manageHandlers.handleError({ message: err.response.data.message }));
  }
}

function* scedualPaymentRequest(action: IAction<IRequestGetScedualPayment>) {
  const parsedParams: string = qs.stringify({
    ...action.payload
  });

  try {
    const { data: { data } }: AxiosResponse<IScedualPaymentGet> = yield axios.get(`${config.url}/scedual-payment?${parsedParams}`);
    const [payment] = data;

    yield put(scedualPaymentSuccess(payment ? payment : {} as IScedualPayment));
  } catch (err) {
    yield put(manageHandlers.handleError({ message: err.response.data.message }));
  }
}

function* setScedualPaymentRequest(action: IAction<IRequestCreateScedualPayment>) {
  try {
    yield put(manageHandlers.handleRequest({}));

    const response: AxiosResponse<IScedualPayment> = yield axios.post(`${config.url}/scedual-payment/create`, {
      ...action.payload,
      amount: changeBalance(action.payload.amount, true)
    });

    yield put(scedualPaymentSuccess(response.data));
    yield put(manageHandlers.handleSuccess({}));
  } catch (err) {
    yield put(manageHandlers.handleError({ message: err.response.data.message }));
  }
}

function* deleteScedualPaymentRequest(action: IAction<IRequestDeleteScedualPayment>) {
  try {
    yield put(manageHandlers.handleRequest({}));

    const response: AxiosResponse<IScedualPayment> = yield axios.post(`${config.url}/scedual-payment/delete`, action.payload);

    yield put(scedualPaymentSuccess(response.data));
    yield put(manageHandlers.handleSuccess({}));
  } catch (err) {
    yield put(manageHandlers.handleError({ message: err.response.data.message }));
  }
}

function* getLoginHistory(action: IAction<IRequestLoginHistory>) {
  try {
    yield put(manageHandlers.handleRequest({}));
    const parsedParams: string = qs.stringify({
      ...action.payload.getParams,
      amountPerPage: config.amountPerPage as number
    });

    const response: AxiosResponse<ILoginHistory> = yield axios.get(`${config.url}/auth/?${parsedParams}`);
    yield put(loginHistorySuccess(response.data));
    yield put(manageHandlers.handleSuccess({}));
  } catch (err) {
    yield put(manageHandlers.handleError({ message: err.response.data.message }));
  }
}

function* watchRequests() {
  yield takeEvery(actionTypes.MANAGE_USERS_REQUEST, manageUsersRequest);
  yield takeEvery(actionTypes.STATISTICS_REQUEST, statisticsRequest);
  yield takeEvery(actionTypes.PROVIDER_STATISTICS_REQUEST, providerStatisticsRequest);
  yield takeEvery(actionTypes.CREATE_USER_REQUEST, createUserRequest);
  yield takeEvery(actionTypes.CREATE_USER_JOIN_REQUEST, createUserJoinRequest);
  yield takeEvery(actionTypes.ADD_BALANCE_REQUEST, addBalanceRequest);
  yield takeEvery(actionTypes.TAKE_BALANCE_REQUEST, takeBalanceRequest);
  yield takeEvery(actionTypes.USER_BAN_REQUEST, userBanRequest);
  yield takeEvery(actionTypes.CASHBACK_REQUEST, cashbackRequest);
  yield takeEvery(actionTypes.PROFIT_REQUEST, profitRequest);
  yield takeEvery(actionTypes.PROVIDER_MAX_LIMIT_REQUEST, providerMaxLimitRequest);
  yield takeEvery(actionTypes.CHANGE_PASSWORD_REQUEST, changePasswordRequest);
  yield takeEvery(actionTypes.GET_COMMENT_REQUEST, commentRequest);
  yield takeEvery(actionTypes.CHANGE_COMMENT_REQUEST, changeCommentRequest);
  yield takeEvery(actionTypes.SCEDUAL_PAYMENT_REQUEST, scedualPaymentRequest);
  yield takeEvery(actionTypes.SET_SCEDUAL_PAYMENT_REQUEST, setScedualPaymentRequest);
  yield takeEvery(actionTypes.DELETE_SCEDUAL_PAYMENT_REQUEST, deleteScedualPaymentRequest);
  yield takeEvery(actionTypes.GET_LOGIN_HISTORY_REQUEST, getLoginHistory);
}

function* rootSaga() {
  yield all([fork(watchRequests)]);
}

export default rootSaga;
