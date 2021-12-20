import React from "react";
import { CSSTransition } from "react-transition-group";
import cn from "classnames";

import Links from "../Links";
import { IProfile } from "../../interfaces/IProfile";

interface IMobileMenu {
  user: IProfile;
  isOpen: boolean;
  profileLogout(): void;
  translate(key: string): string;
  switchMobileMenu(): void;
}

const MobileMenu: React.FC<IMobileMenu> = (props) => {
  return (
    <CSSTransition
      in={props.isOpen}
      unmountOnExit={true}
      timeout={200}
      classNames={cn({
        "modalWindowAnimation--rtl": localStorage.locale === "he",
        modalWindowAnimation: localStorage.locale !== "he",
      })}
    >
      <div className="mobile-menu" onClick={props.switchMobileMenu}>
        <div
          className={cn({
            "mobile-menu__inner": localStorage.locale !== "he",
            "mobile-menu__inner--rtl": localStorage.locale === "he",
          })}
        >
          <Links />
        </div>
      </div>
    </CSSTransition>
  );
};

export default MobileMenu;
