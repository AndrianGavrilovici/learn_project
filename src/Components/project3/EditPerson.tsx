import React, { useState, useEffect } from "react";
import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";

const EditPerson: React.FC<any> = ({ match }) => {
    const [visible, setVisible] = useState(false);
    const [person, setPerson] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const id = match.params.id;
    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setPerson(data);
                setLoading(false);
            });
    }, []);

    const handleSubmit = (evt: any) => {
        evt.preventDefault();
        const data = new FormData(evt.target);

        fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
            method: "PUT",
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
            if (response.ok && response.status === 200) {
                setVisible(true);
            }
        });
    };

    const onChangeHandler = (e: any) => {
        const { name, value } = e.target;

        setPerson((prevState: any) => ({
            ...prevState,
            [name]: value,
        }));
    };

    if (isNaN(Number(id)) || Number(id) > 10) {
        return (
            <>
                <h1 className="text-center pt-3">The address is incorrect</h1>
            </>
        );
    }

    if (loading) {
        return <h2 className="pt-4">loading...</h2>;
    }
    return (
        <Container className="pt-3">
            <h2 className="text-center">Edit person</h2>

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
                                value={person.name}
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
                                value={person.username}
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
                                value={person.email}
                                onChange={onChangeHandler}
                            />
                        </Col>
                        <Col>
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                type="text"
                                name="city"
                                placeholder="Enter city"
                                value={person?.address?.city}
                                onChange={(e: any) =>
                                    setPerson((prevState: any) => ({
                                        ...prevState,
                                        address: {
                                            city: e.target.value,
                                        },
                                    }))
                                }
                            />
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Phone number</Form.Label>
                    <Form.Control
                        name="phone"
                        placeholder="Enter phone"
                        value={person.phone}
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
                                value={person.website}
                                onChange={onChangeHandler}
                            />
                        </Col>
                        <Col>
                            <Form.Label>Company name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="company"
                                placeholder="Enter your company"
                                value={person?.company?.name}
                                onChange={(e: any) =>
                                    setPerson((prevState: any) => ({
                                        ...prevState,
                                        company: {
                                            name: e.target.value,
                                        },
                                    }))
                                }
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
                    Save changes
                </Button>
            </Form>
        </Container>
    );
};

export default EditPerson;
