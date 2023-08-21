import React from 'react';
import { useSelector } from 'react-redux';

const TeacherWrapper = ({ children }) => {
    const user = useSelector(state => state.auth.user);

    return user && user.role === "teacher" ? children : null;
};

export default TeacherWrapper;