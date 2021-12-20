import React, { Component } from "react";
import { connect } from "react-redux";
import { CSSTransition } from "react-transition-group";
import { withTranslate } from "react-redux-multilingual";

import {
  manageUsersRequest,
  manageUsersExpansion,
  commentRequest,
  commentSuccess,
  scedualPaymentRequest,
  scedualPaymentSuccess,
  onUserSelect,
} from "../../store/manageUsers/actions";
import {
  Table,
  NoContent,
  Paginate,
  CreateUserModal,
  UserBalanceModal,
  UserBanModal,
  CashbackModal,
  ProfitModal,
  ChangePasswordModal,
  ChangeCommentModal,
  ProviderMaxLimitModal,
  Input,
} from "../../components";
import CreateUserBtns from "./CreateUserBtns";

import manageUsersData from "../../assets/tableTemplates/manageUsers";
import { userDictionary, ScedualPaymentDictionary } from "../../common/dictionary";
import { switchModalGlobal } from "../../helpers";
import config from "../../config";
import { IManageUsersProps, IManageUsersState, IProfileWithChildren } from "../../interfaces/IManageUsers";
import { IProfile } from "../../interfaces/IProfile";
import { IComment } from "../../interfaces/IComment";
import ScedualPaymentModal from "../../components/Modals/ScedualPaymentModal";
import { IScedualPayment } from "../../interfaces/IScedualPayment";
import { withRouter } from "react-router-dom";

class ManageUsers extends Component<IManageUsersProps, IManageUsersState> {
  state = {
    permissionLevel: 0,
    userData: null,
    createUserIsOpen: false,
    userBalanceIsOpen: false,
    userBanIsOpen: false,
    cashbackIsOpen: false,
    profitIsOpen: false,
    limitIsOpen: false,
    scedualPaymentIsOpen: false,
    changePasswordIsOpen: false,
    amountPerPage: config.amountPerPage,
    changeCommentIsOpen: false,
    searchLogin: "",
    searchedUserId: 0,
  };

  componentDidMount(): void {
    this.props.manageUsersRequest();
  }

  switchModal = (e: React.MouseEvent<HTMLElement>): void => switchModalGlobal(this, e);

  createUserModal = (e: any): void => {
    this.setState({
      permissionLevel: +e.currentTarget.dataset.permissionlevel,
      createUserIsOpen: true,
    });
  };

  handlePage = (pageNumber: number): void => {
    this.setState({
      amountPerPage: pageNumber * config.amountPerPage,
    });
  };

