import { userDictionary } from "../common/dictionary";

export default [
  {
    title: "Transactions",
    link: "/statistics",
    permissionLevel: userDictionary.USER_AGENT_PERMISSION_LEVEL,
    exclude: [] as any,
  },
  {
    title: "Reports",
    link: "/evolution-statistics",
    permissionLevel: userDictionary.USER_AGENT_PERMISSION_LEVEL,
    exclude: [] as any,
  },
  {
    title: "Speed chance examples",
    link: "/1w-speed-chance",
    permissionLevel: userDictionary.USER_PLAYER_PERMISSION_LEVEL,
    exclude: []
  },
  {
    title: "Chance",
    link: "/chance",
    permissionLevel: userDictionary.USER_PLAYER_PERMISSION_LEVEL,
    exclude: []
  },
  {
    title: "Manage Users",
    link: "/manage-users",
    permissionLevel: userDictionary.USER_AGENT_PERMISSION_LEVEL,
    exclude: [] as any,
  },
  {
    title: "Rules",
    link: "/rules",
    permissionLevel: userDictionary.USER_ADMIN_PERMISSION_LEVEL,
    exclude: []
  },
  {
    title: "RuleList",
    link: "/rule-list",
    permissionLevel: userDictionary.USER_PLAYER_PERMISSION_LEVEL,
    exclude: []
  },
  {
    title: "Ticker",
    link: "/ticker",
    permissionLevel: userDictionary.USER_ADMIN_PERMISSION_LEVEL,
    exclude: [] as any,
  },
  {
    title: "Balance",
    link: "/balance",
    permissionLevel: userDictionary.USER_PLAYER_PERMISSION_LEVEL,
    exclude: [
      userDictionary.USER_ADMIN_PERMISSION_LEVEL
    ] as any,
  },
  {
    title: "Personal Info",
    link: "/personal-info",
    permissionLevel: userDictionary.USER_PLAYER_PERMISSION_LEVEL,
    exclude: [
      userDictionary.USER_ADMIN_PERMISSION_LEVEL
    ] as any,
  }
];
