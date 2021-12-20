import React from "react";
import { connect } from "react-redux";
import { withTranslate } from "react-redux-multilingual";
import { CSSTransition } from "react-transition-group";
import { chancesRequest, createTicketRequest } from "../../store/gamesTypes/actions";
import { Button, NoContent, Paginate, Table } from "../../components";
import { IHandlerStatus, IProfile } from "../../interfaces/IProfile";
import { IChanceProps, IChance, IChanceState, IChanceBetAccurate } from "../../interfaces/IChance";
import { gameDictionary, ChanceDictionary } from "../../common/dictionary";
import MakeBetForm from "../../components/Forms/MakeBetForm/Form";
import CardField from "../SpeedChance/CardField";
import chanceData from "../../assets/tableTemplates/chance";
import Timer from "../../components/Timer";

class Chance extends React.Component<IChanceProps, IChanceState> {
  private interval;

  constructor(props) {
    super(props);

    this.state = {
      currentChance: {} as IChance,
      currentBetType: 0,
      currentBetPrediction: "",
      selectedCards: {},
      chanceHistoryIsShown: false,
      price: 0,
    };
  }

  static getDerivedStateFromProps(props, state): any {
    if (!state.chanceHistoryIsShown) {
      let currentChance: IChance | null;

      if (props.chance.data.length === 0) {
        currentChance = null;
      } else {
        const sortedChances: IChance[] = props.chance.data.sort((first, second) => {
          return second.startTime - first.startTime;
        });

        currentChance = sortedChances[0];
      }
      return {
        currentChance,
      };
    } else {
      return null;
    }
  }

  componentDidMount(): void {
    this.updateChance();
    this.interval = setInterval(() => {
      this.updateChance();
    }, 30000);
  }

  updateChance = () => {
    this.props.chancesRequest({
      status: gameDictionary.GAME_STATUS_STARTED,
      type: 9,
    });
  };

  selectBet = (event: any, type: number, prediction: string | IChanceBetAccurate) => {
    document.querySelector(".chance__button_active")?.classList.remove("chance__button_active");
    event.currentTarget.classList.add("chance__button_active");
    this.setState({
      currentBetType: type,
      currentBetPrediction: prediction,
    });
  };

  onSubmit = (input: any): void => {
    const { currentBetType, currentBetPrediction, currentChance, selectedCards } = this.state;

    if (currentBetType === 0) {
      return window.NotificationManager.error("You must select type of bet.");
    }

    if (currentBetType === ChanceDictionary.CHANCE_BET_TYPE_ACCURATE_PREDICTION && typeof currentBetPrediction === "object") {
      let amountOfSelectedCards = 0;

      for (const card in selectedCards) {
        if (selectedCards[card] > 0) {
          amountOfSelectedCards++;
        }
      }

      if (amountOfSelectedCards === 0) {
        return window.NotificationManager.error("You must select 1 card.");
      }
    }

    if (Number(input.betAmount) <= 0) {
      return window.NotificationManager.error("Bet amount must be more than 0.");
    }

    if (Object.keys(selectedCards).length > 2) {
      return window.NotificationManager.error("You must choose only 2 cards.");
    }

    this.props.createTicketRequest({
      values: {
        chanceId: currentChance.id,
        betChance: JSON.stringify({
          type: currentBetType,
          data: currentBetType === ChanceDictionary.CHANCE_BET_TYPE_ACCURATE_PREDICTION ? selectedCards : currentBetPrediction,
        }),
        price: Number(input.betAmount),
      },
      type: gameDictionary.GAME_TYPE_CHANCE,
    });
  };

  selectCard = (cardNumber: string, selectedOption: any): void => {
    const { selectedCards } = this.state;
    if (Number(selectedOption.value) === 0) {
      delete selectedCards[cardNumber];
      this.setState({ selectedCards });
    } else {
      this.setState({
        selectedCards: {
          ...selectedCards,
          [cardNumber]: Number(selectedOption.value),
        },
      });
    }
  };

  handlePage = (pageNumber: number): void => {
    this.props.chancesRequest({
      status: gameDictionary.GAME_STATUS_ENDED,
      pageNumber,
      type: 9,
    });
  };

  switchHistory = (): void => {
    const { chanceHistoryIsShown } = this.state;

    if (chanceHistoryIsShown) {
      this.props.chancesRequest({
        status: gameDictionary.GAME_STATUS_STARTED,
        type: 9,
      });
    } else {
      this.props.chancesRequest({
        status: gameDictionary.GAME_STATUS_ENDED,
        type: 9,
      });
    }

    this.setState({
      chanceHistoryIsShown: !chanceHistoryIsShown,
    });
  };

  handleChange = (price: number) => {
    this.setState({ price });
  };

