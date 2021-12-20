import React from "react";

import ModalWindow from "../ModalWindow";
import ChangePasswordForm from "../Forms/ChangePasswordForm/Form";
import ModalHOC from "./ModalHOC";
import { stringTrim } from "../../helpers";
import { IUserData, IHandlerStatus } from "../../interfaces/IProfile";

interface IChangePasswordModal {
  userData: IUserData;
  dataModal: string;
  handlerStatus: IHandlerStatus;
  translate(key: string): string;
  changePasswordRequest(object: { newPassword: string, confirmPassword: string,  userId: number }): void;
  switchModal(e: React.MouseEvent<HTMLElement>): void;
}

const ChangePasswordModal: React.FC<IChangePasswordModal> = props => {
  const { userData } = props;

  const onSubmit = (values: { newPassword: string, confirmPassword: string }): void => {
    props.changePasswordRequest({
      ...values,
      userId: userData.userId
    });
  };

  return (
    <ModalWindow dataModal={props.dataModal} closeModal={props.switchModal}>
      <div className="modal-container__inner">
        <div className="modal-container__header">
          <div>{props.translate("Change password")}</div>
          <div style={{ color: "#e6bc73" }}>{stringTrim(userData.name)}</div>
        </div>

        <ChangePasswordForm
          onSubmit={onSubmit}
          userData={userData}
          handlerStatus={props.handlerStatus}
          dataModal={props.dataModal}
          switchModal={props.switchModal}
          translate={props.translate}
        />
      </div>
    </ModalWindow>
  );
};

export default ModalHOC(ChangePasswordModal);
