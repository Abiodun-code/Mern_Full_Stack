import React, {useState, useEffect} from 'react'
import {useHref} from 'react-router'

const Register = () => {

  const history = useHref();

  const [user, setUser] = useState({
    username: ' ',
    email: ' ',
    password: ' '
  });

  // Handle Inputs
  const handleInpuit = (event) =>{
    let name = event.target.name;
    let value = event.target.value;

    setUser({...user, [name]: value});
  }

  const handleSubmit = async (event) =>{
    event.preventDefault();

    // Object Destructing
    // Store Object Data into variables
    const{username, email, password} = user;
    try {
      const res = await fetch('/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username, email, password})
      })

      if(res.status === 404 || !res){
        window.alert('Already Used Crediential')
      }else{
        window.alert('Register Successful')
        history.pushState('/login')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
         <form method='POST' onSubmit={handleSubmit}>
         <div class="mb-3">
    <label for="exampleInputName" class="form-label">Username</label>
    <input type="text" name='username' value={user.username} onChange={handleInpuit} class="form-control" id="exampleInputName" aria-describedby="emailHelp"/>
  </div>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input type="email" name='email' value={user.email} onChange={handleInpuit} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input type="password" name='password' value={user.password} onChange={handleInpuit} class="form-control" id="exampleInputPassword1"/>
  </div>
  <div class="mb-3 form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
    <label class="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>  
    </div>
  )
}

export default Register