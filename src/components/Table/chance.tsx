import React from "react";
import moment from "moment";

import { IChance } from "../../interfaces/IChance";
import { getCardByValue } from "../../helpers";

const getResult = (item: IChance): string => {
  if (item.result) {
    return `${getCardByValue(item.result.first)} ${getCardByValue(item.result.second)} ${getCardByValue(item.result.third)} ${getCardByValue(item.result.fourth)}`;
  } else {
    return "Result was not found."
  }
}

export default (item: IChance, { _styles }) => {
  return (
    <tr key={item.id}>
      <td style={{ ..._styles[0] }}>
        {item.id}
      </td>

      <td style={{ ..._styles[1] }}>{item.currentTickets}</td>
      <td style={{ ..._styles[2] }}>{item.cashbackPercent}</td>
      <td style={{ ..._styles[3] }}>{getResult(item)}</td>
      <td style={{ ..._styles[4] }}>{moment(item.startDate).format("HH:mm:ss DD/MM")}</td>
      <td style={{ ..._styles[5] }}>{moment(item.createDate).format("HH:mm:ss DD/MM")}</td>
    </tr>
  );
};
