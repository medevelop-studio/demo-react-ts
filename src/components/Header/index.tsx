import React, { useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { CSSTransition } from "react-transition-group";
import { withTranslate } from "react-redux-multilingual";
import cn from "classnames";

import { profileLogout, balanceHistoryRequest, profileRequest } from "../../store/auth/actions";
import { createUserJoinRequest } from "../../store/manageUsers/actions";

import MobileMenu from "../Mobile/MobileMenu";
import LoginModal from "../Modals/LoginModal";
import Timer from "./Timer";
import Locale from "../Locale";

import { userDictionary } from "../../common/dictionary";
import { CreateUserModal } from "..";
import { IProfile } from "../../interfaces/IProfile";
import { History } from "history";
import { IAction } from "../../interfaces/IAction";
import { IUserRequestCreate } from "../../interfaces/IManageUsers";
import moment from "moment";
import { IRequestHistoryBalance, IBalanceHistory } from "../../interfaces/IBalance";

interface IHeader {
  user: IProfile;
  history: History;
  isAuthenticated: boolean;
  balanceHistory: IBalanceHistory;
  createUserJoinRequest(data: IAction<IUserRequestCreate>): void;
  balanceHistoryRequest(getParams: IRequestHistoryBalance): void;
  profileRequest(): void;
  translate(key: string): string;
  profileLogout(): void;
}

const Header: React.FC<IHeader> = (props) => {
  const [showMobileMenuModal, switchMobileMenu] = React.useState(false);
  const [showLoginModal, switchLoginModal] = React.useState(false);
  const [showJoinModal, switchJoinModal] = React.useState(false);
  const [isTimerStarted, setIsTimerStarted] = React.useState(false);
  const { history } = props;

  useEffect(() => {
    if (
      props.isAuthenticated &&
      props.user.permissionLevel === userDictionary.USER_PLAYER_PERMISSION_LEVEL &&
      !props.balanceHistory.balanceLoaded &&
      props.balanceHistory.data.balances.length === 0
    ) {
      const currentTuesday: Date =
        new Date(moment().day(2).valueOf()).setHours(7, 0, 0, 0) > new Date().getTime()
          ? new Date(moment().day(-5).valueOf())
          : new Date(moment().day(2).valueOf());

      currentTuesday.setHours(7, 0, 0, 0);

      const endOfPeriod: Date =
        new Date() > new Date(currentTuesday.getTime() + 604800000) ? new Date(currentTuesday.getTime() + 604800000) : new Date();

      props.balanceHistoryRequest({
        getParams: {
          pageNumber: 1,
          target: props.user.id,
          timeFrom: Math.round(currentTuesday.getTime() / 1000),
          timeTo: Math.round(endOfPeriod.getTime() / 1000),
        },
        isRequestFromHeader: true,
      });
    }
  }, [props]);

  useEffect(() => {
    if (props.isAuthenticated && !isTimerStarted) {
      setIsTimerStarted(true);

      setTimeout(async function updateBalance() {
        props.profileRequest();

        setTimeout(updateBalance, 15000);
      }, 15000);
    }
  }, [isTimerStarted, props]);

  return (
    <>
      <CSSTransition in={showLoginModal} unmountOnExit={true} timeout={200} classNames="modalWindowAnimation">
        <LoginModal switchModal={() => switchLoginModal(!showLoginModal)} />
      </CSSTransition>

      <CSSTransition in={showJoinModal} unmountOnExit={true} timeout={200} classNames="modalWindowAnimation">
        <CreateUserModal
          switchModal={() => switchJoinModal(!showJoinModal)}
          dataModal="createUserIsOpen"
          permissionLevel={userDictionary.USER_PLAYER_PERMISSION_LEVEL}
          isJoin={true}
          createUserJoinRequest={props.createUserJoinRequest}
        />
      </CSSTransition>

      <MobileMenu
        isOpen={showMobileMenuModal}
        user={props.user}
        profileLogout={props.profileLogout}
        translate={props.translate}
        switchMobileMenu={() => switchMobileMenu(!showMobileMenuModal)}
      />

      <header
        className={cn({
          "best-at-table-color": history.location.pathname === "/best-at-table/games",
          "one-on-one-color": history.location.pathname === "/one-on-one",
          "checkpoint-color": history.location.pathname === "/checkpoint",
        })}
      >
        <div className="header__inner">
          <div className="left-side">
            <Link to="/" className="logo">
              <img src="./assets/images/exampleS_logo.png" alt="examples Casino" className="main-logo__img" />
            </Link>
            <div className="time">
              <Timer />
            </div>
          </div>

          <div className="right-side">
            <div className="links">
              <Locale />
              {props.isAuthenticated ? (
                <>
                  <div style={{}}>
                    {props.user.permissionLevel === userDictionary.USER_PLAYER_PERMISSION_LEVEL ? (
                      <>
                        <div className="links__link links__link--balance">
                          <>
                            {props.translate("Balance") + ":"}
                            {props.user.balance + props.user.scedualPaymentBalance}
                          </>
                        </div>

                        <div
                          className="links__link links__link--balance"
                          style={{
                            color:
                              Number(props.balanceHistory.data.profitAmount) === 0
                                ? "green"
                                : Number(props.balanceHistory.data.profitAmount) > 0
                                ? "green"
                                : "#CC0000",
                          }}
                        >
                          {props.translate("Profit") + ":" + props.balanceHistory.data.profitAmount}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>

                  {props.user.permissionLevel === userDictionary.USER_ADMIN_PERMISSION_LEVEL ? (
                    <Link className="links__link mobile-hide" to="/statistics">
                      {props.translate("Transactions")}
                    </Link>
                  ) : (
                    <></>
                  )}
                  <div className="links__link links__link--balance">
                    {props.user.permissionLevel === userDictionary.USER_ADMIN_PERMISSION_LEVEL ? "∞" : <></>}
                  </div>
                  <Link className="links__link string-trim" to="/personal-info">
                    {props.user.login}
                  </Link>
                  <Link className="links__link desktop-menu__btn" to="/personal-info">
                    <div /> <div /> <div />
                  </Link>
                  <div className="links__link mobile-menu__btn" onClick={() => switchMobileMenu(!showMobileMenuModal)}>
                    <div /> <div /> <div />
                  </div>
                </>
              ) : (
                <>
                  {/* <div
                    className="links__link"
                    onClick={() => switchJoinModal(!showJoinModal)}
                    style={{
                      color: "#e6bc73"
                    }}
                  >
                    {props.translate("Join")}
                  </div> */}
                  <div className="links__link" onClick={() => switchLoginModal(!showLoginModal)}>
                    {props.translate("Log in")}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="header__mobile-links">
          {props.isAuthenticated ? (
            <>
              <Link to="/live-casino">{props.translate("Live casino")}</Link>
              <Link to="/slots">{props.translate("Slots")}</Link>
            </>
          ) : (
            <>
              <span>{props.translate("Log in to play")}</span>
            </>
          )}
        </div>
      </header>
    </>
  );
};

interface IStoreState {
  auth: {
    user: IProfile;
    isAuthenticated: boolean;
    balanceHistory: IBalanceHistory;
  };
}

const mapStateToProps = (state: IStoreState) => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
  balanceHistory: state.auth.balanceHistory,
});

const mapDispatchToProps = {
  profileLogout,
  createUserJoinRequest,
  balanceHistoryRequest,
  profileRequest,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withTranslate(Header)));
