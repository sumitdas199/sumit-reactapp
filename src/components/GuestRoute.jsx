import Cookies from "js-cookie"
import React from "react"
import { Outlet,Navigate,useLocation } from "react-router-dom"

export default function AuthRequired() {
    const isLoggedIn = Cookies.get("token")
    const location = useLocation()
   
    
    if (isLoggedIn) {
        return (
            <Navigate
                to="/post" 
                state={{message: "You have to logout",from:location.pathname }}
                replace 
            />)
    }
    return <Outlet />
}