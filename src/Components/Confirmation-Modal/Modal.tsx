import "./Modal.css";
import { useEffect } from "react";
import { RcModalType } from "./types";
const RcModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmBtnTitle,
  rejectBtnTitle,
  setState,
}: RcModalType) => {
  //below useEffect is to remove the modal from page if user navigates to previous page
  useEffect(() => {
    if (isOpen === true) {
      window.onpopstate = () => {
        setState({ isOpen: false });
      };
    }
    if (isOpen === false) {
      window.onpopstate = null;
    }
  }, [isOpen, setState]);

  // below useEffect is to freeze the screen if modal is open.
  useEffect(() => {
    const body = document.documentElement;
    if (isOpen) {
      body.setAttribute(
        "style",
        "overflow-y: hidden; position: absolute; width: 100%; top: 0px;"
      );
    } else {
      body.setAttribute(
        "style",
        "overflow-y: overlay; position: initial; width: auto; top: initial;"
      );
    }
  }, [isOpen]);

  return (
    <div
      onClick={() => onClose()}
      className={
        isOpen
          ? "rc-modal-container rc-modal-container-visible"
          : "rc-modal-container"
      }
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
          return null;
        }}
        className="rc-modal"
      >
        <h1 className="rc-modal-heading">{title}</h1>
        <p className="rc-modal-text">{description}</p>
        <div className="rc-btns-container">
          <button onClick={() => onConfirm()} className="rc-btn-confirm">
            {confirmBtnTitle ? confirmBtnTitle : "Yes"}
          </button>
          <button onClick={() => onClose()} className="rc-btn-cancel">
            {rejectBtnTitle ? rejectBtnTitle : "No"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RcModal;
