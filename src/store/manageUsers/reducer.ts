import { Reducer } from "redux";
import { actionTypes } from "./types";

import { userTree, changeBalance } from "../../helpers";
import { IProfileWithChildren } from "../../interfaces/IManageUsers";
import { IComment } from "../../interfaces/IComment";
import { IBalanceGetResponse } from "../../interfaces/IBalance";
import { IScedualPayment } from "../../interfaces/IScedualPayment";
import { userDictionary } from "../../common/dictionary";
import { IProfileWithChildrenAndStatistics } from "../../interfaces/IStatistics";

interface IInitialState {
  userTree: IProfileWithChildren[];
  allUsers: IProfileWithChildren[];
  totalTableState: ITotalTableState;
  statistics: {
    balanceHistory: IBalanceGetResponse[]
  };
  comment: IComment | {};
  scedualPayment: IScedualPayment | {};
}

export interface ITotalTableState {
  totalBetCount: number;
  totalCanceledBet: number;
  totalDebitAmount: number;
  totalWinAmount: number;
  totalProfitAmount: number;
  totalAgentProfitAmount: number;
  totalMasterProfitAmount: number;
  totalSystemCommission: number;
}

export const initialState: IInitialState = {
  userTree: [],
  allUsers: [],
  totalTableState: {} as ITotalTableState,
  statistics: {
    balanceHistory: []
  },
  comment: {},
  scedualPayment: {},
};

