import React from "react";

import Button from "../../Button";
import FormHOC from "../FormHOC";
import validator from "./validator";

interface IUserBanForm {
  dataModal: string;
  handlerStatus: {
    status: string;
    message: string;
  };
  switchModal: () => void;
  onSubmit: () => void;
  translate: (key: string) => string;
}

const Form: React.FC<IUserBanForm> = props => {
  return (
    <form onSubmit={props.onSubmit}>
      <div className="modal-container__btns">
        <Button className="btn gold-btn" type="submit" disabled={props.handlerStatus.status === "loading"}>
          {props.translate("Confirm")}
        </Button>
        <Button className="btn grey-btn" type="button" data-modal={props.dataModal} onClick={props.switchModal}>
          {props.translate("Cancel")}
        </Button>
      </div>
    </form>
  );
};

export default FormHOC(Form, {}, validator);