  expandList = (e: any): void => {
    const id: number = +e.currentTarget.dataset.id;

    const user: IProfileWithChildren | undefined = this.props.allUsers.find((item) => item.id === id);

    if (!user) return;

    const ids: number[] = [];

    user.children.map((item) => {
      ids.push(item.id);

      if (user._isShowChildren) {
        item.children.map((item) => ids.push(item.id));
      }

      return null;
    });

    if (!ids.length) return;

    const newData: IProfileWithChildren[] = this.props.allUsers.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          _isShowChildren: !user._isShowChildren,
        };
      }
      if (ids.indexOf(item.id) !== -1) {
        return {
          ...item,
          _isShow: user._isShowChildren ? false : true,
          _isShowChildren: !user._isShowChildren ? false : true,
        };
      }
      return item;
    });

    this.props.manageUsersExpansion(newData);
  };

  changePassword = (e: any): void => {
    const [userId, name] = e.currentTarget.dataset.user.split("::");

    this.setState({
      changePasswordIsOpen: true,
      userData: {
        userId,
        name,
      },
    });
  };

  userBan = (e: any): void => {
    const [userId, name, status] = e.currentTarget.dataset.user.split("::");

    this.setState({
      userBanIsOpen: true,
      userData: {
        userId,
        name,
        userStatus: +status === userDictionary.USER_STATUS_BANNED ? userDictionary.USER_STATUS_ACTIVE : userDictionary.USER_STATUS_BANNED,
      },
    });
  };

  changeComment = (e: any): void => {
    const [userId, name] = e.currentTarget.dataset.user.split("::");

    if (+userId !== (this.props.comment.target && this.props.comment.target.id)) {
      this.props.commentSuccess({});
      this.props.commentRequest({ getParams: { target: userId } });
    }

    this.setState({
      changeCommentIsOpen: true,
      userData: {
        userId,
        name,
      },
    });
  };

  userBalance = (e: any): void => {
    const [target, name, type] = e.currentTarget.dataset.user.split("::");

    this.setState({
      userData: { target, name, type },
      userBalanceIsOpen: true,
    });
  };

  cashback = (e: any): void => {
    const [userId, name, cashbackPercent] = e.currentTarget.dataset.user.split("::");

    this.setState({
      userData: {
        userId,
        name,
        cashbackPercent,
      },
      cashbackIsOpen: true,
    });
  };

  profit = (e: any): void => {
    const [userId, name, profitPercent] = e.currentTarget.dataset.user.split("::");
    this.setState({
      userData: {
        userId,
        name,
        profitPercent,
      },
      profitIsOpen: true,
    });
  };

  limit = (e: any): void => {
    const [userId, name, providerMaxLimit] = e.currentTarget.dataset.user.split("::");

    this.setState({
      userData: {
        userId,
        name,
        providerMaxLimit,
      },
      limitIsOpen: true,
    });
  };

  scedualPayment = (e: any): void => {
    const [userId, name] = e.currentTarget.dataset.user.split("::");

    if (
      !this.props.scedualPayment ||
      !this.props.scedualPayment.user ||
      (this.props.scedualPayment.user && !this.props.scedualPayment.user.some((user) => user.id === Number(userId)))
    ) {
      this.props.scedualPaymentSuccess({});
      this.props.scedualPaymentRequest({ userId, status: ScedualPaymentDictionary.SCEDUAL_PAYMENT_STATUS_CREATED });
    }

    this.setState({
      userData: {
        userId,
        name,
      },
      scedualPaymentIsOpen: true,
    });
  };

  loginHistory = (e: React.MouseEvent<HTMLElement>, id: number, userName: string) => {
    e.stopPropagation();
    this.props.history.push(`/login-history/${id}`);
    this.props.onUserSelect(userName);
  };

  changeSearchLogin = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value: string = event.target.value;
    const { allUsers } = this.props;
    const user = allUsers.find((user) => user.login.toLowerCase() === value.toLowerCase());

    this.setState({
      searchLogin: value,
    });

    if (!user) return;

    const parent = allUsers.find((child) => child.id === user.parent.id);
    let grandParent: IProfileWithChildren | undefined;

    const ids: number[] = [];

    if (!parent || user.parent.permissionLevel === userDictionary.USER_ADMIN_PERMISSION_LEVEL) {
      const resetData = allUsers.map((user) => {
        return {
          ...user,
          _isShow: user.parent.permissionLevel === userDictionary.USER_ADMIN_PERMISSION_LEVEL ? true : false,
          _isShowChildren: false,
        };
      });

      this.props.manageUsersExpansion(resetData);
    } else {
      if (parent._isShow) {
        parent.children.map((item) => {
          ids.push(item.id);

          return null;
        });
      } else {
        grandParent = allUsers.find((user) => user.id === parent.parent.id);

        if (!grandParent || !grandParent._isShow) {
          return;
        }

        grandParent.children.map((item) => {
          ids.push(item.id);

          return null;
        });

        parent.children.map((item) => {
          ids.push(item.id);

          return null;
        });
      }

      if (!ids.length) return;

      const newData: IProfileWithChildren[] = allUsers.map((item) => {
        if (grandParent && item.id === grandParent.id) {
          return {
            ...item,
            _isShowChildren: true,
          };
        }

        if (ids.indexOf(item.id) !== -1) {
          return {
            ...item,
            _isShow: true,
            _isShowChildren: item.id === parent.id ? true : false,
          };
        } else {
          return {
            ...item,
            _isShow:
              item.parent.permissionLevel === userDictionary.USER_ADMIN_PERMISSION_LEVEL
                ? true
                : item.parent.id === parent.parent.id
                ? true
                : false,
            _isShowChildren: (grandParent && item.id === grandParent.id) || parent.id === item.id ? true : false,
          };
        }
      });

      this.props.manageUsersExpansion(newData);
    }

    this.setState({
      searchedUserId: user.id,
    });
  };

  render(): JSX.Element {
    const {
      permissionLevel,
      userData,
      createUserIsOpen,
      userBalanceIsOpen,
      changePasswordIsOpen,
      userBanIsOpen,
      cashbackIsOpen,
      profitIsOpen,
      limitIsOpen,
      amountPerPage,
      changeCommentIsOpen,
      scedualPaymentIsOpen,
    } = this.state;
    const { user, allUsers, userTree, usersLoaded, translate } = this.props;

    return (
      <>
        <CSSTransition in={createUserIsOpen} unmountOnExit={true} timeout={200} classNames="modalWindowAnimation">
          <CreateUserModal
            dataModal="createUserIsOpen"
            switchModal={this.switchModal}
            permissionLevel={permissionLevel}
            allUsers={allUsers}
            userTree={userTree}
            usersLoaded={usersLoaded}
          />
        </CSSTransition>

        <CSSTransition in={userBalanceIsOpen} unmountOnExit={true} timeout={200} classNames="modalWindowAnimation">
          <UserBalanceModal dataModal="userBalanceIsOpen" switchModal={this.switchModal} userData={userData} />
        </CSSTransition>

        <CSSTransition in={changePasswordIsOpen} unmountOnExit={true} timeout={200} classNames="modalWindowAnimation">
          <ChangePasswordModal dataModal="changePasswordIsOpen" switchModal={this.switchModal} userData={userData} />
        </CSSTransition>

        <CSSTransition in={userBanIsOpen} unmountOnExit={true} timeout={200} classNames="modalWindowAnimation">
          <UserBanModal dataModal="userBanIsOpen" switchModal={this.switchModal} userData={userData} />
        </CSSTransition>

        <CSSTransition in={cashbackIsOpen} unmountOnExit={true} timeout={200} classNames="modalWindowAnimation">
          <CashbackModal dataModal="cashbackIsOpen" switchModal={this.switchModal} userData={userData} />
        </CSSTransition>

        <CSSTransition in={profitIsOpen} unmountOnExit={true} timeout={200} classNames="modalWindowAnimation">
          <ProfitModal dataModal="profitIsOpen" switchModal={this.switchModal} userData={userData} />
        </CSSTransition>

        <CSSTransition in={limitIsOpen} unmountOnExit={true} timeout={200} classNames="modalWindowAnimation">
          <ProviderMaxLimitModal dataModal="limitIsOpen" switchModal={this.switchModal} userData={userData} />
        </CSSTransition>

        <CSSTransition in={scedualPaymentIsOpen} unmountOnExit={true} timeout={200} classNames="modalWindowAnimation">
          <ScedualPaymentModal
            dataModal="scedualPaymentIsOpen"
            switchModal={this.switchModal}
            userData={userData}
            scedualPayment={this.props.scedualPayment}
          />
        </CSSTransition>

        <CSSTransition in={changeCommentIsOpen} unmountOnExit={true} timeout={200} classNames="modalWindowAnimation">
          <ChangeCommentModal
            dataModal="changeCommentIsOpen"
            switchModal={this.switchModal}
            userData={userData}
            comment={this.props.comment}
          />
        </CSSTransition>

        <div className="manage-users-page page-container">
          <CreateUserBtns user={user} translate={translate} createUserModal={this.createUserModal} />

          <CSSTransition in={usersLoaded} unmountOnExit={true} timeout={200} classNames="modalWindowAnimation">
            {allUsers.length ? (
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
                <div className="manage-users__content">
                  <div className="card-line card-line__header">
                    <div>{translate("Users")}</div>
                  </div>

                  <Table
                    tableData={{
                      ...manageUsersData,
                      body: userTree.slice(amountPerPage - config.amountPerPage, amountPerPage),
                    }}
                    handlers={{
                      userBan: this.userBan,
                      expandList: this.expandList,
                      changePassword: this.changePassword,
                      userBalance: this.userBalance,
                      cashback: this.cashback,
                      profit: this.profit,
                      limit: this.limit,
                      scedualPayment: this.scedualPayment,
                      changeComment: this.changeComment,
                      loginHistory: this.loginHistory,
                    }}
                    additionalData={this.props.user}
                    searchedId={this.state.searchedUserId}
                  />
                </div>

                <div className="card-line card-line__footer" />

                <Paginate pageCount={userTree.length / config.amountPerPage} handlePage={this.handlePage} />
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
    allUsers: IProfileWithChildren[];
    userTree: IProfileWithChildren[];
    usersLoaded: boolean;
    comment: IComment;
    scedualPayment: IScedualPayment;
  };
}

const mapStateToProps = (state: IStoreState) => ({
  user: state.auth.user,
  allUsers: state.manageUsers.allUsers,
  userTree: state.manageUsers.userTree,
  usersLoaded: state.manageUsers.usersLoaded,
  comment: state.manageUsers.comment,
  scedualPayment: state.manageUsers.scedualPayment,
});

const mapDispatchToProps = {
  manageUsersRequest,
  manageUsersExpansion,
  commentRequest,
  commentSuccess,
  scedualPaymentRequest,
  scedualPaymentSuccess,
  onUserSelect,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withTranslate(ManageUsers)));
