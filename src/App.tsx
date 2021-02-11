import React from "react";
import Project1 from "./Components/project1";
import Project2 from "./Components/project2";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";

const App = () => {
    return (
        <Router>
            <nav>
                <Link to="/project1">Project1</Link> {"  "}
                <Link to="/project2">Projet2</Link>
            </nav>
            <Switch>
                <Route path="/project1" component={Project1} />
                <Route path="/project2" component={Project2} />
            </Switch>
        </Router>
    );
};

export default App;
