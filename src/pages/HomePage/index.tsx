import React from "react";
import { connect } from "react-redux";
import { withTranslate } from "react-redux-multilingual";
import cn from "classnames";
import { Link } from "react-router-dom";

import { IHomePageProps, IHomePageState, IStoreHomePage } from "../../interfaces/IHomePage";
import { getTickerRequest } from "../../store/rules/actions";
import { TickerDictionary } from "../../common/dictionary";

class HomePage extends React.Component<IHomePageProps, IHomePageState> {
  
  state = {
    isAuthenticated: this.props.isAuthenticated,
    isMarquee: false,
  };

  getBannerLink(key: number): string {
    const links = [
      "/live-casino",
      "/slots",
      "/evolution-gaming"
    ];
    return links[key];
  }

  getBannerTitle(key: number): string {
    const titles = [
      "Live casino",
      "Slots",
      "Evolution Gaming"
    ];
    return titles[key];
  }

  componentDidMount(): void {
    if (this.props.isAuthenticated) {
      this.props.getTickerRequest({
        type: TickerDictionary.TICKER_TYPE_GAMBLING
      });
    }

    const mainContainer = document.getElementById("main-container") as HTMLElement;
    mainContainer.setAttribute("style", "display: block");

    // const swiper: any = new window.Swiper(".swiper-container", {
    //   pagination: {
    //     el: ".swiper-pagination"
    //   },
    //   autoplay: {
    //     delay: 5000
    //   },
    //   loop: true
    // });
  }

  componentDidUpdate(): void {
    if (this.props.isAuthenticated !== this.state.isAuthenticated) {
      this.setState({
        isAuthenticated: this.props.isAuthenticated
      });
    }

    if (this.props.isAuthenticated && !this.props.ticker) {
      this.props.getTickerRequest({
        type: TickerDictionary.TICKER_TYPE_GAMBLING
      });
    }

    if (this.props.isAuthenticated && this.props.ticker && !this.state.isMarquee) {
      $(".marquee").marquee({
        duration: 15000,
        gap: 50,
        delayBeforeStart: 0,
        direction: "left",
        duplicated: true,
        pauseOnHover: true,
        startVisible: true
      });

      this.setState({
        isMarquee: true,
      });
    }
  }

  componentWillUnmount(): void {
    const mainContainer = document.getElementById("main-container") as HTMLElement;
    mainContainer.setAttribute("style", "display: flex");
  }

  render(): JSX.Element {
    const { translate, isAuthenticated } = this.props;

    return (
      <>
        <div className="home-page">
          <div className="swiper-container" dir="ltr">
            <div className="swiper-wrapper">
              {["/assets/images/banner/casino_live_banner_bg.png",
                "/assets/images/banner/slots_banner_bg.png",
                "/assets/images/banner/evolution_banner_bg.jpg"
                ].map((item, i) => {
                return (
                  <div key={i} className="swiper-slide">
                    <Link to={this.getBannerLink(i)}>
                      <div className={cn("home__banner")}>
                        <div className="home__banner__text">
                          <h1>{this.getBannerTitle(i)}</h1>
                        </div>
                        <div className="btn home__banner__button-play">
                          {translate("Play")}
                        </div>
                        <img src="/assets/images/exampleS_logo.png" alt="" className="home__banner__logo"/>
                        <img src={item} alt="" />
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
            <div className="swiper-pagination" />
          </div>

          <div dir="ltr" className="marquee" style={{maxHeight: "35px"}}>
            {this.props.ticker?.text && JSON.parse(this.props.ticker.text)[localStorage.locale]
              ? JSON.parse(this.props.ticker.text)[localStorage.locale]
              : ""}
          </div>

          <div className="home__tiles">
            <div key={translate("Slots")} className={`home__page__tile home__page__tile_slots`}>
              {isAuthenticated ? (
                <>
                  <Link to={"/slots"}>
                    <div className="home__page__tile__inner">
                      <span>{translate("Slots")}</span>
                      <img src="/assets/images/gameTiles/slots_icon1.png" alt="" />
                    </div>
                  </Link>
                </>
              ) : (
                <Link to={"/"}>
                  <div className="home__page__tile__inner">
                    <span>{translate("Slots")}</span>
                    <img src="/assets/images/gameTiles/slots_icon1.png" alt="" />
                  </div>
                </Link>
              )}
            </div>

            <div key={translate("Live casino")} className={`home__page__tile home__page__tile_live_casino`}>
              {isAuthenticated ? (
                <>
                  <Link to={"/live-casino"}>
                    <div className="home__page__tile__inner">
                      <span>{translate("Live casino")}</span>
                      <img className="mobile-round" src="/assets/images/gameTiles/casino_icon1.png" alt="" />
                    </div>
                  </Link>
                </>
              ) : (
                <Link to={"/"}>
                  <div className="home__page__tile__inner">
                    <span>{translate("Live casino")}</span>
                    <img className="mobile-round" src="/assets/images/gameTiles/casino_icon1.png" alt="" />
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
};

const mapStateToProps = (state: IStoreHomePage) => ({
  isAuthenticated: state.auth.isAuthenticated,
  ticker: state.rules.ticker,
  tickerLoaded: state.rules.tickerLoaded,
});

const mapDispatchToProps = {
  getTickerRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslate(HomePage));
