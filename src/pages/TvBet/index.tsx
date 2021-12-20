import React from "react";
import { connect } from "react-redux";
import { withTranslate } from "react-redux-multilingual";

import { userTokenRequest, closeGameRequest } from "../../store/tvBet/actions"
import { ITvBetProps, ITvBetState } from "../../interfaces/ILiveCasino";

declare function TvbetFrame(config: any): void;

class TvBet extends React.Component<ITvBetProps,ITvBetState> {
  
  state = {
    frameIsLoaded: false,
  }

  componentDidMount(): void {
    this.props.userTokenRequest();
  }

  componentDidUpdate(): void {
    if (this.props.userToken && !this.state.frameIsLoaded) {
      const script = document.createElement("script");

      script.src = "https://tvbetframe17.com/assets/frame.js";
      script.async = true;
      script.onload = () => this.tvBetScriptLoaded();
      document.body.appendChild(script);

      this.setState({
        frameIsLoaded: true,
      });
    }
  }

  componentWillUnmount(): void {
    const sidebar: HTMLElement | null = document.querySelector(".sidebar");
  
    if (sidebar) {
      delete sidebar.style.display;
      sidebar.style.display = "block";
    }
  
    this.props.closeGameRequest();
  }

  tvBetScriptLoaded(): void {
    // eslint-disable-next-line
    const frame = new TvbetFrame({
      'lng'        : localStorage.locale,
      'clientId'   : 1812,
      'tokenAuth'  : this.props.userToken,
      'server'     : "https://tvbetframe17.com",
      'containerId': 'tvbet-frame',
    });
  }

  render(): JSX.Element {
    const sidebar: HTMLElement | null = document.querySelector(".sidebar");
    const pageContainer: HTMLElement | null = document.querySelector(".tvbet-page");

    if (sidebar) {
      sidebar.style.display = "none";

      if (pageContainer) {
        pageContainer.style.width = "100%";
      }
    }

    return (
      <div className="page-container tvbet-page">
        <div id="tvbet-frame" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  userToken: state.tvBet.userToken
});

const mapDispatchToProps = {
  userTokenRequest,
  closeGameRequest,
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslate(TvBet));
