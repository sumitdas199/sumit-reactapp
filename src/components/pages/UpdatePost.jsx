import Cookies from 'js-cookie'
import React, { useEffect } from 'react'
import {useNavigate, useParams } from 'react-router-dom'


function UpdatePost() {
  const [inputData,setInputData] = React.useState({title:"",image:"",caption:"",body:""})
  const [status,setStatus] = React.useState("idle")
  const [err,setError] = React.useState(null)
  const navigate = useNavigate();
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
    .then((data)=>setInputData(data.data))
    .catch(err =>console.log(err));
  },[])
  function handleChange(e){
    const {name,value} = e.target;
    setInputData((prev)=>({
      ...prev,
      [name]:value
    }))
  }
  function handleSubmit(e){
    e.preventDefault()
    setStatus("submitting")
    fetch(`http://demoyourprojects.com:5085/post/${params.id}`,{
      method:'PUT',
      headers: myHeaders,
      body:JSON.stringify(inputData)
    })
    .then(res=>res.json())
    .then(data=>{
      alert("Post Updated successfully!")
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
          value={inputData.title}
        />
        <input 
          name='image'
          onChange={handleChange}
          type='text'
          placeholder='Post Image url'
          value={inputData.image}
        />
        <input
          name='caption'
          onChange={handleChange}
          type='text'
          placeholder='Caption'
          value={inputData.caption}
        />
        <textarea name='body' value={inputData.body} onChange={handleChange} placeholder='Please enter some description'/>
        <button className='btn btn-info'>Create</button>
      </form>
    </div>
  )
}

export default UpdatePost