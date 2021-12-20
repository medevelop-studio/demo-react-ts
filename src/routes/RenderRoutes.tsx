import React from "react";
import { Switch } from "react-router-dom";

import {
  HomePage,
  Balance,
  ManageUsers,
  PersonalInfo,
  Statistics,
  // EvoGames,
  EvolutionStatistics,
  // TvBet,
  LiveCasino,
  Slots,
  NuxSlots,
  TvBet,
  Ticker,
  Rules,
  RuleList,
  ResultConfig,
  SpeedChance,
  Chance
} from "../pages";
import { Sidebar } from "../components";

import LoginHistory from "../pages/LoginHistory";

import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";

import { userDictionary } from "../common/dictionary";

const RenderRoutes: React.FC<any> = () => {
  const adminPermissionLevel = userDictionary.USER_ADMIN_PERMISSION_LEVEL;
  // const masterPermissionLevel = userDictionary.USER_MASTER_PERMISSION_LEVEL;
  const agentPermissionLevel = userDictionary.USER_AGENT_PERMISSION_LEVEL;
  const userPermissionLevel = userDictionary.USER_PLAYER_PERMISSION_LEVEL;

  return (
    <Switch>
      {/* Public routes */}
      <PublicRoute exact={true} path="/">
        <HomePage />
      </PublicRoute>

      {/* Private routes */}
      <PrivateRoute exact={true} path="/live-casino" permissionLevel={userPermissionLevel} allowOnly={userPermissionLevel}>
        <Sidebar />
        <LiveCasino />
      </PrivateRoute>

      {/* <PrivateRoute exact={true} path="/evo-games" permissionLevel={userPermissionLevel}>
        <EvoGames />
        <Sidebar />
      </PrivateRoute> */}

      <PrivateRoute exact={true} path="/tvbet" permissionLevel={userPermissionLevel} allowOnly={userPermissionLevel}>
        <Sidebar />
        <TvBet />
      </PrivateRoute>

      <PrivateRoute exact={true} path="/slots" permissionLevel={userPermissionLevel} allowOnly={userPermissionLevel}>
        <Sidebar />
        <Slots />
      </PrivateRoute>

      {/* <PrivateRoute exact={true} path="/sportboost-slots" permissionLevel={userPermissionLevel}>
        <SportBoostSlots />
        <Sidebar />
      </PrivateRoute> */}

      <PrivateRoute exact={true} path="/evolution-gaming" permissionLevel={userPermissionLevel} allowOnly={userPermissionLevel}>
        <Sidebar />
        <NuxSlots />
      </PrivateRoute>

      <PrivateRoute exact={true} path="/manage-users" permissionLevel={agentPermissionLevel}>
        <Sidebar />
        <ManageUsers />
      </PrivateRoute>

      <PrivateRoute exact={true} path="/statistics" permissionLevel={agentPermissionLevel}>
        <Sidebar />
        <Statistics />
      </PrivateRoute>

      <PrivateRoute exact={true} path="/evolution-statistics" permissionLevel={agentPermissionLevel}>
        <Sidebar />
        <EvolutionStatistics />
      </PrivateRoute>

      <PrivateRoute exact={true} path="/1w-speed-chance" permissionLevel={userPermissionLevel}>
        <Sidebar />
        <SpeedChance />
      </PrivateRoute>

      <PrivateRoute exact={true} path="/chance" permissionLevel={userPermissionLevel}>
        <Sidebar />
        <Chance />
      </PrivateRoute>

      <PrivateRoute exact={true} path="/balance" permissionLevel={userPermissionLevel}>
        <Sidebar />
        <Balance />
      </PrivateRoute>

      <PrivateRoute exact={true} path="/personal-info" permissionLevel={userPermissionLevel}>
        <Sidebar />
        <PersonalInfo />
      </PrivateRoute>

      <PrivateRoute exact={true} path="/rules" permissionLevel={adminPermissionLevel}>
        <Sidebar />
        <Rules />
      </PrivateRoute>

      <PrivateRoute exact={true} path="/rule-list" permissionLevel={userPermissionLevel}>
        <Sidebar />
        <RuleList />
      </PrivateRoute>

      <PrivateRoute exact={true} path="/ticker" permissionLevel={adminPermissionLevel}>
        <Sidebar />
        <Ticker />
      </PrivateRoute>

      <PrivateRoute exact={true} path="/login-history/:id" permissionLevel={adminPermissionLevel}>
        <Sidebar />
        <LoginHistory />
      </PrivateRoute>

      <PrivateRoute exact={true} path="/chance-set-result" permissionLevel={adminPermissionLevel}>
        <Sidebar />
        <ResultConfig />
      </PrivateRoute>
    </Switch>
  );
};

export default RenderRoutes;
