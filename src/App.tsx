import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { withTranslate } from "react-redux-multilingual";
import cn from "classnames";

import { Header, Footer, Notifications } from "./components";
import RenderRoutes from "./routes/RenderRoutes";

const App: React.FC<any> = (props) => {
  const [locale] = React.useState(localStorage.locale);
  React.useEffect(() => {
    const body = document.querySelector("body") as HTMLElement;
    locale !== "he" ? body.classList.add("rtl") : body.classList.remove("rtl");
  }, [locale]);

  return (
    <>
      <CSSTransition
        in={localStorage.ACCESS_TOKEN && !props.isAuthenticated && !props.authFailure}
        unmountOnExit={true}
        timeout={200}
        classNames="modalWindowAnimation"
      >
        <div className="auth-notification">
          <div className="auth-notification__inner">{props.translate("Authentication")}...</div>
        </div>
      </CSSTransition>

      <Header />
      <main
        className={cn({
          "best-at-table-color": props.history.location.pathname === "/best-at-table/games",
          "one-on-one-color": props.history.location.pathname === "/one-on-one",
          "checkpoint-color": props.history.location.pathname === "/checkpoint",
          "main--ltr": locale !== "he",
          "main--rtl": locale === "he",
        })}
        id="main-container"
      >
        <RenderRoutes />
      </main>
      <Footer />

      <Notifications />
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  authFailure: state.auth.authFailure,
});

export default withRouter(connect(mapStateToProps, null)(withTranslate(App)));
