import { IGetTickerRequest, ITicker } from "./IRules";

export interface IHomePageProps {
  isAuthenticated: boolean;
  ticker: ITicker;
  tickerLoaded: boolean;
  getTickerRequest(data: IGetTickerRequest): void;
  translate(text: string): string;
}

export interface IHomePageState {
  isAuthenticated: boolean;
  isMarquee: boolean;
}

export interface IStoreHomePage {
  auth: {
    isAuthenticated: boolean;
  };
  rules: {
    ticker: ITicker;
    tickerLoaded: boolean;
  };
}
