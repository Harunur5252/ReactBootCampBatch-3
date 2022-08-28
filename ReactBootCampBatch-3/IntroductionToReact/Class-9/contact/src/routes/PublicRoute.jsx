import React, { useContext } from 'react'
import { AuthContext } from '../context/Auth.Context'
import {Navigate,useLocation} from 'react-router-dom'

function PublicRoute({children}) {
    const {user} = useContext(AuthContext)
    const location = useLocation()
    const loadedCom = user ? <Navigate to={user?.state?.from ? user?.state?.from : '/contacts'} /> : children 
  return (
    <div>
        {loadedCom}
    </div>
  )
}

export default PublicRoute