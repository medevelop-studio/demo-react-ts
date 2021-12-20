import React, { Component, ReactText } from "react";
import { connect } from "react-redux";
import { CSSTransition } from "react-transition-group";
import { withTranslate } from "react-redux-multilingual";
import cn from "classnames";

import { providerStatisticsRequest, providerUsersExpansion } from "../../store/manageUsers/actions";
import { Table, UserBalanceModal, NoContent, Paginate, DTPicker, Button, Input } from "../../components";
import evolutionStatisticsTable from "../../assets/tableTemplates/providerStatistics";
import { switchModalGlobal } from "../../helpers";
import config from "../../config";
import { IProviderStatisticsProps, IProviderStatisticsState, IProviderStatisticGet } from "../../interfaces/IStatistics";
import { IProfile, IHandlerStatus } from "../../interfaces/IProfile";
import { IDateOnChangeParams } from "../../components/DTPicker";
import { IProfileWithChildren } from "../../interfaces/IManageUsers";
import moment from "moment";
import { userDictionary } from "../../common/dictionary";
import { ITotalTableState } from "../../store/manageUsers/reducer";

class ProviderStatistics extends Component<IProviderStatisticsProps, IProviderStatisticsState> {
  
  constructor(props) {
    super(props);

    this.state = {
      userData: null,
      statistics: [],
      searchLogin: "",
      searchType: "",
      currentLogin: "",
      currentType: [],
      userBalanceIsOpen: false,
      amountPerPage: config.amountPerPage,
      startDate: Math.round(new Date(this.props.values.start).getTime() / 1000),
      endDate: Math.round(new Date(this.props.values.end).getTime() / 1000),
      searchedUserId: 0,
    };
  }

  componentDidMount(): void {
    this.props.providerStatisticsRequest({
      getParams: {
        timeTo: this.state.endDate,
        timeFrom: this.state.startDate,
        pageNumber: 1,
        amountPerPage: 1000,
      }
    });
  }

  switchModal = (e: React.MouseEvent<HTMLElement>): void => switchModalGlobal(this, e);

  handlePage = (pageNumber: number): void => {
    this.setState({
      amountPerPage: pageNumber * config.amountPerPage
    });
  };

  expandList = (e: any): void => {
    const id: number = +e.currentTarget.dataset.id;

    const user: IProfileWithChildren | undefined = this.props.allUserStatistics.find(item => item.id === id);

    if (!user) return;

    const ids: number[] = [];

    user.children.map(item => {
      ids.push(item.id);

      if (user._isShowChildren) {
        item.children.map(item => ids.push(item.id));
      }

      return null;
    });

    if (!ids.length) return;

    const newData: IProfileWithChildren[] = this.props.allUserStatistics.map(item => {
      if (item.id === id) {
        return {
          ...item,
          _isShowChildren: !user._isShowChildren
        };
      }
      if (ids.indexOf(item.id) !== -1) {
        return {
          ...item,
          _isShow: user._isShowChildren ? false : true,
          _isShowChildren: !user._isShowChildren ? false : true
        };
      }
      return item;
    });

    this.props.providerUsersExpansion(newData);
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
    this.props.providerStatisticsRequest({
      getParams: {
        timeTo: this.state.endDate,
        timeFrom: this.state.startDate,
        pageNumber: 1,
        amountPerPage: 1000,
      }
    });
  }

  changeSearchLogin = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value: string = event.target.value;
    const { allUserStatistics } = this.props;
    const user = allUserStatistics.find(user => user.login.toLowerCase() === value.toLowerCase());

    this.setState({
      searchLogin: value
    });

    if (!user) return;

    const parent = allUserStatistics.find(child => child.id === user.parent.id);
    let grandParent: IProfileWithChildren | undefined;

    const ids: number[] = [];

