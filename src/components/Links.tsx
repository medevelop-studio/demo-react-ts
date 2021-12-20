import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withTranslate } from "react-redux-multilingual";
import cn from "classnames";

import { profileLogout } from "../store/auth/actions";

import links from "../assets/links";
import { IProfile } from "../interfaces/IProfile";

interface ILinks {
  user: IProfile;
  locale: string;
  translate: (text: string) => string;
  profileLogout: () => void;
}

const Links: React.FC<ILinks> = (props) => {
  const renderLinks = () => {
    return links.map((link) => {
      if (link.permissionLevel <= props.user.permissionLevel && !(link.exclude.indexOf(props.user.permissionLevel) !== -1)) {
        return (
          <li key={link.title}>
            <Link to={link.link}>{props.translate(link.title) || link.title}</Link>
          </li>
        );
      }

      return false;
    });
  };

  const logout = () => {
    props.profileLogout();
  };

  return (
    <ul
      className={cn("menu-links", {
        "menu-links--rtl": props.locale === "he",
      })}
    >
      {renderLinks()}
      <li onClick={logout}>
        <span
          className={cn("menu-links__logout", {
            "menu-links__logout--rtl": props.locale === "he",
          })}
        >
          {props.translate("Logout")}
        </span>
      </li>
    </ul>
  );
};

const mapStateToProps = state => ({
  user: state.auth.user,
  locale: state.Intl.locale,
});

const mapDispatchToProps = {
  profileLogout
};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslate(Links));
