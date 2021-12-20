import React from "react";

import Input from "../../Input";
import Button from "../../Button";
import FormHOC from "../FormHOC";
import validator from "./validator";

interface ILoginForm {
  values: {
    username: string;
    password: string;
  };
  errors: {
    username: any;
    password: any;
  };
  handlerStatus: {
    status: string
    message: string
  };
  onSubmit: () => void;
  handleChange: () => void;
  translate: (key: string) => string;
}

const Form: React.FC<ILoginForm> = props => {
  return (
    <form onSubmit={props.onSubmit}>
      <div className="modal-container__inputs">
        <Input
          className="input gold-input"
          placeholder={props.translate("Username")}
          type="text"
          name="username"
          value={props.values.username}
          error={props.errors.username}
          onChange={props.handleChange}
        />
        <Input
          className="input gold-input"
          placeholder={props.translate("Password")}
          type="password"
          name="password"
          value={props.values.password}
          error={props.errors.password}
          onChange={props.handleChange}
        />
      </div>
      <div className="modal-container__btns">
        <Button className="btn gold-btn" type="submit" disabled={props.handlerStatus.status === "loading"}>
          {props.translate("Log in")}
        </Button>
      </div>
    </form>
  );
};

export default FormHOC(
  Form,
  {
    username: "",
    password: ""
  },
  validator
);
