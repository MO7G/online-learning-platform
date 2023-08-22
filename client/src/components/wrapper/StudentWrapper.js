import React from 'react';
import { useSelector } from 'react-redux';

const StudentWrapper = ({ children }) => {
    const user = useSelector(state => state.auth.user);
    return user && user.role === "student" ? children : null;
};

export default StudentWrapper;