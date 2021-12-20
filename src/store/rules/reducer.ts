import { Reducer } from "redux";
import { actionTypes } from "./types";
import { ITicker } from "../../interfaces/IRules";

interface IInitialState {
  rules: any[];
  ticker: ITicker | null;
}

export const initialState: IInitialState = {
  rules: [],
  ticker: null,
};

const reducer: Reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_RULES_SUCCESS: {
      return {
        ...state,
        rules: action.payload,
        rulesLoaded: true
      };
    }

    case actionTypes.GET_RULES_ERROR: {
      return {
        ...state,
        rules: [],
        rulesLoaded: true
      }
    }

    case actionTypes.CREATE_RULES_SUCCESS: {
      if (state.rules.some(rule => rule.id === action.payload.id)) {
        state.rules = state.rules.map(rule => {
          if (rule.id === action.payload.id) {
            return action.payload;
          }

          return rule;
        });
      } else {
        state.rules.push(action.payload);
      }

      return {
        ...state,
        rules: state.rules,
        rulesLoaded: true
      };
    }

    case actionTypes.DELETE_RULES_SUCCESS: {
      state.rules = state.rules.filter(rule => {
        return rule.gameName !== action.payload.gameName
      });

      return {
        ...state,
        rules: state.rules,
        tickerLoaded: true
      };
    }

    case actionTypes.GET_TICKER_SUCCESS: {
      return {
        ...state,
        ticker: action.payload,
        tickerLoaded: true
      };
    }

    case actionTypes.GET_TICKER_ERROR: {
      return {
        ...state,
        ticker: null,
        tickerLoaded: true
      }
    }

    case actionTypes.CREATE_TICKER_SUCCESS: {
      return {
        ...state,
        ticker: action.payload,
        tickerLoaded: true
      };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
