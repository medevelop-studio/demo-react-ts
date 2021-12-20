import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import { initialState, rootReducer, rootSaga } from "./rootReducer";

export default function configureStore() {
  const composeEnhancers = process.env.NODE_ENV === "development" ? composeWithDevTools({}) : compose();
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(rootReducer, initialState(), composeEnhancers(applyMiddleware(sagaMiddleware)));
  sagaMiddleware.run(rootSaga);
  return store;
}
