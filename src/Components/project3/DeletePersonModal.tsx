import React, { useState } from "react";
import { Modal, Button, Alert } from "react-bootstrap";

type data = {
    id: number;
    name: string;
};

const DeletePersonModal: React.FC<data> = ({ id, name }) => {
    const [show, setShow] = useState(false);
    const [visible, setVisible] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const confirmDelete = () => {
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
            method: "DELETE",
        }).then((result) => {
            if (result.status === 200) {
                setVisible((prev) => true);
                setTimeout(() => {
                    handleClose();
                    setVisible((prev) => false);
                }, 1000);
            }
        });
    };
    return (
        <>
            <Button variant="danger" size="sm" onClick={handleShow}>
                Delete
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Delete {name}?</Modal.Body>
                <Modal.Footer>
                    <Alert
                        variant="success"
                        style={{ display: visible ? "block" : "none" }}
                    >
                        {name} was deleted
                    </Alert>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={confirmDelete}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default DeletePersonModal;
