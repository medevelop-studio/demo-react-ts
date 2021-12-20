import React from "react";
import { connect } from "react-redux";
import { withTranslate } from "react-redux-multilingual";
import { stringTrim } from "../../helpers";

const PersonalInfo = ({ translate, user }) => {

  return (
    <div className="personal-info-page page-container">
      <div className="personal-info__header">
        <div title={user.name} className="left-side">
          {translate("Name")}: {stringTrim(user.name)}
          <div>ID: {user.id}</div>
        </div>
      </div>
      <div className="personal-info__content">
        <div className="personal-info__line">
          <span>{translate("Name")}</span>
          <span title={user.name}>{stringTrim(user.name)}</span>
        </div>
      </div>

      <div className="card-line card-line__footer" />
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, null)(withTranslate(PersonalInfo));
