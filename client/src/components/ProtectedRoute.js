import React from 'react'
import { Navigate } from 'react-router-dom'
import Chat from '../pages/Chat'
function ProtectedRoute({ user }) {
    console.log(user)
    if (!user) {
        return <Navigate to={'/login'} />
    }
    return <Chat />
}

export default ProtectedRoute