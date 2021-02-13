import * as React from "react";
import {Route, Switch} from "react-router-dom";
import Header from "./Header/Header";
import Boards from "./Boards/Boards";
import Login from "../Login/Login";
import Register from "../Register/Register";

const BoardLayout = () => {

    return (
        <>

            <Header/>
            <Switch>
                <Route path="/">
                    <Boards/>
                </Route>
                <Route path="/board/:id">
                    {/*<SingleBoard/>*/}
                </Route>
            </Switch>

        </>
    );
}

export default BoardLayout;
