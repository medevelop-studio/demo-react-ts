import React from "react";

import Preloader from "./Preloader";

interface IButton {
  disabled?: boolean,
  children: string,
  className: string,
  type?: "button" | "submit" | "reset" | undefined,
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const Button: React.FC<IButton> = props => {
  return (
    <button {...props}>
      {props.disabled && (
        <Preloader />
      )}
      <div
        style={{
          opacity: props.disabled ? 0 : 1
        }}
      >
        {props.children}
      </div>
    </button>
  );
};

export default React.memo(Button);
