export const userDictionary = {
  // User Roles permission_level
  USER_PLAYER_PERMISSION_LEVEL: 1,
  USER_AGENT_PERMISSION_LEVEL: 2,
  USER_MASTER_PERMISSION_LEVEL: 4,
  USER_ADMIN_PERMISSION_LEVEL: 8,

  // User status
  USER_STATUS_ACTIVE: 1,
  USER_STATUS_BANNED: 2
};

export const balanceDictionary = {
  // Balance type
  BALANCE_TYPE_TRANSFER: 1,
  BALANCE_TYPE_TAKE: 2,
  BALANCE_TYPE_REDUCE: 3,
  BALANCE_TYPE_ADD: 4,
  BALANCE_TYPE_CASHBACK: 5,
  BALANCE_TYPE_REFUND: 6
};

export const gameDictionary = {
  // Game status
  GAME_STATUS_CREATED: 1,
  GAME_STATUS_STARTED: 2,
  GAME_STATUS_ENDED: 3,
  GAME_STATUS_FAILED: 4,
  GAME_STATUS_DELETED: 5,

  // Game type
  GAME_TYPE_CASINO: 7,
  GAME_TYPE_CHANCE: 8,

  // Failed status
  GAME_STATUS_NOT_ENOUGH_PLAYERS: 1,
  GAME_STATUS_NOT_ENOUGH_MATCHES: 2,
  GAME_STATUS_NOT_ENOUGH_PLAYERS_AND_MATCHES: 3,

  // Default value
  GAME_DEFAULT_CASHBACK_PERCENT: 10
};

export const ScedualPaymentDictionary = {
  // Scedual Payment Status
  SCEDUAL_PAYMENT_STATUS_CREATED: 1,
  SCEDUAL_PAYMENT_STATUS_PAID: 2,
  SCEDUAL_PAYMENT_STATUS_DELETED: 3
};

export const TickerDictionary = {
  // Ticker type
  TICKER_TYPE_BETTING: 1,
  TICKER_TYPE_GAMBLING: 2
}

export const GameTypeDictionary = {
  GAME_TYPE_BEST_AT_TABLE: 1,
  GAME_TYPE_CHECKPOINT: 2,
  GAME_TYPE_ONE_ON_ONE: 3,
  GAME_TYPE_MONTH_PRIZE: 4,
  GAME_TYPE_DAILY: 5,
  GAME_TYPE_JACKPOT: 6,
  GAME_TYPE_CASINO: 7,
  GAME_TYPE_CHANCE: 8,
}

export const ChanceDictionary = {
  // Chance bet type
  CHANCE_BET_TYPE_ACCURATE_PREDICTION: 1,
  CHANCE_BET_TYPE_PARITY_PREDICTION: 2,
  CHANCE_BET_TYPE_MORE_LESS_PREDICTION: 3,

  // Chance parity prediction
  CHANCE_PARITY_PREDICTION_ODD: "odd",
  CHANCE_PARITY_PREDICTION_EVEN: "even",

  // Chance more-less prediction
  CHANCE_MORE_LESS_PREDICTION_LESS: "less",
  CHANCE_MORE_LESS_PREDICTION_MORE: "more",
  CHANCE_MORE_LESS_PREDICTION_COMPARED_VALUE: 42,

  // Ratio
  CHANCE_BET_TYPE_ACCURATE_PREDICTION_RATIO_SIMPLE: 8,
  CHANCE_BET_TYPE_ACCURATE_PREDICTION_RATIO_ALL: 4096,
  CHANCE_BET_TYPE_PARITY_PREDICTION_RATIO: 2,
  CHANCE_BET_TYPE_MORE_LESS_PREDICTION_RATIO: 2,

  CHANCE_BET_TYPE_ONE: 7,
  CHANCE_BET_TYPE_TWO: 35,
  CHANCE_BET_TYPE_THREE: 350,
  CHANCE_BET_TYPE_FOUR: 2000,
}
