import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

export default function RequireAuth({ children, role }) {
    let auth = useAuth();
    let location = useLocation();

    console.log("RequireAuth " + auth.user +" "+ auth.userRole + "/n origin " + role);

    if (!auth.user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    if (!role.includes(auth.userRole)) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}