import React from "react";
import { connect } from "react-redux";
import { withTranslate } from "react-redux-multilingual";
import { CSSTransition } from "react-transition-group";
import moment from "moment";

import { balanceHistoryRequest } from "../../store/auth/actions";
import { gamesRequest } from "../../store/evoGames/actions";
import { Table, Paginate, NoContent } from "../../components";
import balanceData from "../../assets/tableTemplates/balance";
import { userDictionary } from "../../common/dictionary";
import { IBalance, IBalanceHistory } from "../../interfaces/IBalance";
import { IProfile, IHandlerStatus } from "../../interfaces/IProfile";
import { IEvoGame } from "../../interfaces/IEvoGames";
import WeekFilter from "../../components/WeekFilter";

class Balance extends React.Component<IBalance, any> {
  
  constructor(props) {
    super(props);

    const currentTuesday: Date = new Date(moment().day(2).valueOf()).setHours(7, 0, 0, 0) > new Date().getTime()
        ? new Date(moment().day(-5).valueOf())
        : new Date(moment().day(2).valueOf());

    currentTuesday.setHours(7, 0, 0, 0);

    const endOfPeriod: Date = new Date() > new Date(currentTuesday.getTime() + 604800000)
      ? new Date(currentTuesday.getTime() + 604800000)
      : new Date();

    this.state = {
      timeFrom: currentTuesday,
      timeTo: endOfPeriod
    };
  }

  componentDidMount(): void {
    this.props.balanceHistoryRequest({
      getParams: {
        pageNumber: 1,
        target: this.props.user.id,
        timeFrom: Math.round(this.state.timeFrom.getTime() / 1000),
        timeTo: Math.round(this.state.timeTo.getTime() / 1000),
      }
    });
  }

  handlePage = (pageNumber: number): void => {
    this.props.balanceHistoryRequest({
      getParams: {
        pageNumber,
        target: this.props.user.id,
        timeFrom: Math.round(this.state.timeFrom.getTime() / 1000),
        timeTo: Math.round(this.state.timeTo.getTime() / 1000),
      }
    });
  };

  getPreviousWeek = (): void => {
    const newTuesday: Date = new Date(this.state.timeFrom.getTime() - 604800000);

    this.props.balanceHistoryRequest({
      getParams: {
        pageNumber: 1,
        target: this.props.user.id,
        timeFrom: Math.round(newTuesday.getTime() / 1000),
        timeTo: Math.round(this.state.timeFrom.getTime() / 1000),
      }
    });

    this.setState({
      timeTo: this.state.timeFrom,
      timeFrom: newTuesday
    });
  }

  getNextWeek = (): void => {
    if (new Date(this.state.timeFrom.getTime() + 604800000) > new Date()) {
      return;
    }

    const newTuesday: Date = new Date(this.state.timeFrom.getTime() + 604800000);

    const endOfPeriod: Date = new Date() > new Date(newTuesday.getTime() + 604800000)
      ? new Date(newTuesday.getTime() + 604800000)
      : new Date();

    this.props.balanceHistoryRequest({
      getParams: {
        pageNumber: 1,
        target: this.props.user.id,
        timeFrom: Math.round(newTuesday.getTime() / 1000),
        timeTo: Math.round(endOfPeriod.getTime() / 1000),
      }
    });

    this.setState({
      timeTo: endOfPeriod,
      timeFrom: newTuesday
    });
  }

  render(): JSX.Element {
    const { user, balanceHistory, balanceLoaded, translate } = this.props;

    return (
      <div className="balance-page page-container">
        <div className="balance__header">
          <div className="header__title">
            <div>{translate("Balance")}:</div>
            <div>{translate("Profit")}:</div>
          </div>
          <div className="header__balance">
            <div>{user.permissionLevel === userDictionary.USER_ADMIN_PERMISSION_LEVEL ? "∞" : user.balance}</div>
            <div style={{color: Number(balanceHistory.data.profitAmount) === 0 ? "green" : Number(balanceHistory.data.profitAmount) > 0 ? "green" : "#CC0000"}}>
              {user.permissionLevel === userDictionary.USER_ADMIN_PERMISSION_LEVEL ? "∞" : balanceHistory.data.profitAmount}</div>
          </div>
        </div>

        <WeekFilter
          timeFrom={this.state.timeFrom}
          timeTo={this.state.timeTo}
          handlerStatus={this.props.handlerStatus}
          translate={translate}
          onClickBack={this.getPreviousWeek}
          onClickNext={this.getNextWeek}
        />

        <CSSTransition in={balanceLoaded} unmountOnExit={true} timeout={200} classNames="modalWindowAnimation">
          {balanceHistory.data.balances.length > 0 ? (
            <>
              <div className="balance__content">
                <Table tableData={{ ...balanceData, body: balanceHistory.data.balances }} />
              </div>

              <div className="card-line card-line__footer" />

              <Paginate pageCount={balanceHistory.totalCount / balanceHistory.amountPerPage} handlePage={this.handlePage} />
            </>
          ) : (
            <NoContent translate={translate} />
          )}
        </CSSTransition>
      </div>
    );
  }
}

interface IStoreState {
  auth: {
    user: IProfile;
    balanceHistory: IBalanceHistory;
    balanceLoaded: boolean;
  };
  evoGames: {
    gamesList: IEvoGame[];
  }
  usersLoaded: boolean;
  manageHandlers: {
    handlerStatus: IHandlerStatus;
  };
};

const mapStateToProps = (state: IStoreState) => ({
  user: state.auth.user,
  balanceHistory: state.auth.balanceHistory,
  balanceLoaded: state.auth.balanceHistory.balanceLoaded,
  gamesList: state.evoGames.gamesList,
  handlerStatus: state.manageHandlers.handlerStatus
});

const mapDispatchToProps = {
  balanceHistoryRequest,
  gamesRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslate(Balance));
