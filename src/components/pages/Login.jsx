import Cookies from 'js-cookie'
import React from 'react'
import { useLocation,useNavigate } from 'react-router-dom'

export default function Login() {
  const [loginFormData,setLoginFormData] = React.useState({username:"",password:""})
  const location = useLocation()
  console.log(location)
  const [status,setStatus] = React.useState("idle")
  const [err,setError] = React.useState(null)
  const navigate = useNavigate();
  const from = location.state?.from || "/post";
  function handleChange(e){
    const {name,value} = e.target;
    setLoginFormData((prev)=>({
      ...prev,
      [name]:value
    }))
  }
  function handleSubmit(e){
    e.preventDefault()
    setStatus("submitting")
    fetch(`http://demoyourprojects.com:5085/auth/signin`,{
      method:'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(loginFormData)
    })
    .then(res=>res.json())
    .then(data=>{
      Cookies.set("loggedin", true, {
        expires: 1,
      });
      Cookies.set("token",data.data.access_token, {
        expires: 1,
      });
      Cookies.set("user", JSON.stringify(data.data.user), {
        expires: 1,
      });

      setError(null)
      
      navigate(from,{replace:true})
    })
    .catch(err=>{
      setError(err)
    }).finally(()=>{
      setStatus("idle")
    })
  }
  return (
    <div className="login-container">
      { location.state?.message && <h3 className='login-first'>{location.state.message}</h3>}
      <h1>Sign in to your account</h1>
      <form onSubmit={handleSubmit} className='login-form'>
        <input 
          name='username'
          onChange={handleChange}
          type='email'
          placeholder='Email Address'
          value={loginFormData.username}
        />
        <input
          name='password'
          onChange={handleChange}
          type='password'
          placeholder='Password'
          value={loginFormData.password}
        />
        <button
        disabled={status === "submitting"}
        >{
          status === "submitting"?"Logging in":"Login"
          }</button>
      </form>
    </div>
  )
}
