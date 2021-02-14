import React from "react";
import { Alert } from "react-bootstrap";

const AlertMessage: React.FC<any> = ({ classProperty = 'mt-3', message, alertVariant = "warning" }) => {

    return (
        <Alert className={classProperty} variant={alertVariant}>
            <b>{message}</b>
        </Alert>
    );
};

export default AlertMessage;
