import React from "react";

import ModalWindow from "../ModalWindow";
import ProfitForm from "../Forms/ProfitForm/Form";
import ModalHOC from "./ModalHOC";
import { IUserData, IHandlerStatus } from "../../interfaces/IProfile";

interface IProfitModal {
  userData: IUserData;
  dataModal: string;
  handlerStatus: IHandlerStatus;
  translate(key: string): string;
  profitRequest(object: { userId: number, profitPercent: number }): void;
  switchModal(e: React.MouseEvent<HTMLElement>): void;
}

const ProfitModal: React.FC<IProfitModal> = props => {
  const onSubmit = (values: { amount: number }): void => {
    props.profitRequest({
      userId: props.userData.userId,
      profitPercent: values.amount
    });
  };

  return (
    <ModalWindow dataModal={props.dataModal} closeModal={props.switchModal}>
      <div className="modal-container__inner">
        <div className="modal-container__header">
          <div>{props.translate("ProfitPercent")}</div>
          <div style={{ color: "#e6bc73" }}>{props.userData.name}</div>
        </div>

        <ProfitForm
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

export default ModalHOC(ProfitModal);
