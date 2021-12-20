import React from "react";
import { connect } from "react-redux";
import { withTranslate } from "react-redux-multilingual";
import { CSSTransition } from "react-transition-group";
import { chancesRequest, createTicketRequest, onSetChance } from "../../store/gamesTypes/actions";
import { Button, NoContent, Paginate, Table } from "../../components";
import { IHandlerStatus, IProfile } from "../../interfaces/IProfile";
import { IChanceProps, IChance, IChanceState, IChanceBetAccurate } from "../../interfaces/IChance";
import { gameDictionary } from "../../common/dictionary";
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
      type: 10,
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

  setResult = () => {
    this.props.onSetChance({ id: this.props.chance.data[0].id, data: this.state.selectedCards });
  };

  selectCard = (cardNumber: string, selectedOption: any): void => {
    this.setState({
      selectedCards: {
        ...this.state.selectedCards,
        [cardNumber]: Number(selectedOption.value),
      },
    });
  };

  handlePage = (pageNumber: number): void => {
    this.props.chancesRequest({
      status: gameDictionary.GAME_STATUS_ENDED,
      pageNumber,
      type: 10,
    });
  };

  switchHistory = (): void => {
    const { chanceHistoryIsShown } = this.state;

    if (chanceHistoryIsShown) {
      this.props.chancesRequest({
        status: gameDictionary.GAME_STATUS_STARTED,
        type: 10,
      });
    } else {
      this.props.chancesRequest({
        status: gameDictionary.GAME_STATUS_ENDED,
        type: 10,
      });
    }

    this.setState({
      chanceHistoryIsShown: !chanceHistoryIsShown,
    });
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render(): JSX.Element {
    const { chance, chancesLoaded, translate } = this.props;
    const { currentChance, chanceHistoryIsShown } = this.state;

    return (
      <>
        <div className="page-container">
          {chance.data[0] && (
            <Timer
              end={300000}
              start={chance.data[0].startDate}
              update={this.updateChance}
              message={translate("The next game will start through")}
            />
          )}
          <CSSTransition in={chancesLoaded} unmountOnExit={true} timeout={2000} classNames="modalWindowAnimation">
            <div className="chance">
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
                  <Button className="btn gold-btn" type="button" onClick={this.setResult}>
                    Set result
                  </Button>
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
  onSetChance,
};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslate(Chance));
