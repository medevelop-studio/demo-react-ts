import { IProfile, IHandlerStatus } from "./IProfile";
import { IChance, IChanceBetAccurate } from "./IChance";
import { IRule } from "./IRules";

export interface IBestAtTable {
  match: IMatch;
  game: IGame;
  user: IProfile;
  rules: IRule[];
  gameTypeRequest(q: any): void;
  ticketsRequest(q: any): void;
  gameTypeReset(q: any): void;
  translate(key: string): string;
  switchModal(e: React.MouseEvent<HTMLElement>): void;
  getRulesRequest(q: any): void;
};

export interface IBestAtTableState {
  createTicketIsOpen: boolean;
  ticketIsOpen: boolean;
  selectedTicket: any;
  gameStatus: any;
  ruleClicked: boolean;
  ruleType: number;
  ruleData: any;
  showRuleIsOpen: boolean;
};

export interface IMatch {
  id: number;
  path: string;
  url: string;
  isExact: boolean;
  params: IMatchParams;
  startDate: string;
}

export interface IMatchPlus {
  id: number;
  team1: string;
  team2: string;
  league: string;
  logoTeam1: ILogo;
  logoTeam2: ILogo;
  logoLeague: ILogo;
  options: IBetTypeMatch[];
  status: number;
  startDate: Date;
  createDate: Date;
  updateDate: Date;
  version: number;
}

export interface IMatchParams {
  gameId: number | string;
}

export interface IChanceBetTicket {
  type: number;
  data: string | IChanceBetAccurate;
}

export interface ITicket {
  id: number;
  price: number;
  player: IProfile;
  game: IGame;
  chance: IChance;
  bet: ITicketBet[];
  betChance: IChanceBetTicket;
  successBets: number;
  status: number;
  winAmount: number;
  createDate: Date;
  updateDate: Date;
  version: number;
}

export interface ITicketBet {
  matchId: number;
  bet: string;
  isSelected?: boolean;
}

export interface IGame {
  id: number;
  matches: IMatch[];
  tickets: ITicket[];
  maxPlayers: number;
  startDate: string;
  createDate: string;
  updateDate: string;
  roomAccess: string;
  cashbackPercent: number;
  ticketPrice: number;
  type: number;
  point: number;
  checkpointbank: number;
  currentPlayers: number;
  minPlayers: number;
  status: number;
}

export interface IGames {
  data: IGame[];
  totalCount: number;
  amountPerPage: number;
}

export interface IBetTypeMatch {
  status: boolean;
  name: string;
}

export interface IGameLocation {
  pathname: string;
  search: string;
  hash: string;
  state: any;
  key: string;
}

export interface IGameHistory {
  length: number;
  action: string;
  location: IGameLocation;
  match: IMatch,
  push(url: string): void;
}

export interface IGamesListProps {
  games: IGames;
  gamesLoaded: any;
  history: IGameHistory;
  rules: IRule[];
  gamesTypesRequest(q: any): void;
  translate(key: string): string;
  getRulesRequest(q: any): void;
}

export interface IGamesListState {
  games: IGame[];
  ruleClicked: boolean;
  ruleType: number;
  ruleData: any;
  showRuleIsOpen: boolean;
}

export interface IGameStatus {
  gameCreated: boolean;
  gameStarted: boolean;
}

export interface IUserPlace {
  placeCount: number;
  seatUnavailable: boolean | ITicket;
  gameStatus: IGameStatus;
  ticket: ITicket;
  item: any;
  game: IGame;
  translate(key: string): string;
  setTicket(ticket: ITicket): void;
  switchModal(e: React.MouseEvent<HTMLElement>): void;
}

export interface IUserPlaceItem {
  place: number;
  _styles: any;
}

export interface IUserPlacePreview {
  table: ITable
}

export interface ITable {
  id, ticketPrice, cashbackPercent, maxPlayers, point, checkpointBank, currentPlayers, minPlayers, requiredMatches, currentMatches: number;
  status: number;
  error: number;
  roomAccess: any;
  version: number;
  isMyGame: boolean;
  startDate, createDate, updateDate: string;
}

