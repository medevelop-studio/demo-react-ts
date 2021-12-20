import { all, fork, put, takeEvery } from "redux-saga/effects";
import { actionTypes } from "./types";

import manageHandlers from "./actions";

function* handleSuccess() {
  yield put(manageHandlers.handleReset());
}

function* watchRequests() {
  yield takeEvery(actionTypes.HANDLE_SUCCESS, handleSuccess);
}

function* rootSaga() {
  yield all([fork(watchRequests)]);
}

export default rootSaga;
