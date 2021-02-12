import * as React from "react";
import styles from './Header.module.sass'
import {NavLink} from "react-router-dom";

const Header = () => {

    return (
        <>


            <div className={styles.headerArea}>
                <NavLink to="/home" activeClassName={styles.active}>
                    Home
                </NavLink>
                <NavLink to="/live-search" activeClassName={styles.active}>
                    Live Search
                </NavLink>
            </div>

        </>
    );
}

export default Header;
