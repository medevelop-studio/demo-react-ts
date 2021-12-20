import React from "react";

const Timer = () => {
  const getCurrentTime = () => {
    const h = new Date().getHours();
    const m = new Date().getMinutes();

    return `${h < 10 ? `0${h}` : h}:${m < 10 ? `0${m}` : m}`;
  };

  const [time, setSeconds] = React.useState(getCurrentTime());

  React.useEffect(() => {
    let id = setInterval(() => {
      setSeconds(getCurrentTime());
    }, 1000);

    return () => clearInterval(id);
  }, []);

  return <>{time}</>;
};

export default Timer;
