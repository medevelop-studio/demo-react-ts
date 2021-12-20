import React from "react";
import moment from "moment";

import { balanceDescription } from "../../helpers";

export default (item, { _styles, translate }) => {
  return (
    <tr key={item.id}>
      <td style={{ ..._styles[0] }}>
        {item.id}
      </td>

      <td style={{ ..._styles[1] }}>{balanceDescription(item, translate)[0]}</td>
      <td style={{ ..._styles[2] }}>{balanceDescription(item, translate).length > 1 ? balanceDescription(item, translate)[1] : ""}</td>
      <td style={{ ..._styles[3] }}>{item.creator ? item.creator.login : "---"}</td>
      <td style={{ ..._styles[4] }}>{item.target ? item.target.login : "---"}</td>
      <td style={{ ..._styles[5] }}>{item.playerCashback ? item.playerCashback.login : "---"}</td>
      <td style={{ ..._styles[6] }}>{item.amount}</td>
      <td style={{ ..._styles[7] }}>{item.creatorCurrentBalance}</td>
      <td style={{ ..._styles[8] }}>{item.targetCurrentBalance}</td>
      <td style={{ ..._styles[9] }}>{moment(item.createDate).format("HH:mm:ss DD/MM")}</td>
    </tr>
  );
};
