import React from "react";
import Modal from 'react-bootstrap/Modal';

function ModalOpen(props) {
    
  return (
    <div>
      <Modal
        show={props.show} onHide={props.onHide}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Are You Sure ?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            You entered <span className="text-primary">{props.email}</span> and <span className="text-primary">{props.contact}</span> details.
          </div>
          <div>
            Are you sure to proceed with these details?
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary me-1" onClick={props.handleconfirm}>Yes, sure</button>
          <button className="btn btn-outline-dark me-1" onClick={props.onHide}>Cancel</button>
        </Modal.Footer>
      </Modal> 
    </div>
  );
}

export default ModalOpen;
