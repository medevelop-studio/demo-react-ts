import { Reducer } from "redux";
import { actionTypes } from "./types";

import { changeBalance } from "../../helpers";
import { gameDictionary } from "../../common/dictionary";
import { IGame, IMatch, ITicket } from "../../interfaces/IGames";
import { IChance } from "../../interfaces/IChance";

interface IInitialState {
  bestAtTable: {
    games: {
      data: IGame[];
    },
    game: {
      matches: IMatch[];
      tickets: ITicket[];
    }
  };
  checkpoint: any;
  monthPrize: {
    games: {
      data: IGame[];
    }
  };
  daily: {
    games: {
      data: IGame[];
    }
  };
  jackpot: {
    games: {
      data: IGame[];
    }
  };
  oneOnOne: {
    games: {
      data: IGame[];
    }
  };
  chance: {
    games: {
      data: IChance[];
    }
  };
  priceChangeRequests: any[];
}

export const initialState: IInitialState = {
  bestAtTable: {
    games: {
      data: []
    },
    game: {
      matches: [],
      tickets: []
    }
  },
  checkpoint: {
    games: {
      data: []
    },
    point: {}
  },
  monthPrize: {
    games: {
      data: [],
    }
  },
  daily: {
    games: {
      data: []
    }
  },
  jackpot: {
    games: {
      data: []
    }
  },
  oneOnOne: {
    games: {
      data: []
    }
  },
  chance: {
    games: {
      data: [],
    }
  },
  priceChangeRequests: []
};

const getGameType = (type: number): string => {
  switch (type) {
    case gameDictionary.GAME_TYPE_CHANCE:
      return "chance";
    default:
      return "";
  }
};

const reducer: Reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TICKETS_SUCCESS: {
      const type = getGameType(action.payload.type);

      return {
        ...state,
        [type]: {
          ...state[type],
          game: {
            ...state[type].game,
            tickets: changeBalance(action.payload.tickets.data, false, "price")
          },
          ticketsLoaded: true
        }
      };
    }

    // Tickets
    case actionTypes.CREATE_TICKET_SUCCESS: {
      const type = getGameType(action.payload.type);

      if (action.payload.type === gameDictionary.GAME_TYPE_CHANCE) {
        const ticket = action.payload.ticket;

        return {
          ...state,
          [type]: {
            ...state[type],
            games: {
              ...state[type].games,
              data: state[type].games.data.map((item) => item.id === ticket.chance.id ?
                { ...item, tickets: [ ...item.tickets, ticket ] } : item)
            }
          }
        };
      }

      // Create ticket - default
      return {
        ...state,
        [type]: {
          ...state[type],
          game: {
            ...state[type].game,
            tickets: [
              ...state[type].game.tickets,
              {
                ...action.payload.ticket,
                price: changeBalance(action.payload.ticket.price, false)
              }
            ]
          }
        }
      };
    }

    // Chances
    case actionTypes.CHANCES_SUCCESS: {
      return {
        ...state,
        chance: {
          ...state.chance,
          games: {
            ...state.chance.games,
            data: changeBalance(action.payload.data, false, "ticketPrice"),
            totalCount: action.payload.totalCount,
            pageNumber: action.payload.pageNumber,
            amountPerPage: action.payload.amountPerPage,
          },
          chancesLoaded: true
        }
      };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
