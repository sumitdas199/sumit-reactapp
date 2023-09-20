import Cookies from 'js-cookie'
import React from 'react'
import {useNavigate } from 'react-router-dom'
function CreatePost() {
  const [createPost,setCreatePost] = React.useState({title:"",image:"",caption:"",body:""})
  const [status,setStatus] = React.useState("idle")
  const [err,setError] = React.useState(null)
  const navigate = useNavigate();
  const token = Cookies.get('token')
  const myHeaders = new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+token
  });
  function handleChange(e){
    const {name,value} = e.target;
    setCreatePost((prev)=>({
      ...prev,
      [name]:value
    }))
  }
  function handleSubmit(e){
    e.preventDefault()
    setStatus("submitting")
    fetch(`http://demoyourprojects.com:5085/post`,{
      method:'post',
      headers: myHeaders,
      body:JSON.stringify(createPost)
    })
    .then(res=>res.json())
    .then(data=>{
      alert("Post created successfully!")
      console.log(data)
      setError(null)
      navigate("/post",{replace:true})
    })
    .catch(err=>{
      setError(err)
    }).finally(()=>{
      setStatus("idle")
    })
  }
  return (
    <div className="login-container">
      <h1>Create New Post</h1>
      <form onSubmit={handleSubmit} className='login-form'>
        <input 
          name='title'
          onChange={handleChange}
          type='text'
          placeholder='Post title'
          value={createPost.title}
        />
        <input 
          name='image'
          onChange={handleChange}
          type='text'
          placeholder='Post Image url'
          value={createPost.image}
        />
        <input
          name='caption'
          onChange={handleChange}
          type='text'
          placeholder='Caption'
          value={createPost.caption}
        />
        <textarea name='body' value={createPost.body} onChange={handleChange} placeholder='Please enter some description'/>
        <button className='btn btn-info'>Create</button>
      </form>
    </div>
  )
}

export default CreatePost