export interface IDaily {
  history: IGameHistory;
  location: IGameLocation;
  match: IMatch;
  staticContext: any;
  user: IProfile;
  gamesLoaded: boolean;
  ticketsLoaded: boolean;
  games: IGames;
  rules: IRule[];
  gamesTypesRequest(q: any): void;
  translate(key: string): string;
  getRulesRequest(q: any): void;
}

export interface IJackpot {
  history: IGameHistory;
  location: IGameLocation;
  match: IMatch;
  staticContext: any;
  user: IProfile;
  gamesLoaded: boolean;
  ticketsLoaded: boolean;
  games: IGames;
  rules: IRule[];
  gamesTypesRequest(q: any): void;
  translate(key: string): string;
  getRulesRequest(q: any): void;
}

export interface IMonthPrize {
  history: IGameHistory;
  location: IGameLocation;
  match: IMatch;
  staticContext: any;
  user: IProfile;
  gamesLoaded: boolean;
  ticketsLoaded: boolean;
  tickets: ITicket[];
  games: IGames;
  rules: IRule[];
  handlerStatus: IHandlerStatus;
  gamesTypesRequest(q: any): void;
  ticketRequest(): void;
  createTicketRequest(q: any): void;
  translate(key: string): string;
  ticketsRequest(q: any): void;
  getRulesRequest(q: any): void;
}

export interface IMonthPrizeState {
  gamesLoaded: boolean;
  game: any;
  ruleClicked: boolean;
  ruleType: number;
  ruleData: any;
  showRuleIsOpen: boolean;
}

export interface IOneOnOneProps {
  history: IGameHistory;
  location: IGameLocation;
  match: IMatch;
  staticContext: any;
  user: IProfile;
  gamesLoaded: boolean;
  matches: IMatch[];
  games: IGames;
  rules: IRule[];
  priceChangeRequests: any;
  gamesTypesRequest(q: IRequestParams): void;
  matchesRequest(q: IRequestParams): void;
  translate(key: string): string;
  ticketsRequest(q: IRequestParams): void;
  getRulesRequest(q: any): void;
}

export interface IGameData {
  game: IGame;
  isMyGame: boolean;
}
export interface IOneOnOneState {
  createTicketIsOpen: boolean;
  changePriceIsOpen: boolean;
  gameData: ITable | null;
  ruleClicked: boolean;
  ruleType: number;
  ruleData: any;
  showRuleIsOpen: boolean;
}

export interface IGamesPage {
  games: {
    data: IGame[];
    totalCount: number;
    amountPerPage: number;
  };
  gamesLoaded: boolean;
  translate(key: string): string;
  gamesRequest(q: IRequestParams): void;
  matchesRequest(q: IRequestParams): void;
}

export interface IGamesPageState {
  createGameIsOpen: boolean;
  gameInfoIsOpen: boolean;
  gameData: IGame;
  filteredMatches: IMatch[]
}

export interface IMatchesPage {
  matches: {
    data: IMatch[];
    totalCount: number;
    amountPerPage: number;
  }
  matchesLoaded: boolean;
  logosTeam: any;
  logosLeague: any;
  logosRequest(q: IRequestParams): void;
  logosLeagueRequest(q: IRequestParams): void;
  logosTeamRequest(q: IRequestParams): void;
  matchesRequest(q: IRequestParams): void;
  translate(key: string): string;
}

export interface IMatchesPageState {
  createMatchIsOpen: boolean;
  deleteMatchIsOpen: boolean;
  resultMatchIsOpen: boolean;
  matchData: any;
}

export interface IRequestParams {
  getParams: {
    id?: number;
    pageNumber?: number;
    type?: number;
    amountPerPage?: number;
    playerId?: number;
    name?: string;
    withPaginate?: boolean;
    status?: number;
  }
  isUpdate?: boolean;
}

export interface IDeleteMatchRequest {
  matchId: number;
}

