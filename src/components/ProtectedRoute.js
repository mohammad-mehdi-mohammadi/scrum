import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {hasToken} from "./token";

const ProtectedRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={
            props => {
                if (props.location.pathname === "/login") {
                    if (!hasToken()) {
                        return <Component {...rest} {...props} />
                    } else {
                        return <Redirect to={
                            {
                                pathname: '/board',
                                state: {
                                    from: props.location
                                }
                            }
                        }/>
                    }
                } else {
                    if (hasToken()) {
                        return <Component {...rest} {...props} />
                    } else {
                        return <Redirect to={
                            {
                                pathname: '/login',
                                state: {
                                    from: props.location
                                }
                            }
                        }/>
                    }
                }
            }
        }/>
    )
}

export default ProtectedRoute;
