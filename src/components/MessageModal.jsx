import PropTypes from "prop-types";

import Modal from "snibix-modal";
import closeModal from "../assets/close.svg";

function MessageModal({ isOpen, close, title }) {
  return (
    <Modal className="modal-backdrop" isOpen={isOpen} close={close}>
      <div className="modal-content">
        <h2 className="title-modal">{title}</h2>
        <button className="button-close-modal" onClick={close}>
          <img className="close-modal" src={closeModal} alt="close modal" />
        </button>
      </div>
    </Modal>
  );
}

MessageModal.propTypes = {
  isOpen: PropTypes.bool,
  close: PropTypes.func,
  title: PropTypes.string,
};

export default MessageModal;
