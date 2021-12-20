import React, { Component, ReactText } from "react";
import { connect } from "react-redux";
import { CSSTransition } from "react-transition-group";
import { withTranslate } from "react-redux-multilingual";

import { statisticsRequest } from "../../store/manageUsers/actions";
import { gamesRequest } from "../../store/evoGames/actions";
import { Table, UserBalanceModal, NoContent, Paginate, Button } from "../../components";

import Input from "../../components/Input";
import statisticsData from "../../assets/tableTemplates/statistics";
import { switchModalGlobal, getTypeByTypeName } from "../../helpers";
import config from "../../config";
import { IStatisticsProps, IStatisticsState, IStatisticGet, IRequestUserStatistic } from "../../interfaces/IStatistics";
import { IProfile, IHandlerStatus } from "../../interfaces/IProfile";
import DTPicker, { IDateOnChangeParams } from "../../components/DTPicker";
import { IEvoGame } from "../../interfaces/IEvoGames";

class Statistics extends Component<IStatisticsProps, IStatisticsState> {
  
  constructor(props) {
    super(props);

    this.state = {
      userData: null,
      statistics: {
        totalCount: 0,
        pageNumber: 0,
        amountPerPage: 0,
        balanceHistory: [],
      },
      searchLogin: "",
      searchType: "",
      currentLogin: "",
      currentType: [],
      userBalanceIsOpen: false,
      amountPerPage: config.amountPerPage,
      startDate: Math.round(new Date(this.props.values.start).getTime() / 1000),
      endDate: Math.round(new Date(this.props.values.end).getTime() / 1000),
    };
  }

  componentDidMount(): void {
    this.props.statisticsRequest({
      getParams: {
        target: this.props.user.id,
        timeTo: this.state.endDate,
        timeFrom: this.state.startDate,
        pageNumber: 1,
      }
    });
  }

  switchModal = (e: React.MouseEvent<HTMLElement>): void => switchModalGlobal(this, e);

  handlePage = (pageNumber: number): void => {
    const requestUserStatistic: IRequestUserStatistic = { 
      getParams: {
        target: this.props.user.id,
        timeTo: this.state.endDate,
        timeFrom: this.state.startDate,
        pageNumber,
      }
    };

    if (this.state.currentLogin) {
      requestUserStatistic.getParams.login = this.state.currentLogin;
    }

    if (this.state.currentType && this.state.currentType.length > 0) {
      requestUserStatistic.getParams.type = JSON.stringify(this.state.currentType);
    }

    this.props.statisticsRequest(requestUserStatistic);
  };

  selectDate = (date: IDateOnChangeParams, type: ReactText) => {
    if (String(type) === "startDate") {
      this.setState({
        startDate: date.date,
      });
    } else if (String(type) === "endDate") {
      this.setState({
        endDate: date.date,
      });
    }
  };

  userBalance = (e: any): void => {
    const [target, name, type] = e.currentTarget.dataset.user.split("::");

    this.setState({
      userData: { target, name, type },
      userBalanceIsOpen: true
    });
  };

  filter = () => {
    const requestUserStatistic: IRequestUserStatistic = { 
      getParams: {
        target: this.props.user.id,
        timeTo: this.state.endDate,
        timeFrom: this.state.startDate,
        pageNumber: 1,
      }
    };

    if (this.state.searchLogin) {
      requestUserStatistic.getParams.login = this.state.searchLogin;
    }

    if (this.state.searchType) {
      requestUserStatistic.getParams.type = JSON.stringify(getTypeByTypeName(this.state.searchType));
    }

    this.props.statisticsRequest(requestUserStatistic);

    this.setState({
      currentLogin: this.state.searchLogin,
      currentType: getTypeByTypeName(this.state.searchType),
    });
  }

  changeSearchLogin = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value: string = event.target.value;
    
