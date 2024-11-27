import PropTypes from "prop-types";

import Modal from "snibix-modal";
import closeModal from "../assets/close.svg";

function MessageModal({ isOpen, close, className, title }) {
  return (
    <Modal className={className} isOpen={isOpen} close={close}>
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
  className: PropTypes.string,
  title: PropTypes.string,
};

export default MessageModal;
