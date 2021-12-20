import React from "react";

import Input from "../../Input";
import Button from "../../Button";
import FormHOC from "../FormHOC";
import validator from "./validator";
import { IHandlerStatus } from "../../../interfaces/IProfile";

interface IChangePasswordForm {
  dataModal: string;
  handlerStatus: IHandlerStatus;
  values: {
    newPassword: string;
    confirmPassword: string;
  };
  errors: {
    newPassword: string;
    confirmPassword: string;
  };
  translate(key: string): string;
  switchModal(e: React.MouseEvent<HTMLElement>): void;
  onSubmit(params: any): void;
  handleChange(e: React.ChangeEvent<HTMLInputElement>): void;
}

const Form: React.FC<IChangePasswordForm> = props => {
  return (
    <form onSubmit={props.onSubmit}>
      <div className="modal-container__inputs">
        <Input
          className="input gold-input"
          placeholder={props.translate("New password")}
          type="text"
          name="newPassword"
          value={props.values.newPassword}
          error={props.errors.newPassword}
          onChange={props.handleChange}
        />
        <Input
          className="input gold-input"
          placeholder={props.translate("Confirm password")}
          type="text"
          name="confirmPassword"
          value={props.values.confirmPassword}
          error={props.errors.confirmPassword}
          onChange={props.handleChange}
        />
      </div>
      <div className="modal-container__btns">
        <Button className="btn gold-btn" type="submit" disabled={props.handlerStatus.status === "loading"}>
          {props.translate("Apply")}
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
    newPassword: "",
    confirmPassword: ""
  },
  validator
);
