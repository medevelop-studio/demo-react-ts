import React, { useEffect } from "react";
import { connect } from "react-redux";
import { IntlActions } from "react-redux-multilingual";
import Select from "react-select";

const body = document.querySelector("body") as HTMLElement;
localStorage.locale !== "he" ? (body.style.direction = "rtl") : (body.style.direction = "ltr");

interface ILocale {
  dispatch: any;
}

const Locale: React.FC<ILocale> = ({ dispatch }) => {
  const [locale, setLocale] = React.useState(localStorage.locale);
  // selectedOption.value === "he" ? body.classList.add("rtl") : body.classList.remove("rtl")
  localStorage.locale !== "he" ? (body.style.direction = "rtl") : (body.style.direction = "ltr");

  const selectLocale = (selectedOption) => {
    localStorage.locale = selectedOption.value;
    // selectedOption.value === "he" ? body.classList.add("rtl") : body.classList.remove("rtl")
    selectedOption.value !== "he" ? (body.style.direction = "rtl") : (body.style.direction = "ltr");
    setLocale(selectedOption.value);
    dispatch(IntlActions.setLocale(selectedOption.value));
  };

  useEffect(() => {
    const input: HTMLInputElement | null = document.querySelector("#select-locale input");

    input?.setAttribute("readonly", "readonly");
  }, []);

  if (!locale) {
    selectLocale({ value: "he" });
  }

  const customStyles = {
    control: (styles) => {
      return {
        ...styles,
        backgroundColor: "#0c0c0c",
        border: "2px solid #e6bc73 !important",
        borderRadius: "14px",
        boxShadow: "none !important",
        width: "92px",
        margin: "0",
      };
    },
    option: (styles, { isFocused }) => {
      return {
        ...styles,
        display: "flex",
        justifyContent: "center",
        backgroundColor: isFocused ? "#68522c" : "#e6bc73",
        cursor: "pointer",
      };
    },
    menu: (styles) => {
      return {
        ...styles,
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#0c0c0c",
        margin: "0 16px 0 16px",
        padding: 0,
        width: 60,
      };
    },
  };

  const options = [
    {
      value: "en",
      label: (
        <div>
          <img alt="EN" src={"assets/images/lang/en.png"} height="20px" width="auto" />
        </div>
      ),
    },
    {
      value: "ru",
      label: (
        <div>
          <img alt="RU" src={"assets/images/lang/ru.png"} height="20px" width="auto" />
        </div>
      ),
    },
    {
      value: "he",
      label: (
        <div>
          <img alt="HE" src={"assets/images/lang/he.png"} height="20px" width="auto" />
        </div>
      ),
    },
  ];

  return (
    <Select
      name="currentType"
      id="select-locale"
      value={{
        label: (
          <div>
            <img
              height="20px"
              width="auto"
              alt={"assets/images/lang/en.png"}
              src={"assets/images/lang/" + (locale ? locale : "en") + ".png"}
            />
          </div>
        ),
      }}
      onChange={selectLocale}
      styles={customStyles}
      options={options}
    />
  );
};

export default connect(null, (dispatch) => ({
  dispatch,
}))(Locale);
