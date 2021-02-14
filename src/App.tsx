import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import Project1 from "./Components/project1";
import Project2 from "./Components/project2";
import Project3 from "./Components/project3";
import AddNewPerson from "./Components/project3/AddNewPerson";
import EditPerson from "./Components/project3/EditPerson";

const App = () => {
    return (
        <Router>
            <Navbar bg="dark" variant="dark">
                <Nav className="mr-auto">
                    <Nav.Link href="/project1">Project1</Nav.Link>
                    <Nav.Link href="/project2">Project2</Nav.Link>
                    <Nav.Link href="/project3">Project3</Nav.Link>
                </Nav>
            </Navbar>
            <Switch>
                <Route path="/project1" component={Project1} />
                <Route path="/project2" component={Project2} />
                <Route path="/project3" component={Project3} />
                <Route path="/addnewperson" component={AddNewPerson} />
                <Route path="/editperson/:id" component={EditPerson} />
            </Switch>
        </Router>
    );
};

export default App;
