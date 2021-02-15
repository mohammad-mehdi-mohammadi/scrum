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
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Switch>
                    <ProtectedRoute exact path='/login' component={Login}/>
                    <ProtectedRoute exact path='/register' component={Register}/>
                    <ProtectedRoute path='/board' component={BoardLayout}/>


                </Switch>
            </BrowserRouter>

        </div>
    );
}

export default App;
