import React, { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import './ProtectedRoutes.scss'
const ProtectedRoutes = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [counter, setCounter] = useState(5);

    useEffect(() => {
        if (!user) {
            const timer = setInterval(() => {
                setCounter(prevCounter => prevCounter - 1);
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [user]);


    return (
        user ? <Outlet /> : (
            <div className='message-container '>
                <div className='message'>
                    <p>Not Authorized !!</p>
                    <p>Redirecting to home page in {counter} seconds...</p>
                    {counter === 0 ? <Navigate to="/" /> : ''}
                </div>
            </div>
        )
    );
};

export default ProtectedRoutes;
