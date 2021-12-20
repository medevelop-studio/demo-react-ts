import React, { Component } from "react";
import moment from "moment";
import { withTranslate } from "react-redux-multilingual";

interface Props {
  start: Date;
  update?: () => void;
  message?: string;
  translate: (str: string) => string;
  end: number;
}

interface State {
  hours: number;
  minutes: number;
  seconds: number;
}

class Timer extends Component<Props, State> {
  private timer;

  state = {
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  componentDidMount() {
    const s = moment(Date.now());
    const e = moment(new Date(this.props.start).getTime() + this.props.end);
    const diff = e.diff(s, "second");
    const h = Math.floor(diff / 3600);
    const m = Math.floor((diff - 3600 * h) / 60);
    const sec = Math.floor(diff - 3600 * h - 60 * m);

    this.setState({
      hours: h,
      minutes: m,
      seconds: sec,
    });

    this.timer = setInterval(() => {
      const { hours, minutes, seconds } = this.state;
      if (seconds > 0) {
        this.setState({ seconds: seconds - 1 });
      }
      if (seconds === 0) {
        this.setState({ seconds: 59, minutes: minutes - 1 });
      }
      if (minutes === 0 && hours > 0) {
        this.setState({ hours: hours - 1, minutes: 59, seconds: 59 });
      }
      if (minutes === 0 && hours === 0 && seconds === 0) {
        this.setState({ hours: 0, minutes: 0, seconds: 0 });
        clearInterval(this.timer);
        if (this.props.update) {
          this.props.update();
        }
      }
    }, 1000);
  }

  getDateParams = (date: Date) => {
    const cunnterDate = new Date(date);
    const seconds = cunnterDate.getSeconds();
    const minutes = cunnterDate.getMinutes();
    const hours = cunnterDate.getHours();

    return {
      hours,
      minutes,
      seconds,
    };
  };

  getTimerRange = (start: Date) => {
    const startParams = this.getDateParams(start);
    const endParams = this.getDateParams(new Date(Date.now()));

    return {
      hours: startParams.hours - endParams.hours,
      minutes: startParams.minutes - endParams.minutes,
      seconds: startParams.seconds - endParams.seconds,
    };
  };

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { hours, minutes, seconds } = this.state;
    const { message, translate } = this.props;
    if (hours < 0 || minutes < 0 || seconds < 0) {
      return <div className="timer">{translate("Wait")}...</div>;
    }
    return (
      <div className="timer">
        {message}
        {"  "}
        {hours}:{minutes > 9 ? minutes : `0${minutes}`}:{seconds > 9 ? seconds : `0${seconds}`}
      </div>
    );
  }
}

export default withTranslate(Timer);
