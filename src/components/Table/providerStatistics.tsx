import React from "react";
import cn from "classnames";
import { userDictionary } from "../../common/dictionary";
import { stringTrim } from "../../helpers";
import { CustomMath } from "../../math";

const providerStatistics = (item,
    { additionalData, handlers, _styles, translate, searchedId, paddingLeft = 45, externalDataObj, isLastElem }
  ) => {
  const array: any = [];

  let userColor;
  if (item.permissionLevel === userDictionary.USER_MASTER_PERMISSION_LEVEL) userColor = "user-color__master";
  if (item.permissionLevel === userDictionary.USER_AGENT_PERMISSION_LEVEL) userColor = "user-color__agent";
  if (item.permissionLevel === userDictionary.USER_PLAYER_PERMISSION_LEVEL) userColor = "user-color__user";

  if (item.parent?.permissionLevel > item.permissionLevel && item.parent?.permissionLevel !== additionalData.permissionLevel) {
    paddingLeft += 15;
  }

  // const isChild = paddingLeft > 45;
  let positionStyle = {};

  localStorage.locale === "he" ? positionStyle = { paddingLeft: `${paddingLeft}px`, right: 0 } : positionStyle = { paddingLeft: `${paddingLeft}px`, left: 0 }

  if (item._isShow) {
    array.push(
      <tr
        className={cn({
          // "user-animation": isChild
          "searched-user": item.id === searchedId
        })}
        key={item.id}
      >

        <td
          className="td-sticky"
          style={{
            ..._styles[0],
            ...positionStyle,
            textAlign: "left",
            backgroundColor: item.id === searchedId ? "inherit" : "black",
          }}
        >
          <div
            className={cn("manage-users__name-container", {
              "manage-users__name-container--allow-expanded": item.children.length
            })}
          >

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
            </div>
          </div>
        </td>

        <td style={{ ..._styles[1] }}>
          {item.id}
        </td>

        <td style={{ ..._styles[2] }}>
          {item.name}
        </td>

        <td style={{ ..._styles[3] }}>
          {(item.permissionLevel === userDictionary.USER_AGENT_PERMISSION_LEVEL
            || item.permissionLevel === userDictionary.USER_MASTER_PERMISSION_LEVEL)
            ? item.profitPercent
            : "-"}
        </td>

        <td style={{ ..._styles[4] }}>
          {item.permissionLevel === userDictionary.USER_PLAYER_PERMISSION_LEVEL
            ? item.betCount
            : "-"}
        </td>

        <td style={{ ..._styles[5] }}>
          {item.permissionLevel === userDictionary.USER_PLAYER_PERMISSION_LEVEL
            ? item.canceledBet
            : "-"}
        </td>

        <td style={{ ..._styles[6] }}>
          {item.permissionLevel === userDictionary.USER_PLAYER_PERMISSION_LEVEL
            ? item.debitAmount
            : "-"}
        </td>

        <td style={{ ..._styles[7] }}>
          {item.permissionLevel === userDictionary.USER_PLAYER_PERMISSION_LEVEL
            ? item.winAmount
            : "-"}
        </td>

        <td style={{
          ..._styles[8],
          direction: "ltr",
          color: item.permissionLevel === userDictionary.USER_PLAYER_PERMISSION_LEVEL
            ? Number(-item.profitAmount) >= 0
              ? "green"
              : "#CC0000"
            : Number(-item.summaryProfitAmount) >= 0
              ? "green"
              : "#CC0000"
        }}>
          {item.permissionLevel === userDictionary.USER_PLAYER_PERMISSION_LEVEL
            ? -CustomMath.round10(item.profitAmount, -2)
            : -CustomMath.round10(item.summaryProfitAmount, -2)
          }
        </td>

        <td style={{
          ..._styles[9],
          direction: "ltr",
          color: Number(-item.profitAmount) >= 0 ? "green" : "#CC0000"
        }}>
          {item.permissionLevel === userDictionary.USER_PLAYER_PERMISSION_LEVEL
            ? -CustomMath.round10(item.agentProfitAmount, -2)
            : item.permissionLevel === userDictionary.USER_AGENT_PERMISSION_LEVEL
              ? -CustomMath.round10(item.profitAmount, -2)
              : "-"
          }
        </td>

        <td style={{
          ..._styles[10],
          direction: "ltr",
          color: Number(-item.profitAmount) >= 0 ? "green" : "#CC0000"
        }}>
          {item.permissionLevel === userDictionary.USER_PLAYER_PERMISSION_LEVEL
            ? -CustomMath.round10(item.masterProfitAmount, -2)
            : item.permissionLevel === userDictionary.USER_MASTER_PERMISSION_LEVEL
              ? -CustomMath.round10(item.profitAmount, -2)
              : "-"
          }
        </td>

        <td style={{
          ..._styles[11],
          direction: "ltr",
          color: Number(-item.systemCommission) >= 0 ? "green" : "#CC0000"
        }}>
          {-CustomMath.round10(item.systemCommission, -2)}
        </td>
        <td style={{ ..._styles[7] }}>
          {item.permissionLevel === userDictionary.USER_PLAYER_PERMISSION_LEVEL
            ? item.discount
            : "-"}
        </td>
      </tr>
    )
  }

  const totalStatItem = <tr
    className={cn({
      "provider-statistics__total-table": true,
    })}
    style={{border: "1px solid #e6bc73"}}
  >

    <td
      className="td-sticky"
      style={{
        ..._styles[0],
        ...positionStyle,
        textAlign: "left",
        backgroundColor: item.id === searchedId ? "inherit" : "black",
        color: "#e6bc73",
        border: "1px solid #e6bc73",
        height: "34px",
        bottom: "4px"
      }}
    >Total</td>

    <td style={{ ..._styles[1] }}>
      {}
    </td>

    <td style={{ ..._styles[2] }}>
    {}
    </td>

    <td style={{ ..._styles[3] }}>
      {}
    </td>

    <td style={{ ..._styles[4] }}>
      {isNaN(externalDataObj.totalBetCount) ? 0 : CustomMath.round10(externalDataObj.totalBetCount, -2)}
    </td>

    <td style={{ ..._styles[5] }}>
      {isNaN(externalDataObj.totalCanceledBet) ? 0 : CustomMath.round10(externalDataObj.totalCanceledBet, -2)}
    </td>

    <td style={{ ..._styles[6] }}>
      {isNaN(externalDataObj.totalDebitAmount) ? 0 : CustomMath.round10(externalDataObj.totalDebitAmount, -2)}
    </td>

    <td style={{ ..._styles[7] }}>
      {isNaN(externalDataObj.totalWinAmount) ? 0 : CustomMath.round10(externalDataObj.totalWinAmount, -2)}
    </td>

    <td style={{
      ..._styles[8],
      direction: "ltr",
      color: Number(-externalDataObj.totalProfitAmount) >= 0 ? "green" : "#CC0000"
    }}>
      {isNaN(externalDataObj.totalProfitAmount) ? 0 : -CustomMath.round10(externalDataObj.totalProfitAmount, -2)}
    </td>

    <td style={{
      ..._styles[9],
      direction: "ltr",
      color: Number(-externalDataObj.totalAgentProfitAmount) >= 0 ? "green" : "#CC0000"
    }}>
      {isNaN(externalDataObj.totalAgentProfitAmount) ? 0 : -CustomMath.round10(externalDataObj.totalAgentProfitAmount, -2)}
    </td>

    <td style={{
      ..._styles[10],
      direction: "ltr",
      color: Number(-externalDataObj.totalMasterProfitAmount) >= 0 ? "green" : "#CC0000"
    }}>
      {isNaN(externalDataObj.totalMasterProfitAmount) ? 0 : -CustomMath.round10(externalDataObj.totalMasterProfitAmount, -2)}
    </td>

    <td style={{
      ..._styles[11],
      direction: "ltr",
      color: Number(-externalDataObj.totalSystemCommission) >= 0 ? "green" : "#CC0000"
    }}>
      {isNaN(externalDataObj.totalSystemCommission) ? 0 : -CustomMath.round10(externalDataObj.totalSystemCommission, -2)}
    </td>

    <td style={{
      ..._styles[11],
      direction: "ltr",
    }} />
  </tr>

if (externalDataObj && isLastElem) {
  if (item?.children.length) {
    item.children.map((item, index, arr) => {
      isLastElem = index === arr.length - 1;

      return array.push(
        ...providerStatistics(item, {
          additionalData,
          handlers,
          _styles,
          translate,
          searchedId,
          paddingLeft,
          externalDataObj,
          isLastElem,
        })
      )
    });
  } else {
    array.push(totalStatItem);
  }
} else {
  if (item?.children.length) {
    item.children.map(item =>
      array.push(
        ...providerStatistics(item, {
          additionalData,
          handlers,
          _styles,
          translate,
          searchedId,
          paddingLeft,
          externalDataObj,
          isLastElem,
        })
      )
    );
  }
}

return array;
};

export default providerStatistics;
