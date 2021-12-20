import React from "react";

import ModalWindow from "../ModalWindow";
import CreateUserForm from "../Forms/CreateUserForm/Form";
import ModalHOC from "./ModalHOC";

import { userDictionary } from "../../common/dictionary";

const CreateUserModal: React.FC<any> = props => {
  const onSubmit = values => {
    const data = {
      ...values,
      permissionLevel: props.permissionLevel,
    };

    if (props.isJoin) {
      props.createUserJoinRequest(data);
    } else {
      props.createUserRequest(data);
    }
  };

  return (
    <ModalWindow dataModal={props.dataModal} closeModal={props.switchModal}>
      <div className="modal-container__inner">
        <div className="modal-container__header">
          <div>{props.translate("Add New")}</div>
          {props.permissionLevel === userDictionary.USER_MASTER_PERMISSION_LEVEL && <span className="user-color__master">Master</span>}
          {props.permissionLevel === userDictionary.USER_AGENT_PERMISSION_LEVEL && <span className="user-color__agent">Agent</span>}
          {props.permissionLevel === userDictionary.USER_PLAYER_PERMISSION_LEVEL && <span className="user-color__user">User</span>}
        </div>

        <CreateUserForm
          onSubmit={onSubmit}
          user={props.user}
          permissionLevel={props.permissionLevel}
          handlerStatus={props.handlerStatus}
          dataModal={props.dataModal}
          switchModal={props.switchModal}
          translate={props.translate}
          isJoin={props.isJoin}
          userTree={props.userTree}
          allUsers={props.allUsers}
          usersLoaded={props.usersLoaded}
          customValues={
            props.permissionLevel === userDictionary.USER_PLAYER_PERMISSION_LEVEL && {
              parentId: props.user.id,
            }
          }
        />
      </div>
    </ModalWindow>
  );
};

export default ModalHOC(CreateUserModal);
