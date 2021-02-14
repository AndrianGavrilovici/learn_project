import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import AlertMessage from "./Alert";
import IUser, { initialUserValues } from "./Interfaces";
import ProcessesWebErrorStatus from "./ProcessesWebErrorStatus";

const AddNewPerson: React.FC = () => {
    const [user, setUser] = useState<IUser>(initialUserValues);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertVariant, setAlertVariant] = useState("success");

    const handleSubmit = (evt: any) => {
        evt.preventDefault();
        fetch("https://jsonplaceholder.typicode.com/users", {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
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
                return response.json();
            })
            .then((data) => {
                setShowAlert(true);
                setAlertVariant("success");
                setAlertMessage(
                    `The ${data.username} has been registered, Id:{${data.id}}`
                );
            })
            .catch((error) => {
                console.log(`Error: ${error.message}`);
                setAlertVariant("danger");
                setShowAlert(true);
                setAlertMessage(error.message);
            });
    };

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        // example: name=address.city; then nameObject[0]=address and nameObject[1]=city
        const nameObject = name.split(".");
        if (nameObject.length > 1 && nameObject[0] in user) {
            setUser((prevState: any) => ({
                ...prevState,
                [nameObject[0]]: {
                    ...prevState[nameObject[0]],
                    [nameObject[1]]: value,
                },
            }));
        } else {
            setUser((prevState: IUser) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    return (
        <Container className="pt-3">
            <h2 className="text-center">Add new persone</h2>

            <Form className="mt-4" onSubmit={handleSubmit}>
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="name"
                                placeholder="Enter full name"
                                onChange={onChangeHandler}
                            />
                        </Col>
                        <Col>
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="username"
                                placeholder="Enter username"
                                onChange={onChangeHandler}
                            />
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                required
                                type="email"
                                name="email"
                                placeholder="Enter email"
                                onChange={onChangeHandler}
                            />
                        </Col>
                        <Col>
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                type="text"
                                name="address.city"
                                placeholder="Enter city"
                                onChange={onChangeHandler}
                            />
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Phone number</Form.Label>
                    <Form.Control
                        name="phone"
                        placeholder="Enter phone"
                        onChange={onChangeHandler}
                    />
                </Form.Group>

                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Label>Website</Form.Label>
                            <Form.Control
                                type="text"
                                name="website"
                                placeholder="Enter your web site"
                                onChange={onChangeHandler}
                            />
                        </Col>
                        <Col>
                            <Form.Label>Company name</Form.Label>
                            <Form.Control
                                type="text"
                                name="company.name"
                                placeholder="Enter your company"
                                onChange={onChangeHandler}
                            />
                        </Col>
                    </Row>
                </Form.Group>

                <div style={{ display: showAlert ? "block" : "none" }}>
                    <AlertMessage
                        message={alertMessage}
                        alertVariant={alertVariant}
                    />
                </div>

                <Link to="/project3">
                    <Button variant="secondary">Cancel</Button>
                </Link>

                <Button className="ml-3" variant="primary" type="submit">
                    Add person
                </Button>
            </Form>
        </Container>
    );
};

export default AddNewPerson;