export interface IOneOnOneGameList {
  user: IProfile;
  games: {
    data: IGame[];
  };
  priceChangeRequests: any;
  switchModal: any;
  changeMyPrice: any;
  changePriceRequest: any;
  translate(key: string): string;
}

export interface ILogosPage {
  logosTeamLoaded: boolean;
  logosLeagueLoaded: boolean;
  logosTeamRequest(q: IRequestParams): void;
  logosLeagueRequest(q: IRequestParams): void;
  translate(key: string): string;
}

export interface ILogo {
  id: number;
  name: string;
  url: string;
  status: number;
  version: number;
  createDate: string;
  updateDate: string;
}

export interface ILogosPageState {
  currentLogos: string;
  createLogoIsOpen: boolean;
  deleteLogoIsOpen: boolean;
  logos: any;
  logoData: {
    id?: number,
    name?: string;
    logoType: number;
  } | null;
}

export interface ILogosList {
  logosTitle: string;
  logos: {
    totalCount: number;
    amountPerPage: number;
    data: ILogo[];
  };
  editLogo: any;
  deleteLogo: any;
  logoType: any;
  logosLoaded: any;
  logosRequest(q: IRequestParams): void;
  translate(key: string): string;
}

export interface IMyBets {
  ticketHistory: {
    data: ITicket[];
    totalCount: number;
    amountPerPage: number;
  };
  ticketsLoaded: boolean;
  user: IProfile;
  translate(key: string): string;
  ticketHistoryRequest(q: IRequestParams): void;
}

export interface IPersonalInfoPage {
  user: IProfile;
  translate(key: string): string;
}

export interface IRuleListPage {
  rules: any;
  translate(key: string): string;
  getRulesRequest(q: IRequestParams): void;
}

export interface IRulesPage {
  rules: any;
  createRulesRequest: any;
  getRulesRequest(q: IRequestParams): void;
  translate(key: string): string;
}

export interface IRulesPageState {
  currentGameType: number;
}

// Store
export interface IGamesRequest {
  getParams: {
    pageNumber: number;
  }
}

export interface ICreateGameValue {
  type: number;
  minPlayers: number;
  cashbackPercent: number;
  requiredMatches: number;
  startDate: number;
  ticketPrice: number;
}

export interface ICreateGameRequest {
  values: ICreateGameValue[];
  matchIds: [number[]];
}

export interface ILogoLeagueRequestParams extends IRequestParams {
  name: string;
}

export interface IResponseParams<T> {
  totalCount: number;
  pageNumber: number;
  amountPerPage: number;
  data: T;
}

export interface ICreateOneOnOneRequest {
  values: {
    ticketPrice: number;
    availableBets: string;
  },
  type: number;
}

export interface ICreateTicketRequest {
  values: {
    gameId?: number;
    chanceId?: number;
    bet?: string;
    betChance?: string;
    price?: number;
  };
  type: number;
}

export interface ITicketPointResponse {
  point?: number;
  canBetOnCheckpoint: boolean;
  lastCheckpointTicket: ITicket;
}

export interface ICreateLogoRequest {
  values: {
    name: string;
    file: any;
  };
  type?: string;
}

export interface IUpdateLogoRequest {
  values: {
    id: number;
    name: string;
    file: any;
  };
  type?: string;
}

export interface IDeleteLogoRequest {
  values: {
    id: number;
  }
  type?: string;
}

export interface ICreateMatchRequest {
  team1: string;
  team2: string;
  league: string;
  options: any;
  startDate: number;
}

export interface IResultMatchRequest {
  matchId: number;
  options: string;
}

export interface IUpdateMatchRequest extends ICreateMatchRequest {
  matchId: number;
}
export interface ICreateGameRequest {
  ticketPrice: number;
  maxPlayers: number;
  minPlayers: number;
  requiredMatches: number;
  status: number;
  matches: number[];
  startDate: number;
}

export interface IUpdateGameRequest extends ICreateGameRequest {
  gameId: number;
}
