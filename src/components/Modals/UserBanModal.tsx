import React from "react";

import ModalWindow from "../ModalWindow";
import UserBanForm from "../Forms/UserBanForm/Form";
import ModalHOC from "./ModalHOC";
import { stringTrim } from "../../helpers";

import { userDictionary } from "../../common/dictionary";

const UserBanModal: React.FC<any> = props => {
  const { userData } = props;

  const onSubmit = () => {
    props.userBanRequest({
      userId: userData.userId,
      userStatus: userData.userStatus
    });
  };

  return (
    <ModalWindow dataModal={props.dataModal} closeModal={props.switchModal}>
      <div className="modal-container__inner">
        <div className="modal-container__header">
          <div>
            {+userData.userStatus === userDictionary.USER_STATUS_BANNED ? props.translate("User Ban") : props.translate("User Unban")}?
          </div>
          <div style={{ color: "#e6bc73" }}>{stringTrim(userData.name)}</div>
        </div>

        <UserBanForm
          onSubmit={onSubmit}
          handlerStatus={props.handlerStatus}
          dataModal={props.dataModal}
          switchModal={props.switchModal}
          translate={props.translate}
        />
      </div>
    </ModalWindow>
  );
};

export default ModalHOC(UserBanModal);
