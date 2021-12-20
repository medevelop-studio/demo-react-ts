import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withTranslate } from "react-redux-multilingual";
import { CSSTransition } from "react-transition-group";

import { getRulesRequest } from "../../store/rules/actions";
import { GameTypeDictionary } from "../../common/dictionary";
import { IRuleListProps } from "../../interfaces/IRules";

const RuleList: React.FC<IRuleListProps> = ({ getRulesRequest, translate, rules, rulesLoaded }) => {
  useEffect(() => {
    getRulesRequest({
      gameType: GameTypeDictionary.GAME_TYPE_CASINO,
    });
  }, [getRulesRequest]);

  return (
    <div className="rule-list logos-page page-container">
      <CSSTransition in={rulesLoaded} unmountOnExit={true} timeout={2000} classNames="modalWindowAnimation">
        <div className="rule-list__content">
          <h1 className="rule-list__title">{translate("Rules")}</h1>
          <ul className="rule-list__list">
            {rules.map((rule, i) => {
              return JSON.parse(rule.text)[localStorage.locale] ? (
                <li key={i} className="rule-list__item">
                  <h2 className="rule-list__item-title">{rule.gameName}</h2>
                  <div
                    className="rule-list__item-text"
                    dangerouslySetInnerHTML={{
                      __html: JSON.parse(rule.text)[localStorage.locale],
                    }}
                  />
                </li>
              ) : (
                ""
              );
            })}
          </ul>
        </div>
      </CSSTransition>
    </div>
  );
};

const mapStateToProps = (state) => ({
  rules: state.rules.rules,
  rulesLoaded: state.rules.rulesLoaded,
});

const mapDispatchToProps = {
  getRulesRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslate(RuleList));