    this.setState({
      searchLogin: value
    });
  }

  changeSearchType = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const value: string = event.target.value;
    
    this.setState({
      searchType: value
    });
  }

  render(): JSX.Element {
    const { userData, userBalanceIsOpen } = this.state;
    const { usersLoaded, translate, statistics } = this.props;

    return (
      <>
        <CSSTransition in={userBalanceIsOpen} unmountOnExit={true} timeout={200} classNames="modalWindowAnimation">
          <UserBalanceModal dataModal="userBalanceIsOpen" switchModal={this.switchModal} userData={userData} />
        </CSSTransition>

        <div className="statistics-page page-container">
          <div className="card-line card-line__header">
            <div>{translate("Transactions")}</div>
          </div>
          
          <div className="statistics__filter">
              <div className="DTPicker-container">
                <DTPicker
                  placeholderText="Start Time"
                  type="startDate"
                  value={this.props.values.start}
                  error={this.props.errors.start}
                  onChange={this.selectDate}
                  showTimeSelect={true}
                />
              </div>
              <div className="DTPicker-container">
                <DTPicker
                  placeholderText="Start Time"
                  type="endDate"
                  value={this.props.values.end}
                  error={this.props.errors.end}
                  onChange={this.selectDate}
                  showTimeSelect={true}
                />
              </div>
              <Button
                className="btn gold-btn nowrap"
                type="button"
                disabled={this.props.handlerStatus.status === "loading"}
                onClick={this.filter}
              >
                {this.props.translate("Apply")}
              </Button>
          </div>
          <div className="transactions-filter">
            <div>
              <Input
                className="input gold-input input-filter-login"
                placeholder={this.props.translate("Login")}
                type="text"
                name="searchLogin"
                error={""}
                value={this.state.searchLogin}
                onChange={this.changeSearchLogin}
              />
            </div>
            <div>
              <select value={this.state.searchType} className="select gold-select select-filter-type"
                name="searchType" onChange={this.changeSearchType}>
                <option value="">{translate("Type")}</option>
                <option value="BALANCE_TYPE_TRANSFER">{translate("BALANCE_TYPE_TRANSFER")}</option>
                <option value="BALANCE_TYPE_TAKE">{translate("BALANCE_TYPE_TAKE")}</option>
                <option value="BALANCE_TYPE_REDUCE">{translate("BALANCE_TYPE_REDUCE")}</option>
                <option value="BALANCE_TYPE_ADD">{translate("BALANCE_TYPE_ADD")}</option>
                <option value="BALANCE_TYPE_CASHBACK">{translate("BALANCE_TYPE_CASHBACK")}</option>
                <option value="BALANCE_TYPE_REFUND">{translate("BALANCE_TYPE_REFUND")}</option>
                <option value="BALANCE_TYPE_SCEDUAL_REDUCE">{translate("BALANCE_TYPE_SCEDUAL_REDUCE")}</option>
              </select>
            </div>  
          </div>
          <CSSTransition in={usersLoaded} unmountOnExit={true} timeout={200} classNames="modalWindowAnimation">
            {statistics.balanceHistory.length ? (
              <>
                <div className="statistics__content">
                  <div className="statistics__branch">
                    <Table
                      tableData={{
                        ...statisticsData,
                        body: statistics.balanceHistory
                      }}
                      handlers={{
                        userBalance: this.userBalance
                      }}
                    />
                  </div>
                </div>

                {/* <div className="card-line card-line__footer">
                  <div>{translate("Profit")} {statistics.changeOfBalance}</div>
                </div> */}
                <Paginate pageCount={statistics.totalCount / statistics.amountPerPage} handlePage={this.handlePage} />
              </>
            ) : (
              <NoContent translate={this.props.translate}/>
            )}
          </CSSTransition>
        </div>
      </>
    );
  }
}

interface IStoreState {
  auth: {
    user: IProfile;
  };
  manageUsers: {
    statistics: IStatisticGet;
  };
  manageHandlers: {
    handlerStatus: IHandlerStatus;
  };
  evoGames: {
    gamesList: IEvoGame[];
  }
  usersLoaded: boolean;
}

const mapStateToProps = (state: IStoreState) => ({
  user: state.auth.user,
  statistics: state.manageUsers.statistics,
  handlerStatus: state.manageHandlers.handlerStatus,
  gamesList: state.evoGames.gamesList,
  values: {
    start: new Date(new Date().getTime() - 604800000),
    end: new Date(),
  },
  errors: {
    start: "",
    end: "",
  },
  usersLoaded: true
});

const mapDispatchToProps = {
  statisticsRequest,
  gamesRequest,
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslate(Statistics));
