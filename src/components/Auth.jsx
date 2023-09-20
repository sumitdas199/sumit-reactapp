import axios from "axios";
import Cookies from "js-cookie";
import React,{useEffect} from "react";
 
export async function getUser() {
    const token = Cookies.get('token')
    if(token){
        try {
            const response = await axios.get('http://demoyourprojects.com:5085/user',{
              headers: {
                 Authorization : `Bearer ${token}`
              } 
           });
            console.log(response);
            return response.data._id
          } catch (error) {
            console.error(error);
            return null;
          }
    }
    return null
    
  }

 