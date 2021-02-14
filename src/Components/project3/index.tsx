import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Button, Table } from "react-bootstrap";
import DeletePersonModal from "./DeletePersonModal";
import AlertMessage from "./Alert";
import IUser from "./Interfaces";
import ProcessesWebErrorStatus from "./ProcessesWebErrorStatus";

const Project3: React.FC = () => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [alertMessage, setAlertMessage] = useState("");

    const Users = (props: any) => {
        const user: IUser = props.item;

        return (
            <tr>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user?.address?.city || "It's not specified"}</td>
                <td>{user.phone || "It's not specified"}</td>
                <td>{user.website || "It's not specified"}</td>
                <td>{user?.company?.name || "It's not specified"}</td>
                <td>
                    <Link
                        to={{ pathname: `/editperson/${user.id}`, state: user }}
                    >
                        <Button variant="success" size="sm">
                            Edit
                        </Button>
                    </Link>
                </td>
                <td>
                    <DeletePersonModal id={user.id} name={user.name} />
                </td>
            </tr>
        );
    };

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
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
            .then((data) => setUsers(data))
            .catch((error) => {
                console.log(`Error: ${error.message}`);
                setAlertMessage(error.message);
            });
    }, []);

    if (alertMessage !== "") {
        return (
            <div className="m-4">
                <AlertMessage message={alertMessage} alertVariant="danger" />
            </div>
        );
    }

    return (
        <Container className="pt-3">
            <Link to={"/addnewperson"}>
                <Button variant="primary">Add new person</Button>
            </Link>

            <Table className="mt-3" striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>UserName</th>
                        <th>Email</th>
                        <th>City</th>
                        <th>Phone</th>
                        <th>Website</th>
                        <th>Company Name</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((item: IUser) => (
                        <Users key={item.id} item={item} />
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};
export default Project3;
