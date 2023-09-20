import Cookies from 'js-cookie'
import React from 'react'
import { useLocation,useNavigate } from 'react-router-dom'

export default function Login() {
  const [registrationFormData,setRegistrationFormData] = React.useState({name:"",email:"",password:"",confirm_password:""})
  const location = useLocation()
  console.log(location)
  const [status,setStatus] = React.useState("idle")
  const [err,setError] = React.useState(null)
  const navigate = useNavigate();
  const from = location.state?.from || "/post";
  function handleChange(e){
    const {name,value} = e.target;
    setRegistrationFormData((prev)=>({
      ...prev,
      [name]:value
    }))
  }
  function handleSubmit(e){
    e.preventDefault()
    setStatus("submitting")
    fetch(`http://demoyourprojects.com:5085/auth/signup`,{
      method:'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(registrationFormData)
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
console.log(data)
      setError(null)
      
      navigate(from,{replace:true})
    })
    .catch(err=>{
      console.log(err)
      setError(err)
    }).finally(()=>{
      setStatus("idle")
    })
  }
  return (
    <div className="login-container">
      <h1>Sign up form</h1>
      <form onSubmit={handleSubmit} className='login-form'>
        <input 
          name='name'
          onChange={handleChange}
          type='text'
          placeholder='Name'
          value={registrationFormData.name}
        />
         <input 
          name='email'
          onChange={handleChange}
          type='email'
          placeholder='Email Address'
          value={registrationFormData.email}
        />
        <input
          name='password'
          onChange={handleChange}
          type='password'
          placeholder='Password'
          value={registrationFormData.password}
        />
         <input
          name='confirm_password'
          onChange={handleChange}
          type='password'
          placeholder='Confirm Password'
          value={registrationFormData.confirm_password}
        />
        <button
        disabled={status === "submitting"}
        >{
          status === "submitting"?"Registering...":"Sign Up"
          }</button>
      </form>
    </div>
  )
}
