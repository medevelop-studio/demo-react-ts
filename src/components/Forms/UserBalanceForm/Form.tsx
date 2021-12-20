import React from "react";

import Input from "../../Input";
import Button from "../../Button";
import FormHOC from "../FormHOC";
import validator from "./validator";

interface IUserBalanceForm {
  dataModal: string;
  values: {
    amount: number;
  };
  errors: {
    amount: any;
  };
  handlerStatus: {
    status: string;
    message: string;
  };
  userData: {
    name: string;
    target: number;
    type: string;
  }
  onSubmit: () => void;
  handleChange: () => void;
  translate: (key: string) => string;
  switchModal: ()=> void
}

const Form: React.FC<IUserBalanceForm> = props => {
  return (
    <form onSubmit={props.onSubmit}>
      <div className="modal-container__inputs">
        <Input
          className="input gold-input"
          placeholder={props.translate("Balance")}
          type="text"
          name="amount"
          data-pattern="trimLeadingZero, onlyNumbers"
          value={props.values.amount}
          error={props.errors.amount}
          onChange={props.handleChange}
        />
      </div>
      <div className="modal-container__btns">
        <Button className="btn gold-btn" type="submit" disabled={props.handlerStatus.status === "loading"}>
          {props.translate(props.userData.type)}
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
