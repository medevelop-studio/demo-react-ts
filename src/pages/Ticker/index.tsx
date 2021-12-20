import React from "react";
import { connect } from "react-redux";
import { withTranslate } from "react-redux-multilingual";
import { CSSTransition } from "react-transition-group";
import { ITickerProps, ITickerText, ITicker, ITickerState } from "../../interfaces/IRules";
import { getTickerRequest, createTickerRequest } from "../../store/rules/actions";
import { TickerDictionary } from "../../common/dictionary";
import { Input, Button } from "../../components";
import { IHandlerStatus } from "../../interfaces/IProfile";

class Ticker extends React.Component<ITickerProps, ITickerState> {

  constructor(props) {
    super(props);

    this.state = {
      text: "",
      isTickerTextGet: false
    };
  }

  componentDidMount(): void {
    this.props.getTickerRequest({
      type: TickerDictionary.TICKER_TYPE_GAMBLING
    });
  }

  componentDidUpdate(): void {
    if (
      this.props.ticker?.text
      && JSON.parse(this.props.ticker.text)[localStorage.locale]
      && JSON.parse(this.props.ticker.text)[localStorage.locale] !== this.state.text
      && !this.state.isTickerTextGet
    ) {
      this.setState({
        text: JSON.parse(this.props.ticker.text)[localStorage.locale],
        isTickerTextGet: true
      });
    }
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      text: event.target.value
    });
  };

  onClick = () => {
    const tickers: ITickerText = this.props.ticker
      ? typeof JSON.parse(this.props.ticker.text) === "object"
        ? JSON.parse(this.props.ticker.text)
        : {}
      : {};
    tickers[localStorage.locale] = this.state.text;

    this.props.createTickerRequest({
      type: TickerDictionary.TICKER_TYPE_GAMBLING,
      text: JSON.stringify(tickers)
    })
  }

  render(): JSX.Element {
    const { tickerLoaded, translate } = this.props;

    return (
      <>
        <div className="page-container">
          <CSSTransition in={tickerLoaded} unmountOnExit={true} timeout={2000} classNames="modalWindowAnimation">
          <div className="ticker">
            <Input
              className="input gold-input input-filter-login"
              type="text"
              name="tickerText"
              error={""}
              value={this.state.text}
              onChange={this.handleChange}
            />
            <Button className="btn gold-btn" type="button" onClick={this.onClick}>
              {translate("Change")}
            </Button>
          </div>
          </CSSTransition>
        </div>
      </>
    );
  }
}

interface IStoreState {
  rules: {
    ticker: ITicker;
    tickerLoaded: boolean;
  };
  manageHandlers: {
    handlerStatus: IHandlerStatus;
  };
  usersLoaded: boolean;
};

const mapStateToProps = (state: IStoreState) => ({
  ticker: state.rules.ticker,
  tickerLoaded: state.rules.tickerLoaded,
  handlerStatus: state.manageHandlers.handlerStatus,
});

const mapDispatchToProps = {
  getTickerRequest,
  createTickerRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslate(Ticker));
