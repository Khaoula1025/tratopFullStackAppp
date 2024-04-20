import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
export default function GestLayout() {
    const { token } = useStateContext();

    if (token) {
        return <Navigate to="/dashboard" />;
    }
    return (
        <>
            <Outlet />
        </>
    );
}
