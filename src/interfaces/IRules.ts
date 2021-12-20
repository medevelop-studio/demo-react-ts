import { IHandlerStatus } from "./IProfile";

export interface IRule {
  id: number;
  gameName: string;
  gameType: number;
  text: string;
  createDate: Date;
  updateDate: Date;
  version: number;
}

export interface IRulesProps {
  rules: IRule[];
  rulesLoaded: boolean;
  createRulesRequest(data: ICreateRulesRequest): void;
  deleteRulesRequest(data: IDeleteRulesRequest): void;
  getRulesRequest(data: IGetRulesRequest): void;
  translate(key: string): string;
}

export interface IRulesState {
  currentGameName: string;
  newGameName: string;
}

export interface IRuleListProps {
  rules: IRule[];
  rulesLoaded: boolean;
  translate(key: string): string;
  getRulesRequest(data: IGetRulesRequest): void;
}

export interface ITicker {
  id: number;
  type: number;
  text: string;
  createDate: Date;
  updateDate: Date;
  version: number;
}

export interface ITickerText {
  en: string;
  ru: string;
  he: string;
}

export interface IGetRulesRequest {
  gameType?: number;
  gameName?: string;
}

export interface IDeleteRulesRequest {
  gameType: number;
  gameName: string;
}

export interface ICreateRulesRequest extends IDeleteRulesRequest {
  newGameName?: string;
  text: string;
}

export interface IGetTickerRequest {
  type: number;
}

export interface ICreateTickerRequest extends IGetTickerRequest {
  text: string;
}

export interface ITickerProps {
  ticker: ITicker;
  tickerLoaded: boolean;
  handlerStatus: IHandlerStatus;
  getTickerRequest(data: IGetTickerRequest): void;
  createTickerRequest(data: ICreateTickerRequest): void;
  translate(key: string): string;
}

export interface ITickerState {
  text: string;
  isTickerTextGet: boolean;
}
