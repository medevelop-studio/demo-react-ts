import React from "react";
import moment from "moment";

import { balanceDescription } from "../../helpers";

export default (item, { _styles, translate }) => {
  return (
    <tr key={item.id}>
      <td style={{ ..._styles[0] }}>{item.amount}</td>
      <td style={{ ..._styles[1] }}>{balanceDescription(item, translate)[0]}</td>
      <td style={{ ..._styles[2] }}>{balanceDescription(item, translate).length > 1 ? balanceDescription(item, translate)[1] : ""}</td>
      <td style={{ ..._styles[3] }}>{item.targetCurrentBalance / 100}</td>
      <td style={{ ..._styles[4] }}>{moment(item.createDate).format("h:mm:ss a DD/MM/YY")}</td>
    </tr>
  );
};
