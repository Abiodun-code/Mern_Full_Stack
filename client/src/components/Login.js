import React, {useState} from 'react'
import {useMatch} from 'react-router'
const Login = () => {
    const [user, setUser] = useState({
        email: ' ',
        password: ' '
    })

    const handleChange = (event) =>{
        let name = event.target.name;
        let value = event.target.value;

        setUser({...user, [name]:value});
    }

    const handleSubmit = async (event) =>{
        event.preventDefault();
    
        // Object Destructing
        // Store Object Data into variables
        const{email, password} = user;
        try {
          const res = await fetch('/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
          })
    
          if(res.status === 404 || !res){
            window.alert('Invalid Crediential')
          }else{
            window.alert('Logged In')
            // history.pushState('/login')
          }
        } catch (error) {
          console.log(error)
        }
      }

  return (
    <div>
         <form onSubmit={handleSubmit} method='POST'>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input type="email"  name='email' value={user.email} onChange={handleChange} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input type="password" name='password' value={user.password} onChange={handleChange} class="form-control" id="exampleInputPassword1"/>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>  
    </div>
  )
}

export default Login