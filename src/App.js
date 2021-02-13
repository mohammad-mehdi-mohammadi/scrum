import React from "react";
import './App.css';
import {
    Switch,
    Route,
    Link, BrowserRouter
} from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import BoardLayout from "./components/BoardLayout/BoardLayout";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Switch>

                    <Route exact path="/login">
                        <Login/>
                    </Route>
                    <Route exact path="/register">
                        <Register/>
                    </Route>
                    <Route path="/board">
                        <BoardLayout/>
                    </Route>

                </Switch>
            </BrowserRouter>

        </div>
    );
}

export default App;
