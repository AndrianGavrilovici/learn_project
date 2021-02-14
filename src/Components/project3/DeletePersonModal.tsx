import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import AlertMessage from "./Alert";
import ProcessesWebErrorStatus from "./ProcessesWebErrorStatus";

interface PropsType {
    id: number;
    name: string;
}

const DeletePersonModal: React.FC<PropsType> = ({ id, name }) => {
    const [showModal, setShowModal] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState(`${name} was deleted`);
    const [alertVariant, setAlertVariant] = useState("success");

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const confirmDelete = () => {
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
            method: "DELETE",
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        ProcessesWebErrorStatus(
                            response.statusText,
                            response.status
                        )
                    );
                }

                setAlertVariant("success");
                setShowAlert(true);
                setAlertMessage(`${name} was deleted`);
            })
            .catch((error) => {
                console.log(`Error: ${error.message}`);
                setAlertVariant("danger");
                setShowAlert(true);
                setAlertMessage(error.message);
            });

        setTimeout(() => {
            handleClose();
            setShowAlert(false);
        }, 2000);
    };

    return (
        <>
            <Button variant="danger" size="sm" onClick={handleShow}>
                Delete
            </Button>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Delete <b>{name}</b>?
                </Modal.Body>
                <Modal.Footer>
                    <div style={{ display: showAlert ? "block" : "none" }}>
                        <AlertMessage
                            message={alertMessage}
                            alertVariant={alertVariant}
                        />
                    </div>

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
