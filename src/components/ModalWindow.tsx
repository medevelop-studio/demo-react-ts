import React, { Component } from "react";
import ReactDOM from "react-dom";
import cn from "classnames";

const modalRoot = document.getElementById("modal-root") as HTMLElement;
const roolEl = document.createElement("div");

interface IModalWindowProps {
  className?: string,
  dataModal?: string,
  closeModal: (e: React.MouseEvent<HTMLElement>) => void
}

class ModalWindow extends Component<IModalWindowProps> {
  componentDidMount() {
    modalRoot.appendChild(roolEl);
  }

  componentWillUnmount() {
    modalRoot.removeChild(roolEl);
  }

  closeModal = e => {
    if (!this.props.closeModal) {
      return;
    }

    const el = e.target.classList[0];
    if (el === "modal-window" || el === "modal-container") {
      this.props.closeModal(e);
    }
  };

  render() {
    return ReactDOM.createPortal(
      <div className={cn(`modal-window`, this.props.className)} data-modal={this.props.dataModal} onMouseDown={this.closeModal}>
        <div className="modal-container">{this.props.children}</div>
      </div>,
      roolEl
    );
  }
}

export default ModalWindow;
