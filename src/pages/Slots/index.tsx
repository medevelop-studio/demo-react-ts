import React from "react";
import { connect } from "react-redux";
import { withTranslate } from "react-redux-multilingual";
// import { Link } from "react-router-dom";

import { ISlotsPageProps, ISlotsPageState, IStoreSlotsPage } from "../../interfaces/ISlots";

class Slots extends React.PureComponent<ISlotsPageProps, ISlotsPageState> {
  state = {
    isAuthenticated: this.props.isAuthenticated
  };

  componentDidUpdate(): void {
    if (this.props.isAuthenticated !== this.state.isAuthenticated) {
      this.setState({
        isAuthenticated: this.props.isAuthenticated
      });
    }
  }

  render(): JSX.Element {
    const { translate } = this.props;

    return (
      <>
        <div className="page-container live-casino__page">
          <h1>{translate("Games will be available very soon")}</h1>
          {/* <div className="home__tiles">
            <div key={translate("SportBoost Slots")} className={`home__page__tile home__page__tile_tvbet`}>
              {isAuthenticated ? (
                <>
                  <Link to={"/sportboost-slots"}>
                    <img src="/assets/images/gameTiles/slots.png" alt="" />
                    <span>{translate("SportBoost Slots")}</span>
                  </Link>
                </>
              ) : (
                <div>
                  <img src="/assets/images/gameTiles/slots.png" alt="" />
                  <span>{translate("SportBoost Slots")}</span>
                </div>
              )}
            </div>

            <div key={translate("BS Slots")} className={`home__page__tile home__page__tile_evo`}>
              {isAuthenticated ? (
                <>
                  <Link to={"/bs-slots"}>
                    <img src="/assets/images/gameTiles/slots.png" alt="" />
                    <span>{translate("BS Slots")}</span>
                  </Link>
                </>
              ) : (
                <div>
                  <img src="/assets/images/gameTiles/slots.png" alt="" />
                  <span>{translate("BS Slots")}</span>
                </div>
              )}
            </div>

            <div key={translate("Novo Slots")} className={`home__page__tile home__page__tile_evo`}>
              {isAuthenticated ? (
                <>
                  <Link to={"/novo-slots"}>
                    <img src="/assets/images/gameTiles/slots.png" alt="" />
                    <span>{translate("Novo Slots")}</span>
                  </Link>
                </>
              ) : (
                <div>
                  <img src="/assets/images/gameTiles/slots.png" alt="" />
                  <span>{translate("Novo Slots")}</span>
                </div>
              )}
            </div>

            <div key={translate("NuxBet Slots")} className={`home__page__tile home__page__tile_evo`}>
              {isAuthenticated ? (
                <>
                  <Link to={"/nux-slots"}>
                    <img src="/assets/images/gameTiles/slots.png" alt="" />
                    <span>{translate("NuxBet Slots")}</span>
                  </Link>
                </>
              ) : (
                <div>
                  <img src="/assets/images/gameTiles/slots.png" alt="" />
                  <span>{translate("NuxBet Slots")}</span>
                </div>
              )}
            </div> 
          </div> */}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state: IStoreSlotsPage) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, null)(withTranslate(Slots));
