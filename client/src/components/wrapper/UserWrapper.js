import React from 'react';
import { useSelector } from 'react-redux';

const UserWrapper = ({ children }) => {
    const user = useSelector(state => state.auth.user);

    return user ? children : null;
};

export default UserWrapper;