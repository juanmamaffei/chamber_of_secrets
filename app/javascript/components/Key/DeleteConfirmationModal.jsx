import React from 'react'
import { Modal, Button } from 'react-bootstrap'

const DeleteConfirmationModal = ({showDelModal, handleDelete, idForDelete, setIdForDelete, setShowDelModal}) => {
    
    return(
        <Modal
            show={showDelModal}
            onHide={()=> setShowDelModal(false)}
            >
            <Modal.Header closeButton>
                <Modal.Title>Confirm this action</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>Are you sure?</p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={()=> { setShowDelModal(false); setIdForDelete(0) }}>Nope</Button>
                <Button variant="danger" onClick={()=>{
                    handleDelete(idForDelete);
                    setShowDelModal(false)
                    }}>Yes! Delete the key</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteConfirmationModal;