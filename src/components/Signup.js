import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'

const Signup = (props) => {
      const [credential, setCredential] = useState({name:"",email:"",password:"",cpassword:""});
      let navigate=useNavigate()
      const handleSubmit=async (e)=>{
        e.preventDefault();
        const {email,name,password}=credential;
        const response = await fetch(`http://localhost:5000/api/auth/createUser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
               },
               body: JSON.stringify({name,email,password})
        });
        const json=await response.json()
        console.log(json);
        if (json.success){
            // redirect
            localStorage.setItem('token', json.authToken);
            navigate("/")
            props.showAlert("Account created Successfully", "success")
        }else{
            props.showAlert("Invalid Details", "danger")
        }
    }
    const onchange=(e)=>{
        setCredential({...credential,[e.target.name]:e.target.value});
    }
  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name='name' onChange={onchange} aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name='email' onChange={onchange} aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name='password' onChange={onchange} minLength={5} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onchange} minLength={5} required/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup
