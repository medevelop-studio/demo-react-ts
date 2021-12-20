import React from "react";

import Input from "../../Input";
import Button from "../../Button";
import FormHOC from "../FormHOC";
import validator from "./validator";
import { IHandlerStatus } from "../../../interfaces/IProfile";

interface IChangeCommentForm {
  dataModal: string;
  handlerStatus: IHandlerStatus;
  customValues: { text: string };
  errors: { text: string };
  translate(key: string): string;
  switchModal(e: React.MouseEvent<HTMLElement>): void;
  onSubmit(params: any): void;
  handleChange(e: React.ChangeEvent<HTMLInputElement>): void;
}

const Form: React.FC<IChangeCommentForm> = props => {
  return (
    <form onSubmit={props.onSubmit}>
      <div className="modal-container__inputs">
        <Input
          className="input gold-input"
          placeholder={props.translate("New Comment")}
          type="text"
          name="text"
          defaultValue={props.customValues.text}
          error={props.errors.text}
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
    text: ""
  },
  validator
);
