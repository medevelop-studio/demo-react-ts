import React from "react";
import cn from "classnames";

interface IInput {
  className: string,
  type: "text" | "password" | "hidden" | "login" ,
  value?: string | number,
  defaultValue?: string | number,
  placeholder?: any,
  name?: string,
  error: number | string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
  onFocus?: (e?: any) => void
}

const Input: React.FC<IInput> = props => {
  return (
    <div
      className={cn("input-field", {
        "input-field__error": props.error
      })}
    >
      <input {...props} />
    </div>
  );
};

export default Input;