    if (!parent || user.parent?.permissionLevel === userDictionary.USER_ADMIN_PERMISSION_LEVEL) {
      const resetData = allUserStatistics.map(user => {
        return {
          ...user,
          _isShow: user.parent?.permissionLevel === userDictionary.USER_ADMIN_PERMISSION_LEVEL ? true : false,
          _isShowChildren: false
        };
      });

      this.props.providerUsersExpansion(resetData);
    } else {
      if (parent._isShow) {
        parent.children.map(item => {
          ids.push(item.id);

          return null;
        });
      } else {
        grandParent = allUserStatistics.find(user => user.id === parent.parent?.id);

        if (!grandParent || !grandParent._isShow) {
          return;
        }

        grandParent.children.map(item => {
          ids.push(item.id);

          return null;
        });

        parent.children.map(item => {
          ids.push(item.id);

          return null;
        });
      }

      if (!ids.length) return;

      const newData: IProfileWithChildren[] = allUserStatistics.map(item => {
        if (grandParent && item.id === grandParent.id) {
          return {
            ...item,
            _isShowChildren: true
          };
        }

        if (ids.indexOf(item.id) !== -1) {
          return {
            ...item,
            _isShow: true,
            _isShowChildren: item.id === parent.id ? true : false
          };
        } else {
          return {
            ...item,
            _isShow: item.parent?.permissionLevel === userDictionary.USER_ADMIN_PERMISSION_LEVEL
              ? true
              : item.parent?.id === parent.parent?.id
                ? true
                : false,
            _isShowChildren: (grandParent && item.id === grandParent.id) || parent.id === item.id ? true : false
          }
        }
      });

      this.props.providerUsersExpansion(newData);
    }

    this.setState({
      searchedUserId: user.id
    });
  }

  render(): JSX.Element {
    const { userData, userBalanceIsOpen, amountPerPage } = this.state;
    const { userTreeStatistics, usersLoaded, totalTableState, translate } = this.props;

    return (
      <>
        <CSSTransition in={userBalanceIsOpen} unmountOnExit={true} timeout={200} classNames="modalWindowAnimation">
          <UserBalanceModal dataModal="userBalanceIsOpen" switchModal={this.switchModal} userData={userData} />
        </CSSTransition>

        <div className="statistics-page page-container provider-statistics">
          <div className="card-line card-line__header">
            <div>{translate("Reports")}</div>
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
              {this.props.translate("Choose date")}
            </Button>
          </div>
          <CSSTransition in={usersLoaded} unmountOnExit={true} timeout={200} classNames="modalWindowAnimation">
            {userTreeStatistics && userTreeStatistics.length > 0 ? (
              <>
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
                <div className="statistics__content provider-statistics__table">
                  <div className={cn("statistics__branch", { rtl: localStorage.locale === "he" })}>

                    <Table
                      style={
                        localStorage.locale === "he" ? { paddingRight: "160px" } : { paddingLeft: "160px" }
                      }
                      tableData={{
                        ...evolutionStatisticsTable,
                        body: userTreeStatistics.slice(amountPerPage - config.amountPerPage, amountPerPage)
                      }}
                      handlers={{
                        userBalance: this.userBalance,
                        expandList: this.expandList,
                      }}
                      additionalData={this.props.user}
                      externalDataObj={totalTableState}
                      searchedId={this.state.searchedUserId}
                    />
                  </div>
                </div>
                <Paginate pageCount={userTreeStatistics.length / config.amountPerPage} handlePage={this.handlePage} />
              </>
            ) : (
              <NoContent translate={translate} />
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
    providerStatistics: IProviderStatisticGet[];
    userTreeStatistics: IProfileWithChildren[];
    allUserStatistics: IProfileWithChildren[];
    usersStatisticsLoaded: boolean;
    totalTableState: ITotalTableState;
  };
  manageHandlers: {
    handlerStatus: IHandlerStatus;
  };
  usersLoaded: boolean;
}

const mapStateToProps = (state: IStoreState) => ({
  user: state.auth.user,
  providerStatistics: state.manageUsers.providerStatistics,
  userTreeStatistics: state.manageUsers.userTreeStatistics,
  allUserStatistics: state.manageUsers.allUserStatistics,
  usersStatisticsLoaded: state.manageUsers.usersStatisticsLoaded,
  handlerStatus: state.manageHandlers.handlerStatus,
  totalTableState: state.manageUsers.totalTableState,
  values: {
    start: new Date(moment().day(2).valueOf()).setHours(10, 0, 0, 0) > new Date().getTime()
          ? new Date(moment().day(-5).valueOf()).setHours(10, 0, 0, 0)
          : new Date(moment().day(2).valueOf()).setHours(10, 0, 0, 0),
    end: new Date(),
  },
  errors: {
    start: "",
    end: "",
  },
  usersLoaded: true
})

const mapDispatchToProps = {
  providerStatisticsRequest,
  providerUsersExpansion,
};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslate(ProviderStatistics));
