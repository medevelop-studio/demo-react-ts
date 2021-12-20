import React from "react";

import manageUsers from "./manageUsers";
import balance from "./balance";
import statistics from "./statistics";
import providerStatistics from "./providerStatistics";
import chance from "./chance";

export const theadTemplate = ({ head, _styles, additionalData, translate }) => {
  return (
    <tr>
      {head.map((item, i) => {
        /* <Head setting start> */
        // if the column has a permission level and a column permission level above or equal my permission level
        if (item.permissionLevel && additionalData.permissionLevel <= item.permissionLevel) {
          return null;
        }
        if (item.disableMatchEditBtn && additionalData.disableMatchEditBtn) {
          return null;
        }
        /* </ Head setting end> */
        let positionStyle = {};

        if (item.title === "Login") {
          localStorage.locale === "he"
            ? positionStyle = { paddingLeft: `30px`, right: 0 }
            : positionStyle = { paddingLeft: `30px`, left: 0 }
        }

        return (
          <th 
            className={item.title === "Login" ? "td-sticky" : ""}
            style={{
            ..._styles[i],
            ...positionStyle,
            textAlign: "center"
          }} key={i}>
            {translate(item.title) || item.title}
            {/* {item.title} */}
          </th>
        );
      })}
    </tr>
  );
};

export const tbodyTemplate = ({ body, _template, additionalData, handlers, translate, _styles, searchedId, externalDataObj }) => {
  return body.map((item, index, arr) => {
    const isLastElem = index === arr.length - 1;

    const dataTemplate = {
      additionalData,
      handlers,
      translate,
      _styles,
      searchedId,
      externalDataObj,
      isLastElem,
    };

    switch (_template) {
      case "balance":                 return balance(item, dataTemplate);
      case "chance":                 return chance(item, dataTemplate);
      case "manage-users":            return manageUsers(item, dataTemplate);
      case "statistics":              return statistics(item, dataTemplate);
      case "provider-statistics":    return providerStatistics(item, dataTemplate);
      default:
        return null;
    }
  });
};
