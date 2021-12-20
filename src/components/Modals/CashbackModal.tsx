import React from "react";

import ModalWindow from "../ModalWindow";
import CashbackForm from "../Forms/CashbackForm/Form";
import ModalHOC from "./ModalHOC";
import { IUserData, IHandlerStatus } from "../../interfaces/IProfile";

interface ICashbackModal {
  userData: IUserData;
  dataModal: string;
  handlerStatus: IHandlerStatus;
  translate(key: string): string;
  cashbackRequest(object: { userId: number, cashbackPercent: number }): void;
  switchModal(e: React.MouseEvent<HTMLElement>): void;
}

const CashbackModal: React.FC<ICashbackModal> = props => {
  const onSubmit = (values: { amount: number }): void => {
    props.cashbackRequest({
      userId: props.userData.userId,
      cashbackPercent: values.amount
    });
  };

  return (
    <ModalWindow dataModal={props.dataModal} closeModal={props.switchModal}>
      <div className="modal-container__inner">
        <div className="modal-container__header">
          <div>{props.translate("Cashback")}</div>
          <div style={{ color: "#e6bc73" }}>{props.userData.name}</div>
        </div>

        <CashbackForm
          onSubmit={onSubmit}
          handlerStatus={props.handlerStatus}
          userData={props.userData}
          dataModal={props.dataModal}
          switchModal={props.switchModal}
          translate={props.translate}
        />
      </div>
    </ModalWindow>
  );
};

export default ModalHOC(CashbackModal);
