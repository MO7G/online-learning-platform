import React, { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import './ProtectedRoutes.scss'
const ProtectedRoutes = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [counter, setCounter] = useState(5);

    useEffect(() => {
        console.log("I am called here")
    }, [])

    return (
        user ? <Navigate to="/" /> : <Outlet />
    );

};

export default ProtectedRoutes;
