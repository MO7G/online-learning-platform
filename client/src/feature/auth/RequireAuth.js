import React from 'react'
import { useLocation,Navigate,Outlet } from "react-router-dom";
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";
import { selectCurrentToken } from "./authSlice";

const RequireAuth = () => {
    const token = useSelector(selectCurrentToken)
    const location = useLocation()


  return (
   token ? <Outlet/> : <Navigate to="/login" state={{from:location}} replace/>
  )
}

export default RequireAuth