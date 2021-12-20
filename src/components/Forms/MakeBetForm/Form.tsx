import React from "react";

import Input from "../../Input";
import Button from "../../Button";
import FormHOC from "../FormHOC";
import validator from "./validator";

const Form: React.FC<any> = props => {
  return (
    <form onSubmit={props.onSubmit} className={props.className}>
      <Input
        className="input gold-input"
        placeholder="0"
        type="text"
        name="betAmount"
        data-pattern="onlyNumbers"
        value={props.values.amount}
        error={props.errors.amount}
        onChange={props.handleChange}
      />
      <Button className="btn gold-btn" type="submit" disabled={props.handlerStatus.status === "loading"}>
        {props.translate("Make bet")}
      </Button>
    </form>
  );
};

export default FormHOC(
  Form,
  {
    betAmount: ""
  },
  validator
);
