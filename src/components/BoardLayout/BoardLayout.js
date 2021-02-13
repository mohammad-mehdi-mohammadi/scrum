import * as React from "react";
import {Route, Switch} from "react-router-dom";
import Header from "./Header/Header";
import Boards from "./Boards/Boards";
import Board from "./Board/Board";

const BoardLayout = () => {

    return (
        <>

            <Header/>
            <Switch>
                <Route path="/board/:id">
                    <Board/>
                </Route>
                <Route path="">
                    <Boards/>
                </Route>



            </Switch>

        </>
    );
}

export default BoardLayout;
