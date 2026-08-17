import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'

const Login = () => {
    const [credential, setCredential] = useState({email:"",password:""});
    let navigate=useNavigate()
    const handleSubmit=async (e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/loginUser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
               },
               body: JSON.stringify({email:credential.email,password:credential.password})
        });
        const json=await response.json()
        console.log(json);
        if (json.success){
            // redirect
            localStorage.setItem('token', json.authToken);
            console.log("Navigating...");
            navigate("/")
        }else{
            alert("Invalid Credentials");
        }
    }
    const onchange=(e)=>{
        setCredential({...credential,[e.target.name]:e.target.value});
    }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input type="email" className="form-control" value={credential.email} onChange={onchange} id="email" name="email" aria-describedby="emailHelp" placeholder="Enter email"/>
        </div>
        <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control my-2" value={credential.password} onChange={onchange} name="password" id="password" placeholder="Password"/>
        </div>
        <button type="submit" className="btn btn-primary" >Submit</button>
        </form>
    </div>
  )
}

export default Login
