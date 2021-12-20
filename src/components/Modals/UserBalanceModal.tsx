import React from "react";

import ModalWindow from "../ModalWindow";
import UserBalanceForm from "../Forms/UserBalanceForm/Form";
import ModalHOC from "./ModalHOC";
import { stringTrim } from "../../helpers";

const UserBalanceModal: React.FC<any> = props => {
  const { userData } = props;

  const onSubmit = values => {
    if (userData.type === "Add") {
      props.addBalanceRequest({
        target: userData.target,
        amount: values.amount
      });
    }
    if (userData.type === "Take") {
      props.takeBalanceRequest({
        target: userData.target,
        amount: values.amount
      });
    }
  };

  return (
    <ModalWindow dataModal={props.dataModal} closeModal={props.switchModal}>
      <div className="modal-container__inner">
        <div className="modal-container__header">
          <div>
            {props.translate(userData.type)} {props.translate("Balance")}
          </div>
          <div style={{ color: "#e6bc73" }}>{stringTrim(userData.name)}</div>
        </div>

        <UserBalanceForm
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

export default ModalHOC(UserBalanceModal);
