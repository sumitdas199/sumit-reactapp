import Cookies from 'js-cookie'
import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap'

export default function Home() {
  const token = Cookies.get('token')
  const myHeaders = new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+token
  });
  const [posts,setPosts] = useState([])
  useEffect(()=>{
    fetch(`http://demoyourprojects.com:5085/post`, {
      method: 'GET',
      headers: myHeaders,
    }).then((res)=>res.json())
    .then(data=>setPosts(data.data))
    .catch(err =>console.log(err));
  },[])
  if(posts){ 
    return (
      <div className="login-container">
        <h1>Posts List</h1>
        <Table striped bordered hover responsive="md">
          <thead>
            <tr>
              <th>Title</th>
              <th>Caption</th>
              <th>Body</th>
            </tr>
          </thead>
          <tbody>
            {
              posts.map((post,idx)=>(
                <tr key={idx}>
                  <td>{post.title}</td>
                  <td>{post.caption}</td>
                  <td>{post.body}</td>
                </tr>
              ))
            }
          </tbody>

        </Table>
      </div>
    )
  }else{
    return (
      <div className="login-container">
        <h1>Please <Link to="/login">login</Link> first to see your posts!</h1>
      </div>
    )
  }
 
}