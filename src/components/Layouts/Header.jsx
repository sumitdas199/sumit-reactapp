import Cookies from 'js-cookie';
import React from 'react'
import { Link, NavLink,useNavigate } from "react-router-dom";

export default  function Header(){
    const isLoggedIn = Cookies.get('token');
    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }
    const navigate = useNavigate()
    const fakeLogOut = ()=>{
        Cookies.remove("loggedin");
        Cookies.remove("user")
        Cookies.remove("token")
        navigate("/login",{replace:true})
    }

    if(isLoggedIn){
        return (
            <header>
                <nav>
                    <NavLink 
                        to='/post'
                        style={({isActive})=>isActive?activeStyles:null}
                    >
                        Post
                    </NavLink>
                    <button onClick={fakeLogOut}>Logout</button>
                </nav>
            </header>
        )
    }else{
        return (
            <header>
                <nav>
                    <Link to='/'>Home</Link>
                    <NavLink 
                        to='/login'
                        style={({isActive})=>isActive?activeStyles:null}
                    >
                        Login
                    </NavLink>
                    <NavLink 
                        to='/registration'
                        style={({isActive})=>isActive?activeStyles:null}
                    >
                        Registration
                    </NavLink>
                   
                </nav>
            </header>
        )
    }
   
  
}
