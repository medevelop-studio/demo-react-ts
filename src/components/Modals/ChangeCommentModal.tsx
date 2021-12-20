import React from "react";

import ModalWindow from "../ModalWindow";
import ChangeCommentForm from "../Forms/ChangeCommentForm/Form";
import ModalHOC from "./ModalHOC";
import { stringTrim } from "../../helpers";
import { IUserData, IHandlerStatus } from "../../interfaces/IProfile";

interface IChangeCommentModal {
  comment: {
    text: string;
  };
  userData: IUserData;
  dataModal: string;
  handlerStatus: IHandlerStatus;
  translate(key: string): string;
  changeCommentRequest(object: { text: string,  target: number }): void;
  switchModal(e: React.MouseEvent<HTMLElement>): void;
}

const ChangeCommentModal: React.FC<IChangeCommentModal>  = props => {
  const { userData } = props;

  const onSubmit = (values: { text: string }): void => {
    props.changeCommentRequest({
      ...values,
      target: userData.userId as number
    });
  };

  return (
    <ModalWindow dataModal={props.dataModal} closeModal={props.switchModal}>
      <div className="modal-container__inner">
        <div className="modal-container__header">
          <div>{props.translate("Change Comment")}</div>
          <div style={{ color: "#e6bc73" }}>{stringTrim(userData.name)}</div>
        </div>

        <ChangeCommentForm
          onSubmit={onSubmit}
          userData={userData}
          handlerStatus={props.handlerStatus}
          dataModal={props.dataModal}
          switchModal={props.switchModal}
          translate={props.translate}
          customValues={{ text: props.comment.text }}
        />
      </div>
    </ModalWindow>
  );
};

export default ModalHOC(ChangeCommentModal);
