import React from "react";
import moment from "moment";
import Button from "./Button";
import { IHandlerStatus } from "../interfaces/IProfile";

interface IWeekFilterProps {
  timeFrom: Date;
  timeTo: Date;
  handlerStatus: IHandlerStatus;
  translate(key: string): string;
  onClickBack(): void;
  onClickNext(): void;
}

class WeekFilter extends React.Component<IWeekFilterProps> {
  render() {
    const { timeFrom, timeTo, onClickBack, onClickNext, translate } = this.props;

    return (
      <div className="week-filter">
        <Button className="btn gold-btn" type="button" onClick={onClickBack} disabled={this.props.handlerStatus.status === "loading"}>
          {translate("Back")}
        </Button>
        <div className="week-filter__date">{moment(timeFrom).format("LLLL")} - {moment(timeTo).format("LLLL")}</div>
        <Button className="btn gold-btn" type="button" onClick={onClickNext} disabled={this.props.handlerStatus.status === "loading"}>
          {translate("Next")}
        </Button>
      </div>
    );
  }
}

export default WeekFilter;
