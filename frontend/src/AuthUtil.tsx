import React from "react";
import { EmailContext, UserAuthContext } from "./Context";
import { Navigate } from "react-router-dom";

export function UserAuth({ children }: { children: JSX.Element }) {
    let userAuth = React.useContext(UserAuthContext);

    if (userAuth.firstName === "") {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/welcome" replace />;
    }

    return children;
}

export function LoginAuth({ children }: { children: JSX.Element }) {
    let loginAuth = React.useContext(EmailContext);

    if (loginAuth.email === "") {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/login" replace />;
    }

    return children;
}