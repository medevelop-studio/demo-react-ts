import React from "react";

import ModalWindow from "../ModalWindow";
import LoginForm from "../Forms/LoginForm/Form";
import ModalHOC from "./ModalHOC";

const LoginModal: React.FC<any> = props => {
  const onSubmit = values => {
    props.loginRequest(values);
  };

  return (
    <ModalWindow closeModal={props.switchModal}>
      <div className="modal-container__inner modal-container__login">
        <div className="modal-container__header">{props.translate("Log in")}</div>

        <LoginForm onSubmit={onSubmit} handlerStatus={props.handlerStatus} switchModal={props.switchModal} translate={props.translate} />
      </div>
    </ModalWindow>
  );
};

export default ModalHOC(LoginModal);
