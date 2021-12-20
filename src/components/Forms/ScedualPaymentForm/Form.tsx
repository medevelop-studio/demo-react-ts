import React, { ReactText } from "react";

import Input from "../../Input";
import Button from "../../Button";
import FormHOC from "../FormHOC";
import validator from "./validator";
import { IUserData, IHandlerStatus } from "../../../interfaces/IProfile";
import DTPicker from "../../DTPicker";
import moment from "moment";

interface IScedualPaymentForm {
  userData: IUserData;
  dataModal: string;
  handlerStatus: IHandlerStatus;
  customValues: {
    id: number
    amount: number;
    paymentDate: string;
    interval: number;
  };
  scedualPaymentType: string;
  values: { amount: number, paymentDate: string };
  errors: { amount: number, paymentDate: string };
  translate(key: string): string;
  switchModal(e: React.MouseEvent<HTMLElement>): void;
  onSubmit(params: any): void;
  onDelete(params: any): void;
  handleChange(e: React.ChangeEvent<HTMLInputElement>): void;
  selectDate(date: number, type: ReactText): void;
}

const Form: React.FC<IScedualPaymentForm> = props => {
  const selectDate = ({ date }, type: ReactText): void => {
    props.selectDate(date, type);
  };

  return (
    <>
      { props.customValues && props.customValues.amount && props.customValues.paymentDate ? (
        <div>
          <div className="scedual-payment__text-field">
            <span>{props.translate("This user is already getting scedual payment")}</span>
            <span>{props.translate("Type")}: {Number(props.customValues.interval) === 604800000 ? props.translate("Weekly") : (
              Number(props.customValues.interval) === 2628000000
                ? props.translate("Monthly")
                : null
            )}</span>
            <span>{props.translate("Amount")}: {props.customValues.amount}</span>
            <span>{props.translate("Payment date")}: {moment(props.customValues.paymentDate).format("HH:mm DD/MM/YY")}</span>
          </div>
          <div className="modal-container__btns">
            <Button
              className="btn gold-btn"
              type="button"
              onClick={() => props.onDelete({ id: props.customValues.id })}
              disabled={props.handlerStatus.status === "loading"}
            >
              {props.translate("Delete")}
            </Button>
            <Button className="btn grey-btn" type="button" data-modal={props.dataModal} onClick={props.switchModal}>
              {props.translate("Cancel")}
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={props.onSubmit}>
          <div className="modal-container__inputs">
            <Input
              className="input gold-input"
              placeholder={props.translate("Amount")}
              type="text"
              name="amount"
              data-pattern="onlyNumbers"
              value={props.values.amount || ""}
              error={props.errors.amount}
              onChange={props.handleChange}
            />
          </div>
          <div className="DTPicker-container">
            <DTPicker
              placeholderText={props.translate("Payment date")}
              type="paymentDate"
              value={props.values.paymentDate}
              error={props.errors.paymentDate}
              onChange={selectDate}
              showTimeSelect={true}
            />
          </div>
          <div className="modal-container__btns">
            <Button className="btn gold-btn" type="submit" disabled={props.handlerStatus.status === "loading"}>
              {props.translate("Set")}
            </Button>
            <Button className="btn grey-btn" type="button" data-modal={props.dataModal} onClick={props.switchModal}>
              {props.translate("Cancel")}
            </Button>
          </div>
        </form>
      )}
    </>
  );
};

export default FormHOC(
  Form,
  {
    amount: "",
    paymentDate: "",
  },
  validator
);
