import Cookies from 'js-cookie'
import React,{useEffect,useState} from 'react'
import { Button, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom';

export default function Post() {
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
  const onDelete = (id) => {
    fetch(`http://demoyourprojects.com:5085/post/${id}`, {
      method: 'DELETE',
      headers: myHeaders,
    })
    .then((res)=>res.json())
    .then(data=>{
      return data;
     
      //const index = posts.findIndex((post)=>post._id == id);
      //posts.splice(index,1);
    }).then(results=>{
      fetch(`http://demoyourprojects.com:5085/post`, {
        method: 'GET',
        headers: myHeaders,
      }).then((res)=>res.json())
      .then(data2=>setPosts(data2.data))
      .catch(err =>console.log(err));
      alert('Post deleted successfully!');
    })
    .catch(err =>console.log(err));
  }
    return (
      <div className="login-container">
        <h1>Posts List</h1>
        <Link to="/post/create" className='btn btn-success my-5'>Add New Post</Link>
        <Table striped bordered hover responsive="md" >
          <thead>
            <tr>
              <th>Title</th>
              <th>Caption</th>
              <th>Body</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
               (posts) ?
                  posts.map((post,idx)=>(
                    <tr key={idx}>
                      <td>{post.title}</td>
                      <td>{post.caption}</td>
                      <td>{post.body}</td>
                      <td> 
                        <Link to={`/post/view/${post._id}`} className="btn btn-primary" style={{marginLeft:"5px"}}>View</Link>
                        <Link to={`/post/update/${post._id}`} className="btn btn-warning" style={{marginLeft:"5px"}}>Edit</Link>
                        <Button className='btn btn-danger' style={{marginLeft:"5px"}} onClick={() => onDelete(post._id)}>Delete</Button>
                      </td>
                    </tr>
                  )):(<tr>
                  <td colSpan={3}>No records found</td>
                </tr>)

               
            }
          </tbody>

        </Table>
      </div>
    )
 
}
