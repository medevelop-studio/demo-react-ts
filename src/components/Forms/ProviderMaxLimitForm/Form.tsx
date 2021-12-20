import React from "react";

import Input from "../../Input";
import Button from "../../Button";
import FormHOC from "../FormHOC";
import validator from "./validator";
import { IUserData, IHandlerStatus } from "../../../interfaces/IProfile";

interface IProviderMaxLimitForm {
  userData: IUserData;
  dataModal: string;
  handlerStatus: IHandlerStatus;
  values: { amount: number };
  errors: { amount: number };
  translate(key: string): string;
  switchModal(e: React.MouseEvent<HTMLElement>): void;
  onSubmit(params: any): void;
  handleChange(e: React.ChangeEvent<HTMLInputElement>): void;
}

const Form: React.FC<IProviderMaxLimitForm> = props => {
  return (
    <form onSubmit={props.onSubmit}>
      <div className="modal-container__inputs">
        <Input
          className="input gold-input"
          placeholder={String(props.userData.providerMaxLimit) === "null" ? "" : props.userData.providerMaxLimit}
          type="text"
          name="amount"
          data-pattern="onlyNumbers"
          value={props.values.amount}
          error={props.errors.amount}
          onChange={props.handleChange}
        />
      </div>
      <div className="modal-container__btns">
        <Button className="btn gold-btn" type="submit" disabled={props.handlerStatus.status === "loading"}>
          {props.translate("Add")}
        </Button>
        <Button className="btn grey-btn" type="button" data-modal={props.dataModal} onClick={props.switchModal}>
          {props.translate("Cancel")}
        </Button>
      </div>
    </form>
  );
};

export default FormHOC(
  Form,
  {
    amount: ""
  },
  validator
);
