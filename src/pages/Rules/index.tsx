import React from "react";
import { connect } from "react-redux";
import { withTranslate } from "react-redux-multilingual";
import { CSSTransition } from "react-transition-group";

import { getRulesRequest, createRulesRequest, deleteRulesRequest } from "../../store/rules/actions";
import { TextEditor, Input, Button } from "../../components";
import { IRulesProps, IRulesState } from "../../interfaces/IRules";
import { GameTypeDictionary } from "../../common/dictionary";

class Rules extends React.Component<IRulesProps, IRulesState> {
  constructor(props) {
    super(props);

    this.state = {
      currentGameName: "",
      newGameName: "",
    };
  }

  componentDidMount(): void {
    this.props.getRulesRequest({
      gameType: GameTypeDictionary.GAME_TYPE_CASINO
    });
  }

  changeCurrentGameName = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value: string = event.target.value;
    
    this.setState({
      currentGameName: value
    });
  }

  changeNewGameName = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value: string = event.target.value;
    
    this.setState({
      newGameName: value
    });
  }

  deleteRule = (): void => {
    this.props.deleteRulesRequest({
      gameType: GameTypeDictionary.GAME_TYPE_CASINO,
      gameName: this.state.currentGameName,
    });

    this.setState({
      currentGameName: "",
      newGameName: "",
    });
  }

  createRule = (data: any): void => {
    this.props.createRulesRequest(data);

    this.setState({
      currentGameName: data.newGameName ? data.newGameName : data.currentGameName,
      newGameName: "",
    });
  }

  render(): JSX.Element {
    const { currentGameName, newGameName } = this.state;
    const { rules, rulesLoaded, translate } = this.props;

    return (
      <>
        <div className="rules logos-page page-container">
          <CSSTransition in={rulesLoaded} unmountOnExit={true} timeout={2000} classNames="modalWindowAnimation">
            <>
              <div className="rules__head">
                <Input
                  className="input gold-input"
                  placeholder={translate("Game")}
                  type="text"
                  name="currentGameName"
                  error={""}
                  value={currentGameName}
                  onChange={this.changeCurrentGameName}
                />
                <Input
                  className="input gold-input"
                  placeholder={translate("New Game Name")}
                  type="text"
                  name="newGameName"
                  error={""}
                  value={newGameName}
                  onChange={this.changeNewGameName}
                />
                <Button className="btn gold-btn" type="button" onClick={this.deleteRule}>
                  {this.props.translate("Delete")}
                </Button>
              </div>
              <TextEditor
                currentGameName={currentGameName}
                newGameName={newGameName}
                currentGameType={GameTypeDictionary.GAME_TYPE_CASINO}
                rules={rules}
                createRulesRequest={this.createRule}
                translate={translate}
              />
            </>
          </CSSTransition>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  rules: state.rules.rules,
  rulesLoaded: state.rules.rulesLoaded
});

const mapDispatchToProps = {
  getRulesRequest,
  createRulesRequest,
  deleteRulesRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslate(Rules));
