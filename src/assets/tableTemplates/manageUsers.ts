import { userDictionary } from "../../common/dictionary";

export default {
  _styles: [
    {
      width: "15%",
      padding: "0 8px 0 45px",
      textAlign: "left"
    },
    { width: "10%" },
    { width: "10%" },
    { width: "10%" },
    {
      width: "15%",
      padding: "0 85px 0 8px",
    },
    // { width: "10%" },
    { width: "5%" },
    { width: "5%" },
    { width: "10%" },
    {
      width: "10%",
      padding: "0 35px 0 8px"
    },  
    {
      width: "5%",
    }
  ],
  _template: "manage-users",
  head: [
    { title: "Username" },
    {
      title: "Password",
      permissionLevel: userDictionary.USER_MASTER_PERMISSION_LEVEL // Only the aministrator can see this column
    },
    {
      title: "Agents",
      permissionLevel: userDictionary.USER_MASTER_PERMISSION_LEVEL // Only the aministrator can see this column
    },
    {
      title: "Players",
      permissionLevel: userDictionary.USER_AGENT_PERMISSION_LEVEL // Aministrator and master can see this column
    },
    { title: "Balance" },
    // { title: "Cashback" },
    { title: "ProfitPercent" },
    { title: "Max Limit" },
    { title: "Rotatable Payment" },
    { title: "Date" },
    { title: "Comment" }
  ],
  body: []
};
