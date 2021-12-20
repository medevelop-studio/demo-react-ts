import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { loginHistoryRequest } from "../../store/manageUsers/actions";
import moment from "moment";
import { Paginate } from "../../components";
import config from "../../config";

const LoginHistory = ({ loginHistoryRequest, loginHistory, match, selectedUser }) => {
  const [page, setPage] = useState(1);
  useEffect(() => {
    const config = {
      getParams: {
        id: match.params.id,
        pageNumber: page,
      },
    };
    loginHistoryRequest(config);
  }, [loginHistoryRequest, match.params.id, page]);

  const handlePage = (pageNumber) => {
    setPage(pageNumber);
    const config = {
      getParams: {
        id: match.params.id,
        pageNumber,
      },
    };
    loginHistoryRequest(config);
  };

  if (!loginHistory) {
    return null;
  }

  return (
    <div className="loginHistoryWrapper">
      <div className="selectedUser">{selectedUser}</div>
      {loginHistory.slice((page - 1) * config.amountPerPage, page * config.amountPerPage).map((el) => (
        <div key={el.id} className="tableCell">
          <div className="tableItem">{moment(el.createDate).format("HH:mm:ss DD/MM/YYYY")}</div>
          <div className="tableItem">{el.userAgent}</div>
        </div>
      ))}
      <Paginate pageCount={loginHistory.length / config.amountPerPage} handlePage={handlePage} />
    </div>
  );
};

const mapStartToProps = (state) => ({
  loginHistory: state.manageUsers.loginHistory,
  selectedUser: state.manageUsers.selectedUser,
});

const mapDispatchToProps = {
  loginHistoryRequest,
};

export default withRouter(connect(mapStartToProps, mapDispatchToProps)(LoginHistory));
