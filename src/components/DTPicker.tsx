import React from "react";
import cn from "classnames";
import DatePicker from "react-datepicker";

export interface IDateOnChangeParams {
  date: number,
  dateUTC: number
}

interface IDTPicker {
  value: string,
  error: string,
  placeholderText: string,
  showTimeSelect: boolean,
  dateFormat?: string,
  type: number | string,
  onChange: (dates: IDateOnChangeParams, type: number | string) => void 
}

const DTPicker: React.FC<IDTPicker> = props => {
  const [startDate, setStartDate] = React.useState(props.value ? new Date(props.value).getTime() : null);
  const inputRef: any = React.useRef(null);

  const closeDatePicker = e => {
    if (e.target.id === "react-datepicker-popper__wrapper") {
      inputRef.current.setOpen(false);
    }
  };

  const MyContainer = ({ className, children }) => {
    return (
      <div id="react-datepicker-popper__wrapper" onClick={e => closeDatePicker(e)}>
        <div className={className}>{children}</div>
      </div>
    );
  };

  return (
    <div
      className={cn("datepicker__input", {
        datepicker__input__error: props.error
      })}
    >
      <DatePicker
        onChange={e => {
          const timezone = new Date(e).getTimezoneOffset();
          const diffTime = 3600 * (-timezone / 60) * 1000;

          const dateUTC = Math.floor((new Date(e).getTime() + diffTime) / 1000);
          const date = Math.floor(new Date(e).getTime() / 1000);

          setStartDate(e);
          props.onChange({ date, dateUTC }, props.type);
        }}
        ref={inputRef}
        calendarContainer={MyContainer}
        selected={startDate}
        timeIntervals={15}
        timeFormat="HH:mm"
        placeholderText={props.placeholderText || "DD/MM/YYYY HH:MM"}
        showTimeSelect={props.showTimeSelect === undefined ? true : props.showTimeSelect}
        dateFormat={props.dateFormat || "dd.MM.yyyy HH:mm"}
      />
    </div>
  );
};

export default DTPicker;
