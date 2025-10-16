import React from "react";
import { Navigate } from "react-router-dom";
import {jwtDecode}  from "jwt-decode";

const ProtectedRoute = ({ children, role }) => {

    const token = localStorage.getItem("jwt");
    if (!token) return <Navigate to="/login" replace />;

    let decodedUser;
        decodedUser = jwtDecode(token);

    const userRoles = decodedUser.roles || [];
    if (role && !userRoles.includes(role)) {
        return <Navigate to="/access-denied" replace />;
    }
    return children;
};

export default ProtectedRoute;