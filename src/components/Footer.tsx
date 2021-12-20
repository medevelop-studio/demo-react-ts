import React from "react";
import { Link } from "react-router-dom";
import { withTranslate } from "react-redux-multilingual";

interface IFooter {
  translate: (text: string) => string
}

const Footer: React.FC<IFooter> = props => {
  return (
    <footer>
      <div className="footer__inner">
        <div className="left-side">
          <Link to="/">{props.translate("Terms and conditions")}</Link>
          <Link to="/rule-list">{props.translate("How to Play")}</Link>
          <Link to="/">{props.translate("Info")}</Link>
        </div>

        <div className="right-side">
          <a href="mailto:examplesc@gmail.com">examplesc@gmail.com</a>
          <Link to="/">{props.translate("Contact Us")}</Link>
        </div>
      </div>
    </footer>
  );
};

export default withTranslate(Footer);
