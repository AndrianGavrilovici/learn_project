import React, { useEffect, useState } from "react";
import { Container, Button, Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import DeletePersonModal from "./DeletePersonModal";

const Project3: React.FC = () => {
    const [data, setData] = useState<any[]>([]);
    const history = useHistory();

    const Users = (props: any) => {
        const { item } = props;

        return (
            <tr>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.username}</td>
                <td>{item.email}</td>
                <td>{item.address.city}</td>
                <td>{item.phone}</td>
                <td>{item.website}</td>
                <td>{item.company.name}</td>
                <td>
                    <Button
                        variant="success"
                        size="sm"
                        onClick={() => history.push(`/editperson/${item.id}`)}
                    >
                        Edit
                    </Button>
                </td>
                <td>
                    <DeletePersonModal id={item.id} name={item.name} />
                </td>
            </tr>
        );
    };

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((response) => response.json())
            .then((data) => setData(data));
    }, []);

    return (
        <Container className="pt-3">
            <Button
                variant="primary"
                onClick={() => history.push("/addnewperson")}
            >
                Add new person
            </Button>

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
                    {data.map((item) => (
                        <Users key={item.id} item={item} />
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};
export default Project3;
