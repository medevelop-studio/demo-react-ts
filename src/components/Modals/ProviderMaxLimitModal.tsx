import React from "react";

import ModalWindow from "../ModalWindow";
import ProviderMaxLimitForm from "../Forms/ProviderMaxLimitForm/Form";
import ModalHOC from "./ModalHOC";
import { IUserData, IHandlerStatus } from "../../interfaces/IProfile";

interface IProviderMaxLimitModal {
  userData: IUserData;
  dataModal: string;
  handlerStatus: IHandlerStatus;
  translate(key: string): string;
  providerMaxLimitRequest(object: { userId: number, providerMaxLimit: number }): void;
  switchModal(e: React.MouseEvent<HTMLElement>): void;
}

const ProviderMaxLimitModal: React.FC<IProviderMaxLimitModal> = props => {
  const onSubmit = (values: { amount: number }): void => {
    props.providerMaxLimitRequest({
      userId: props.userData.userId,
      providerMaxLimit: values.amount
    });
  };

  return (
    <ModalWindow dataModal={props.dataModal} closeModal={props.switchModal}>
      <div className="modal-container__inner">
        <div className="modal-container__header">
          <div>{props.translate("Provider Max Limit")}</div>
          <div style={{ color: "#e6bc73" }}>{props.userData.name}</div>
        </div>

        <ProviderMaxLimitForm
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

export default ModalHOC(ProviderMaxLimitModal);
