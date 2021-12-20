import React from "react";
import moment from "moment";
import cn from "classnames";

import { stringTrim } from "../../helpers";
import { userDictionary } from "../../common/dictionary";

const manageUsers = (item, { additionalData, handlers, translate, _styles, searchedId, paddingLeft = 45 }) => {
  const array: any = [];

  let userColor;
  if (item.permissionLevel === userDictionary.USER_MASTER_PERMISSION_LEVEL) userColor = "user-color__master";
  if (item.permissionLevel === userDictionary.USER_AGENT_PERMISSION_LEVEL) userColor = "user-color__agent";
  if (item.permissionLevel === userDictionary.USER_PLAYER_PERMISSION_LEVEL) userColor = "user-color__user";

  if (item.parent.permissionLevel !== additionalData.permissionLevel) {
    if (item.parent.permissionLevel > item.permissionLevel) {
      paddingLeft += 15;
    }
  }
  const isChild = paddingLeft > 45;

  if (item._isShow) {
    array.push(
      <tr
        className={cn({
          "user-animation": isChild,
          "searched-user": item.id === searchedId
        })}
        key={item.id}
      >
        <td
          style={{
            ..._styles[0],
            paddingLeft: `${paddingLeft}px`
          }}
        >
          <div
            className={cn("manage-users__name-container", {
              "manage-users__name-container--banned": item.status === userDictionary.USER_STATUS_BANNED,
              "manage-users__name-container--allow-expanded": item.children.length
            })}
          >
            <span className="user-ban__btn" data-user={`${item.id}::${item.name}::${item.status}`} onClick={handlers.userBan}>
              {item.status === userDictionary.USER_STATUS_ACTIVE ? "x" : "✓"}
            </span>

            <div data-id={item.id} onClick={handlers.expandList}>
              {!!item.children.length && (
                <span
                  className={cn("manage-users__triangle", {
                    "manage-users__triangle--expanded": item._isShowChildren
                  })}
                />
              )}
              <span title={item.login} className={`manage-users__name string-trim ${userColor}`}>
                {stringTrim(item.login)}
              </span>
              <span className="loginHistory" onClick={(e) => handlers.loginHistory(e, item.id, item.login)}>
                <img className="loginHistoryIcon" src="/assets/images/loginHistoryIcon.png" alt=""/>
              </span>
            </div>
          </div>
        </td>

        {additionalData.permissionLevel > userDictionary.USER_MASTER_PERMISSION_LEVEL && (
          <td
            className="btn-link-styles"
            style={{ ..._styles[1] }}
            data-user={`${item.id}::${item.name}`}
            onClick={handlers.changePassword}
          >
            {translate("Change")}
          </td>
        )}

        {/* Agents column */}
        {additionalData.permissionLevel > userDictionary.USER_MASTER_PERMISSION_LEVEL && (
          <td style={{ ..._styles[2] }}>
            {item.permissionLevel > userDictionary.USER_AGENT_PERMISSION_LEVEL
              ? item.children.filter(item => item.permissionLevel === userDictionary.USER_AGENT_PERMISSION_LEVEL).length
              : "-"}
          </td>
        )}

        {/* Players column */}
        {additionalData.permissionLevel > userDictionary.USER_AGENT_PERMISSION_LEVEL && (
          <td style={{ ..._styles[3] }}>
            {item.permissionLevel > userDictionary.USER_PLAYER_PERMISSION_LEVEL
              ? item.children.filter(item => item.permissionLevel === userDictionary.USER_PLAYER_PERMISSION_LEVEL).length
              : "-"}
          </td>
        )}

        <td style={{ ..._styles[4] }} className={localStorage.locale === "he" || localStorage.locale === "ru" ? "manage-users__balance-big-padding": ""}>
          <div>
            <span>{item.balance + item.scedualPaymentBalance}</span>
            <div className="manage-users-btn btn-link-styles">
              <span data-user={`${item.id}::${item.name}::Add`} onClick={handlers.userBalance}>
                {translate("Add")}
              </span>
              <span> / </span>
              <span data-user={`${item.id}::${item.name}::Take`} onClick={handlers.userBalance}>
                {translate("Take")}
              </span>
            </div>
          </div>
        </td>
        {/* <td style={{ ..._styles[5] }}>
          { item.permissionLevel > userDictionary.USER_PLAYER_PERMISSION_LEVEL && (
            <span
              className="cashback-btn-container"
              data-user={`${item.id}::${item.name}::${item.cashbackPercent}`}
              onClick={handlers.cashback}
            >
              {item.cashbackPercent ? `${item.cashbackPercent}%` : <div className="btn-link-styles">{translate("Set")}</div>}
            </span>
          )}
        </td> */}
        <td style={{ ..._styles[6] }}>
          { 
          item.permissionLevel > userDictionary.USER_PLAYER_PERMISSION_LEVEL && (
            <span
              className="cashback-btn-container"
              data-user={`${item.id}::${item.name}::${item.profitPercent}`}
              onClick={handlers.profit}
            >
              {item.profitPercent ? `${item.profitPercent}%` : <div className="btn-link-styles">{translate("Set")}</div>}
            </span>
          )}
        </td>
        <td style={{ ..._styles[7] }}>
          {item.permissionLevel === userDictionary.USER_PLAYER_PERMISSION_LEVEL && (
            <span
              className="limit-btn-container"
              data-user={`${item.id}::${item.name}::${item.providerMaxLimit}`}
              onClick={handlers.limit}
            >
              {item.providerMaxLimit ?
                `${item.providerMaxLimit}` :
                <div className="btn-link-styles">{translate("Set")}</div>}
            </span>
          )}
        </td>
        <td style={{ ..._styles[8] }}>
          {item.parent.permissionLevel === userDictionary.USER_ADMIN_PERMISSION_LEVEL ? (
            <span
              className="btn-link-styles"
              data-user={`${item.id}::${item.name}`}
              onClick={handlers.scedualPayment}
            >
              {translate("Set")}
            </span>
          ) : (
            <span>---</span>
          )}
        </td>
        <td>
          <div className="date-note">
            <div>
              <span>{moment(item.createDate).format("MM/DD")}</span>
              <img src="/assets/images/note.png" alt="note" />
            </div>
          </div>
        </td>
        <td>
          <span className="btn-link-styles user-comment__btn" data-user={`${item.id}::${item.name}`} onClick={handlers.changeComment}>
            {translate("Add")}
          </span>
        </td>
      </tr>
    );
  }

  if (item.children.length) {
    item.children.map(item =>
      array.push(
        ...manageUsers(item, {
          additionalData,
          handlers,
          translate,
          _styles,
          searchedId,
          paddingLeft
        })
      )
    );
  }

  return array;
};

export default manageUsers;
