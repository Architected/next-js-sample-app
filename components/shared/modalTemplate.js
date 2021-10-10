import React from 'react';
import { Modal } from 'react-bootstrap';

export default function ModalTemplate({
  displayModal,
  modalTitle,
  handleClose,
  children,
}) {
  return (
    <Modal
      show={displayModal}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
}
