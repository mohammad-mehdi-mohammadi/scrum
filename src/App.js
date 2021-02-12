import React from "react";
import './App.css';
import {
    Switch,
    Route,
    Link, BrowserRouter
} from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Switch>

                    <Route path="/login">
                        <Login/>
                    </Route>
                    <Route path="/register">
                        <Register/>
                    </Route>
                </Switch>
            </BrowserRouter>

        </div>
    );
}

export default App;
