import React from "react";

import ModalWindow from "../ModalWindow";
import ScedualPaymentForm from "../Forms/ScedualPaymentForm/Form";
import ModalHOC from "./ModalHOC";
import { IUserData, IHandlerStatus } from "../../interfaces/IProfile";
import { stringTrim } from "../../helpers";
import cn from "classnames";

interface IScedualPaymentModal {
  scedualPayment: {
    id: number;
    amount: number;
    paymentDate: Date;
    interval: number;
  };
  userData: IUserData;
  dataModal: string;
  handlerStatus: IHandlerStatus;
  translate(key: string): string;
  setScedualPaymentRequest(object: { userId: number, amount: number, paymentData: number, interval: number }): void;
  deleteScedualPaymentRequest(object: { id: number }): void;
  switchModal(e: React.MouseEvent<HTMLElement>): void;
}

const ScedualPaymentModal: React.FC<IScedualPaymentModal> = props => {
  const { userData } = props;
  const [scedualPaymentType, switchType] = React.useState("weekly");

  const onSubmit = (values): void => {
    props.setScedualPaymentRequest({
      ...values,
      users: JSON.stringify([Number(userData.userId)]),
      interval: scedualPaymentType === "weekly" ? 604800 : (
        scedualPaymentType === "monthly" 
          ? 2628000
          : null
      ),
    });
  };

  return (
    <ModalWindow dataModal={props.dataModal} closeModal={props.switchModal}>
      <div className="modal-container__inner">
        <div className="modal-container__header">
          <div>{props.translate("Set scedual payment")}</div>
          <div style={{ color: "#e6bc73" }}>{stringTrim(userData.name)}</div>
        </div>

        <div className="create-game__blocks">
          <div
            onClick={() => switchType("weekly")}
            className={cn("create-game__block", {
              "create-game__block--selected": scedualPaymentType === "weekly"
            })}
          >
            {props.translate("Weekly")}
          </div>
          <div
            onClick={() => switchType("monthly")}
            className={cn("create-game__block", {
              "create-game__block--selected": scedualPaymentType === "monthly"
            })}
          >
            {props.translate("Monthly")}
          </div>
        </div>

        {scedualPaymentType === "weekly" && (
          <ScedualPaymentForm
            onSubmit={onSubmit}
            onDelete={props.deleteScedualPaymentRequest}
            handlerStatus={props.handlerStatus}
            userData={userData}
            dataModal={props.dataModal}
            switchModal={props.switchModal}
            translate={props.translate}
            scedualPaymentType={"weekly"}
            customValues={{
              id: props.scedualPayment.id,
              amount: props.scedualPayment.amount,
              paymentDate: props.scedualPayment.paymentDate,
              interval: props.scedualPayment.interval
            }}
          />
        )}
        {scedualPaymentType === "monthly" && (
          <ScedualPaymentForm
            onSubmit={onSubmit}
            onDelete={props.deleteScedualPaymentRequest}
            handlerStatus={props.handlerStatus}
            userData={userData}
            dataModal={props.dataModal}
            switchModal={props.switchModal}
            translate={props.translate}
            scedualPaymentType={"monthly"}
            customValues={{
              id: props.scedualPayment.id,
              amount: props.scedualPayment.amount,
              paymentDate: props.scedualPayment.paymentDate,
              interval: props.scedualPayment.interval
            }}
          />
        )}
      </div>
    </ModalWindow>
  );
};

export default ModalHOC(ScedualPaymentModal);