  calculationOfWinnings = () => {
    const { selectedCards, price, currentBetType } = this.state;
    const length = Object.keys(selectedCards).length;
    if (currentBetType === 1) {
      if (length === 1) {
        return ChanceDictionary.CHANCE_BET_TYPE_ONE * price;
      }
      if (length === 2) {
        return ChanceDictionary.CHANCE_BET_TYPE_TWO * price;
      }
    } else if (currentBetType === 2 || currentBetType === 3) {
      return price * 2;
    }
    return price;
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render(): JSX.Element {
    const { chance, chancesLoaded, translate, handlerStatus } = this.props;
    const { currentChance, selectedCards, chanceHistoryIsShown } = this.state;

    return (
      <>
        <div className="page-container">
          {chance.data[0] && (
            <div className="timerSection">
              <Timer 
                end={7200000}
                start={chance.data[0].startDate} 
                update={this.updateChance} 
                message={translate("The next game will start through")} />
            </div>
          )}
          <CSSTransition in={chancesLoaded} unmountOnExit={true} timeout={2000} classNames="modalWindowAnimation">
            <div className="chance">
              <div className="chance__switch-button">
                <Button className="btn gold-btn" type="button" onClick={this.switchHistory}>
                  {translate("Show/Hide History")}
                </Button>
              </div>
              {chanceHistoryIsShown ? (
                chance && chance.data && chance.data.length > 0 ? (
                  <div className="chance__history">
                    <Table
                      tableData={{
                        ...chanceData,
                        body: chance.data,
                      }}
                    />
                    <Paginate pageCount={chance.totalCount / chance.amountPerPage} handlePage={this.handlePage} />
                  </div>
                ) : (
                  <NoContent translate={translate} />
                )
              ) : currentChance ? (
                <div className="chance__play">
                  <CardField selectedCards={this.state.selectedCards} selectCard={this.selectCard} />
                  <div className="chance__bet-type">
                    <Button
                      className="btn gold-btn chance__button"
                      type="button"
                      onClick={(event) =>
                        this.selectBet(
                          event,
                          ChanceDictionary.CHANCE_BET_TYPE_MORE_LESS_PREDICTION,
                          ChanceDictionary.CHANCE_MORE_LESS_PREDICTION_MORE
                        )
                      }
                    >
                      {translate("more")}
                    </Button>
                    <Button
                      className="btn gold-btn chance__button"
                      type="button"
                      onClick={(event) =>
                        this.selectBet(
                          event,
                          ChanceDictionary.CHANCE_BET_TYPE_MORE_LESS_PREDICTION,
                          ChanceDictionary.CHANCE_MORE_LESS_PREDICTION_LESS
                        )
                      }
                    >
                      {translate("less")}
                    </Button>
                    <Button
                      className="btn gold-btn chance__button"
                      type="button"
                      onClick={(event) =>
                        this.selectBet(
                          event,
                          ChanceDictionary.CHANCE_BET_TYPE_PARITY_PREDICTION,
                          ChanceDictionary.CHANCE_PARITY_PREDICTION_ODD
                        )
                      }
                    >
                      {translate("odd")}
                    </Button>
                    <Button
                      className="btn gold-btn chance__button"
                      type="button"
                      onClick={(event) =>
                        this.selectBet(
                          event,
                          ChanceDictionary.CHANCE_BET_TYPE_PARITY_PREDICTION,
                          ChanceDictionary.CHANCE_PARITY_PREDICTION_EVEN
                        )
                      }
                    >
                      {translate("even")}
                    </Button>
                    <Button
                      className="btn gold-btn chance__button"
                      type="button"
                      onClick={(event) => this.selectBet(event, ChanceDictionary.CHANCE_BET_TYPE_ACCURATE_PREDICTION, selectedCards)}
                    >
                      {translate("Special")}
                    </Button>
                  </div>
                  <div className="compared-value">
                    {"*"}
                    {translate("Compared value")} {": "} {String(ChanceDictionary.CHANCE_MORE_LESS_PREDICTION_COMPARED_VALUE)}
                  </div>
                  <div className="compared-value">
                    {translate("Possible gain")} {this.calculationOfWinnings()}
                  </div>
                  <MakeBetForm
                    handleChange={this.handleChange}
                    className="chance__form"
                    onSubmit={this.onSubmit}
                    handlerStatus={handlerStatus}
                    translate={translate}
                  />
                </div>
              ) : (
                <NoContent translate={translate} />
              )}
            </div>
          </CSSTransition>
        </div>
      </>
    );
  }
}

interface IStoreState {
  auth: {
    user: IProfile;
  };
  gamesTypes: {
    chance: {
      games: {
        data: IChance[];
      };
      chancesLoaded: boolean;
    };
  };
  manageHandlers: {
    handlerStatus: IHandlerStatus;
  };
}

const mapStateToProps = (state: IStoreState) => ({
  user: state.auth.user,
  chance: state.gamesTypes.chance.games,
  chancesLoaded: state.gamesTypes.chance.chancesLoaded,
  handlerStatus: state.manageHandlers.handlerStatus,
});

const mapDispatchToProps = {
  chancesRequest,
  createTicketRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslate(Chance));
