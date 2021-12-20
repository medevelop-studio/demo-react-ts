import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import { AppContainer } from "react-hot-loader";
import { IntlProvider } from "react-redux-multilingual";
// import * as serviceWorker from "./serviceWorker";
import { createBrowserHistory } from "history";
import configureStore from "./store/configureStore";
import translations from "./assets/translations";

import "./styles/normalize.css";
import "./styles/react-datepicker.css";
import "./styles/swiper.min.css";
import "./styles/spinner.css";
import "./styles/common.scss";
import 'react-notifications/lib/notifications.css';

import { profileRequest } from "./store/auth/actions";
import App from "./App";

const history = createBrowserHistory();
const store = configureStore();

declare global {
  interface JQuery {
    marquee: any;
  }
  interface Window {
    NotificationManager: any;
    Swiper: any;
    marquee: any;
    md: {
      mobile: () => {};
    };
    resizeViewport: () => {};
  }
}

if (localStorage.ACCESS_TOKEN) {
  store.dispatch(profileRequest());
}

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <IntlProvider translations={translations} locale="en">
          <Router history={history}>
            <App />
          </Router>
        </IntlProvider>
      </Provider>
    </AppContainer>,
    document.getElementById("root")
  );
};

render();

if (module.hot) {
  module.hot.accept("./App", () => {
    render();
  });
}

// serviceWorker.unregister();
