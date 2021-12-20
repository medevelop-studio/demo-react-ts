import React from "react";
import { connect } from "react-redux";
import { withTranslate } from "react-redux-multilingual";
import { NotificationContainer, NotificationManager } from "react-notifications";

interface INotificationsProps {
  manageHandlers: {
    handlerStatus: {
      status: string,
      message: string
    }
  }
}

interface INotificationsState {
  handlerStatus: {
    status: string,
    message: string
  }
}

class Notifications extends React.PureComponent<INotificationsProps, INotificationsState> {
  state = {
    handlerStatus: {
      status: "",
      message: ""
    }
  };

  componentDidMount() {
    window.NotificationManager = NotificationManager;
  }

  componentDidUpdate() {
    const { handlerStatus } = this.props.manageHandlers;

    this.createNotification(handlerStatus);
  }

  createNotification = type => {
    switch (type.status) {
      // case "info":
      //   NotificationManager.info("Info message");
      //   break;
      case "success":
        NotificationManager.success("", type.message, 3000);
        break;
      // case "warning":
      //   NotificationManager.warning("Warning message", "Close after 3000ms", 3000);
      //   break;
      case "error":
        Array.isArray(type.message)
          ? (type.message.forEach(error => {
            if (error.constraints) {
              NotificationManager.error("", JSON.stringify(error.constraints), 5000);
            } else {
              NotificationManager.error("", error, 5000);
            }
          }))
          : NotificationManager.error("", type.message, 5000);
        break;
    }
  };

  render() {
    return (
      <div>
        <NotificationContainer />
      </div>
    );
  }
}

export default connect(
  (state: any) => ({
    manageHandlers: state.manageHandlers
  }),
  {}
)(withTranslate(Notifications));
