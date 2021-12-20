import React, { Component } from "react";
import { connect } from "react-redux";
import { withTranslate } from "react-redux-multilingual";

import { loginRequest, userEdit } from "../../store/auth/actions";
import {
  createUserRequest,
  createUserJoinRequest,
  userBanRequest,
  addBalanceRequest,
  takeBalanceRequest,
  cashbackRequest,
  profitRequest,
  providerMaxLimitRequest,
  changePasswordRequest,
  changeCommentRequest,
  commentRequest,
  manageUsersRequest,
  scedualPaymentRequest,
  setScedualPaymentRequest,
  deleteScedualPaymentRequest,
} from "../../store/manageUsers/actions";

const ModalHOC = WrappedComponent => {
  class ComponentHOC extends Component<any, any> {
    state = {
      handlerStatus: {
        status: "",
        message: ""
      }
    };

    componentDidUpdate() {
      if (this.props.handlerStatus.status === "success" && this.state.handlerStatus.status !== "success") {
        this.setState(
          {
            handlerStatus: this.props.handlerStatus
          },
          () => {
            this.props.switchModal(this.props.dataModal);
          }
        );
      }
    }

    render() {
      return <WrappedComponent {...this.state} {...this.props} />;
    }
  }

  return withTranslate(
    connect(
      (state: any) => ({
        user: state.auth.user,
        handlerStatus: state.manageHandlers.handlerStatus
      }),
      {
        loginRequest,
        userEdit,
        createUserRequest,
        createUserJoinRequest,
        userBanRequest,
        addBalanceRequest,
        takeBalanceRequest,
        cashbackRequest,
        profitRequest,
        providerMaxLimitRequest,
        changePasswordRequest,
        changeCommentRequest,
        commentRequest,
        manageUsersRequest,
        scedualPaymentRequest,
        setScedualPaymentRequest,
        deleteScedualPaymentRequest,
      }
    )(ComponentHOC)
  );
};

export default ModalHOC;
