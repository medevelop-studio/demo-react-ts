import React from "react";

import { Button } from "../../components";

import { userDictionary } from "../../common/dictionary";
import { IProfile } from "../../interfaces/IProfile";

interface ICreateUserBtnsProps {
  user: IProfile;
  translate(text: string): string;
  createUserModal(e: React.MouseEvent<HTMLElement>): void;
}

const CreateUserBtns: React.FC<ICreateUserBtnsProps> = props => {
  return (
    <div className="add-content__btns-top">
      {userDictionary.USER_ADMIN_PERMISSION_LEVEL <= props.user.permissionLevel && (
        <Button className="btn gold-btn" data-permissionlevel="4" onClick={props.createUserModal}>
          {props.translate("Add Master")}
        </Button>
      )}
      {userDictionary.USER_MASTER_PERMISSION_LEVEL <= props.user.permissionLevel && (
        <Button className="btn gold-btn" data-permissionlevel="2" onClick={props.createUserModal}>
          {props.translate("Add Agent")}
        </Button>
      )}
      {userDictionary.USER_AGENT_PERMISSION_LEVEL <= props.user.permissionLevel && (
        <Button className="btn gold-btn" data-permissionlevel="1" onClick={props.createUserModal}>
          {props.translate("Add User")}
        </Button>
      )}
    </div>
  );
};

export default CreateUserBtns;
