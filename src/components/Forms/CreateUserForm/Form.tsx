import React from "react";

import Input from "../../Input";
import Button from "../../Button";
import FormHOC from "../FormHOC";
import validator from "./validator";
import InputFilter from "../../InputFilter";
import { userDictionary } from "../../../common/dictionary";
import { IProfileWithChildren } from "../../../interfaces/IManageUsers";

interface ICreateUserForm {
  allUsers: IProfileWithChildren[],
  user: IProfileWithChildren,
  permissionLevel: number;
  dataModal: string,
  values: {
    login: string,
    password: string,
    name: string,
    parentId: number,
    profitPercent?: number,
    discount?: number,
  }
  errors: {
    login: any,
    password: any,
    name: any,
    parentId: any,
    profitPercent?: any,
    discount?: number,
  },
  handlerStatus: {
    status: string
  }
  onSubmit: (e: React.FormEvent<HTMLFormElement>)=> void,
  handleChange: () => void,
  selectInputFilter: () => void,
  translate: (key: string) => string,
  switchModal: ()=> void
}

const Form: React.FC<ICreateUserForm> = props => {
  let sortedUsers: IProfileWithChildren[] = [];

  if (Array.isArray(props.allUsers)) {
    sortedUsers = props.allUsers.filter(user => {
      return user.permissionLevel > props.permissionLevel;
    });
  
    if (props.user.permissionLevel === userDictionary.USER_ADMIN_PERMISSION_LEVEL) {
      sortedUsers.push(props.user);
    }

    if (props.user.permissionLevel === userDictionary.USER_AGENT_PERMISSION_LEVEL) {
      sortedUsers = [];
      sortedUsers.push(props.user);
    }
  }

  return (
    <form onSubmit={props.onSubmit}>
      <div className="modal-container__inputs">
        <Input
          className="input gold-input"
          placeholder={props.translate("Login")}
          type="login"
          name="login"
          value={props.values.login}
          error={props.errors.login}
          onChange={props.handleChange}
        />
        <Input
          className="input gold-input"
          placeholder={props.translate("Password")}
          type="text"
          name="password"
          error={props.errors.password}
          value={props.values.password}
          onChange={props.handleChange}
        />
        <Input
          className="input gold-input"
          placeholder={props.translate("Name")}
          type="text"
          name="name"
          value={props.values.name}
          error={props.errors.name}
          onChange={props.handleChange}
        />
        <InputFilter
          inputProps={{
            className: "input gold-input",
            placeholder: props.translate("parentId"),
            type: "text",
            name: "parentId",
            value: props.values.parentId,
            error: props.errors.parentId,
            onChange: props.handleChange,
            autoComplete: "off"
          }}
          selectById={true}
          selectInputFilter={props.selectInputFilter}
          listData={sortedUsers}
        />
        {props.permissionLevel === userDictionary.USER_PLAYER_PERMISSION_LEVEL && (
          <Input
            className="input gold-input"
            placeholder={props.translate("Discount")}
            type="text"
            name="discount"
            data-pattern="onlyNumbers, rangeNumbers"
            value={props.values.discount}
            error={props.errors.discount || ''}
            onChange={props.handleChange}
          />
        )}
        {
        (props.permissionLevel === userDictionary.USER_AGENT_PERMISSION_LEVEL ||
        props.permissionLevel === userDictionary.USER_MASTER_PERMISSION_LEVEL) ?
          <Input
            className="input gold-input"
            placeholder={props.translate("Profit Percent")}
            type="text"
            name="profitPercent"
            data-pattern="onlyNumbers, rangeNumbers"
            value={props.values.profitPercent}
            error={props.errors.profitPercent}
            onChange={props.handleChange}
          /> : 
          null
          }
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
    name: "",
    login: "",
    password: "",
    parentId: "",
    profitPercent: "",
    discount: ""
  },
  validator,
);
