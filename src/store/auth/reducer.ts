import { actionTypes } from "./types";

import { changeBalance } from "../../helpers";
import { IProfile } from "../../interfaces/IProfile";
import { IBalanceGetResponse } from "../../interfaces/IBalance";

interface IInitialState {
  user: IProfile | {};
  isAuthenticated: boolean;
  isLoaded: boolean;
  authFailure: boolean;
  balanceHistory: {
    data: {
      balances: IBalanceGetResponse[];
      profitAmount: number;
    };
  };
  ticketHistory: {
    data: any[];
  };
}

export const initialState: IInitialState = {
  user: {},
  isAuthenticated: false,
  isLoaded: false,
  authFailure: false,
  balanceHistory: {
    data: {
      balances: [],
      profitAmount: 0,
    },
  },
  ticketHistory: {
    data: []
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_SUCCESS: {
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
          balance: changeBalance(action.payload.balance),
          scedualPaymentBalance: changeBalance(action.payload.scedualPaymentBalance),
          providerMaxLimit: action.payload.providerMaxLimit ? changeBalance(action.payload.providerMaxLimit) : null,
          cashbackBalance: changeBalance(action.payload.cashbackBalance),
        },
        isAuthenticated: true,
        isLoaded: true,
        authFailure: false
      };
    }

    case actionTypes.PROFILE_ERROR: {
      return {
        ...state,
        authFailure: true
      };
    }

    case actionTypes.USER_EDIT: {
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload
        }
      };
    }

    // Balance history
    case actionTypes.BALANCE_HISTORY_SUCCESS: {
      return {
        ...state,
        balanceHistory: {
          ...state.balanceHistory,
          ...action.payload,
          data: {
            balances: changeBalance(action.payload.data.balances, false, "amount"),
            profitAmount: changeBalance(action.payload.data.profitAmount, false),
          },
          balanceLoaded: true
        }
      };
    }

    // Ticket history
    case actionTypes.TICKET_HISTORY_SUCCESS: {
      return {
        ...state,
        ticketHistory: {
          ...state.ticketHistory,
          ...action.payload,
          data: changeBalance(action.payload.data, false, "price"),
          ticketsLoaded: true
        }
      };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
