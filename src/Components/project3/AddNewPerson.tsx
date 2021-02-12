import React, { useState } from "react";
import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";

const AddNewPerson: React.FC = () => {
    const [visible, setVisible] = useState(false);

    const handleSubmit = (evt: any) => {
        evt.preventDefault();
        const data = new FormData(evt.target);
        fetch("https://jsonplaceholder.typicode.com/users", {
            method: "POST",
            body: JSON.stringify({
                name: data.get("name"),
                username: data.get("username"),
                email: data.get("email"),
                address: {
                    city: data.get("city"),
                },
                phone: data.get("phone"),
                website: data.get("website"),
                company: {
                    name: data.get("company"),
                },
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        }).then((response) => {
            response.json();
            if (response.ok && response.status === 201) {
                setVisible((prev) => true);
            }
        });
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
                            />
                        </Col>
                        <Col>
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="username"
                                placeholder="Enter username"
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
                            />
                        </Col>
                        <Col>
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                type="text"
                                name="city"
                                placeholder="Enter city"
                            />
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Phone number</Form.Label>
                    <Form.Control name="phone" placeholder="Enter phone" />
                </Form.Group>

                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Label>Website</Form.Label>
                            <Form.Control
                                type="text"
                                name="website"
                                placeholder="Enter your web site"
                            />
                        </Col>
                        <Col>
                            <Form.Label>Company name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="company"
                                placeholder="Enter your company"
                            />
                        </Col>
                    </Row>
                </Form.Group>
                <Alert
                    variant="success"
                    style={{ display: visible ? "block" : "none" }}
                >
                    The new person has been registered
                </Alert>

                <Button variant="primary" type="submit">
                    Add person
                </Button>
            </Form>
        </Container>
    );
};

export default AddNewPerson;