const reducer: Reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.MANAGE_USERS_SUCCESS: {
      const newPayload = changeBalance(action.payload, false, ["balance", "scedualPaymentBalance", "cashbackBalance", "providerMaxLimit"]);

      return {
        ...state,
        userTree: userTree(newPayload),
        allUsers: newPayload,
        usersLoaded: true
      };
    }

    // User list expansion
    case actionTypes.MANAGE_USERS_EXPANSION: {
      return {
        ...state,
        userTree: userTree(action.payload, true),
        allUsers: action.payload
      };
    }

    // Statistics list
    case actionTypes.STATISTICS_SUCCESS: {
      return {
        ...state,
        statistics: {
          ...action.payload,
          balanceHistory: changeBalance(action.payload.balanceHistory, false, ["amount", "targetCurrentBalance"]),
        }
      };
    }

    // Provider Statistics list
    case actionTypes.PROVIDER_STATISTICS_SUCCESS: {
      const parents: IProfileWithChildrenAndStatistics[] = [];
      const subParents: IProfileWithChildrenAndStatistics[] = [];

      const totalTableState: ITotalTableState = {
        totalBetCount: 0,
        totalCanceledBet: 0,
        totalDebitAmount: 0,
        totalWinAmount: 0,
        totalProfitAmount: 0,
        totalAgentProfitAmount: 0,
        totalMasterProfitAmount: 0,
        totalSystemCommission: 0,
      };

      let users: IProfileWithChildrenAndStatistics[] = action.payload.map(item => {
        item.user.betCount = item.betCount;
        item.user.canceledBet = item.canceledBet;
        item.user.debitAmount = changeBalance(item.debitAmount);
        item.user.winAmount = changeBalance(item.winAmount);
        item.user.profitAmount = changeBalance(item.profitAmount);
        item.user.agentProfitAmount = changeBalance(item.agentProfitAmount);
        item.user.masterProfitAmount = changeBalance(item.masterProfitAmount);
        item.user.systemCommission = item.user.profitAmount - item.user.agentProfitAmount - item.user.masterProfitAmount;
        
        totalTableState.totalBetCount += item.user.betCount;
        totalTableState.totalCanceledBet += item.user.canceledBet;
        totalTableState.totalDebitAmount += item.user.debitAmount;
        totalTableState.totalWinAmount += item.user.winAmount;
        totalTableState.totalProfitAmount += item.user.profitAmount;
        totalTableState.totalAgentProfitAmount += item.user.agentProfitAmount;
        totalTableState.totalMasterProfitAmount += item.user.masterProfitAmount;
        totalTableState.totalSystemCommission += item.user.systemCommission;

        if (
          item.user.parent && (
            item.user.parent.permissionLevel === userDictionary.USER_MASTER_PERMISSION_LEVEL || (
              item.user.parent.permissionLevel === userDictionary.USER_AGENT_PERMISSION_LEVEL &&
              item.user.parent.parent.permissionLevel === userDictionary.USER_ADMIN_PERMISSION_LEVEL
            )
        )) {
          item.user._isShow = false;
          item.user.children = [];
          const existParent: IProfileWithChildrenAndStatistics | undefined = parents.find(parent => parent.id === item.user.parent.id);

          if (existParent) {
            existParent.children.push(item.user);
          } else {
            const newParent: IProfileWithChildrenAndStatistics = Object.assign({}, item.user.parent);
            newParent.children = [];
            newParent._isShow = true;
            newParent.children.push(item.user);
            parents.push(newParent);
          }
        } else if (item.user.parent.permissionLevel === userDictionary.USER_AGENT_PERMISSION_LEVEL) {
          item.user._isShow = false;
          item.user.children = [];
          const existSubParent: IProfileWithChildrenAndStatistics | undefined = subParents.find(parent => {
            return parent.id === item.user.parent.id
          });

          let newSubParent;

          if (existSubParent) {
            existSubParent.children.push(item.user);
          } else {
            newSubParent = Object.assign({}, item.user.parent);
            newSubParent.children = [];
            newSubParent._isShow = false;
            newSubParent.children.push(item.user);
            subParents.push(newSubParent);
          }

          const existParent: IProfileWithChildrenAndStatistics | undefined = parents.find(parent => {
            return parent.id === item.user.parent.parent.id
          });

          if (existParent) {
            const isExists: boolean = existParent.children.some(child => {
              const id: number = existSubParent ? existSubParent?.id : newSubParent.id;
              return child.id === id;
            });

            if (!isExists) {
              existParent.children.push(existSubParent ? existSubParent : newSubParent);
            } else {
              existParent.children = existParent.children.map(child => {
                const id: number = existSubParent ? existSubParent?.id : newSubParent.id;
                return child.id === id ? (existSubParent ? existSubParent : newSubParent) : child;
              });
            }
          } else {
            const newParent: IProfileWithChildrenAndStatistics = Object.assign({}, item.user.parent.parent);
            newParent.children = [];
            newParent._isShow = true;
            newParent.children.push(newSubParent);
            parents.push(newParent);
          }
        } else {
          item.user._isShow = true;
          item.user.children = [];
          parents.push(item.user);
          return false;
        }

        return item.user;
      });

      users = users.filter(item => {
        return item;
      });

      parents.forEach(item => {
        if (item.permissionLevel === userDictionary.USER_MASTER_PERMISSION_LEVEL) {
          let masterProfit = 0;
          let masterSummaryProfit = 0;
          let masterSystemCommission = 0;

          item.children.forEach(child => {
            if (child.permissionLevel === userDictionary.USER_AGENT_PERMISSION_LEVEL) {
              let agentProfit = 0;
              let agentSummaryProfit = 0;
              let agentSystemCommission = 0;

              child.children.forEach(grandChild => {
                agentProfit += grandChild.agentProfitAmount;
                masterProfit += grandChild.masterProfitAmount;
                agentSummaryProfit += grandChild.profitAmount;
                masterSummaryProfit += grandChild.profitAmount;
                agentSystemCommission += grandChild.systemCommission;
                masterSystemCommission += grandChild.systemCommission;
              });

              child.profitAmount = agentProfit;
              child.summaryProfitAmount = agentSummaryProfit;
              child.systemCommission = agentSystemCommission;
            } else {
              masterProfit += child.masterProfitAmount;
              masterSummaryProfit += child.profitAmount;
              masterSystemCommission += child.systemCommission;
            }
          });

          item.profitAmount = masterProfit;
          item.summaryProfitAmount = masterSummaryProfit;
          item.systemCommission = masterSystemCommission;
        } else if (item.permissionLevel === userDictionary.USER_AGENT_PERMISSION_LEVEL) {
          let agentProfit = 0;
          let agentSummaryProfit = 0;
          let agentSystemCommission = 0;

          item.children.forEach(child => {
            agentProfit += child.agentProfitAmount;
            agentSummaryProfit += child.profitAmount;
            agentSystemCommission += child.systemCommission;
          });

          item.profitAmount = agentProfit;
          item.summaryProfitAmount = agentSummaryProfit;
          item.systemCommission = agentSystemCommission;
        }
      });

      const allUsers: IProfileWithChildrenAndStatistics[] = parents.concat(subParents.concat(users));

      return {
        ...state,
        totalTableState,
        userTreeStatistics: changeBalance(parents),
        allUserStatistics: changeBalance(allUsers),
        usersStatisticsLoaded: true
      };
    }

    case actionTypes.PROVIDER_USERS_EXPANSION: {
      return {
        ...state,
        userTreeStatistics: userTree(action.payload, true),
        allUserStatistics: action.payload
      };
    }

    // User create
    case actionTypes.CREATE_USER_SUCCESS: {
      const newUser = {
        ...action.payload,
        _isShow: true,
        _isShowChildren: false
      };

      return {
        ...state,
        userTree: userTree([...state.userTree, newUser], true),
        allUsers: [...state.allUsers, newUser]
      };
    }

    case actionTypes.CREATE_USER_JOIN_SUCCESS: {
      const newUser = {
        ...action.payload,
        _isShow: true,
        _isShowChildren: false
      };

      return {
        ...state,
        allUsers: [...state.allUsers, newUser]
      };
    }

    // User balance
    case actionTypes.USER_BALANCE_SUCCESS: {
      const newData = state.allUsers.map(
        item =>
          item.id === +action.payload.target.id
            ? {
              ...item,
              balance: changeBalance(action.payload.target.balance),
              scedualPaymentBalance: changeBalance(action.payload.target.scedualPaymentBalance),
              providerMaxLimit: action.payload.target.providerMaxLimit ? changeBalance(action.payload.target.providerMaxLimit) : null,
              cashbackBalance: changeBalance(action.payload.target.cashbackBalance),
            }
            : item
      );

      return {
        ...state,
        userTree: userTree(newData, true),
        allUsers: newData
      };
    }

    // User ban
    case actionTypes.USER_BAN_SUCCESS: {
      const newData = state.allUsers.map(
        item =>
          item.id === +action.payload.id
            ? {
              ...item,
              status: action.payload.status,
              balance: changeBalance(action.payload.balance),
              scedualPaymentBalance: changeBalance(action.payload.scedualPaymentBalance),
              providerMaxLimit: action.payload.providerMaxLimit ? changeBalance(action.payload.providerMaxLimit) : null,
              cashbackBalance: changeBalance(action.payload.cashbackBalance),
            }
            : item
      );

      return {
        ...state,
        userTree: userTree(newData, true),
        allUsers: newData
      };
    }

    // User cashback
    case actionTypes.CASHBACK_SUCCESS: {
      const newData = state.allUsers.map(
        item =>
          item.id === action.payload.id
            ? {
              ...item,
              ...action.payload,
              balance: changeBalance(action.payload.balance),
              scedualPaymentBalance: changeBalance(action.payload.scedualPaymentBalance),
              providerMaxLimit: action.payload.providerMaxLimit ? changeBalance(action.payload.providerMaxLimit) : null,
              cashbackBalance: changeBalance(action.payload.cashbackBalance),
            }
            : item
      );

      return {
        ...state,
        userTree: userTree(newData, true),
        allUsers: newData
      };
    }

    // User Profit
    case actionTypes.PROFIT_SUCCESS: {
      const newData = state.allUsers.map(
        item =>
          item.id === action.payload.id
            ? {
              ...item,
              ...action.payload,
              balance: changeBalance(action.payload.balance),
              scedualPaymentBalance: changeBalance(action.payload.scedualPaymentBalance),
              providerMaxLimit: action.payload.providerMaxLimit ? changeBalance(action.payload.providerMaxLimit) : null,
              cashbackBalance: changeBalance(action.payload.cashbackBalance),
            }
            : item
      );

      return {
        ...state,
        userTree: userTree(newData, true),
        allUsers: newData
      };
    }
    //  Provider Max limit
    case actionTypes.PROVIDER_MAX_LIMIT_SUCCESS: {
      const newData = state.allUsers.map(
        item =>
          item.id === action.payload.id
            ? {
              ...item,
              ...action.payload,
              balance: changeBalance(action.payload.balance),
              scedualPaymentBalance: changeBalance(action.payload.scedualPaymentBalance),
              providerMaxLimit: action.payload.providerMaxLimit ? changeBalance(action.payload.providerMaxLimit) : null,
              cashbackBalance: changeBalance(action.payload.cashbackBalance),
            }
            : item
      );

      return {
        ...state,
        userTree: userTree(newData, true),
        allUsers: newData
      };
    }

    // Comment
    case actionTypes.COMMENT_SUCCESS: {
      return {
        ...state,
        comment: action.payload,
      };
    }

    case actionTypes.GET_LOGIN_HISTORY_SUCCESS: {
      return {
        ...state,
        loginHistory: action.payload,
      };
    }

    case actionTypes.ON_USER_SELECT: {
      return {
        ...state,
        selectedUser: action.payload,
      };
    }

    // Scedual payment
    case actionTypes.SCEDUAL_PAYMENT_SUCCESS: {
      return {
        ...state,
        scedualPayment: {
          ...action.payload,
          amount: changeBalance(action.payload.amount)
        }
      };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
