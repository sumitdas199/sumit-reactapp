import React,{ useEffect } from 'react'
import Cookies from 'js-cookie'
import {Link, useParams } from 'react-router-dom'

export default function PostDetail() {
  const [postData,setPostData] = React.useState({})
  
  const params = useParams()
  const token = Cookies.get('token')
  const myHeaders = new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+token
  });
  useEffect(()=>{
    fetch(`http://demoyourprojects.com:5085/post/${params.id}`, {
      method: 'GET',
      headers: myHeaders,
    }).then((res)=>res.json())
    .then((data)=>setPostData(data.data))
    .catch(err =>console.log(err));
  },[])
  return (
    <div>
       <h1>Post Title: {
          postData ? postData.title:""        
        }
        </h1>
      
      <p> <Link to="/post">See all post !</Link></p>
    </div>
  )
}
