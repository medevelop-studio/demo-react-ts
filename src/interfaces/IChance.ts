import { ITicket, ICreateTicketRequest } from "./IGames";
import { IHandlerStatus } from "./IProfile";

export interface IChance {
  id: number;
  ticketPrice: number;
  cashbackPercent: number;
  currentTickets: number;
  status: number;
  tickets: ITicket[];
  result: IResult;
  startDate: Date;
  createDate: Date;
  updateDate: Date;
  version: number;
}

export interface IChanceProps {
  chance: {
    data: IChance[];
    totalCount: number;
    pageNumber: number;
    amountPerPage: number;
  };
  chancesLoaded: boolean;
  handlerStatus: IHandlerStatus;
  user: any;
  onSetChance(data: any): void;
  chancesRequest(data: IRequestGetChance): void;
  createTicketRequest(data: ICreateTicketRequest): void;
  translate(key: string): string;
}

export interface IChanceState {
  currentChance: IChance;
  currentBetType: number;
  currentBetPrediction: string | IChanceBetAccurate;
  selectedCards: IChanceBetAccurate;
  chanceHistoryIsShown: boolean;
  price: number;
}

export interface IResult {
  first: number;
  second: number;
  third: number;
  fourth: number;
}

export interface IChanceBetAccurate {
  first?: number;
  second?: number;
  third?: number;
  fourth?: number;
}

export interface IRequestGetChance {
  id?: number;
  status?: number;
  pageNumber?: number;
  amountPerPage?: number;
  type?: number;
}

export interface IResponseGetChance {
  totalCount: number;
  pageNumber: number;
  amountPerPage: number;
  data: IChance[];
}

export interface ICard {
  cardNumber: string;
  currentCard: number;
  selectCard(cardNumber: string, selectedOption: string): void;
}

export interface ICardField {
  selectedCards: IChanceBetAccurate;
  selectCard(cardNumber: string, selectedOption: string): void;
}
