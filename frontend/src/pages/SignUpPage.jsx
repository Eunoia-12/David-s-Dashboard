import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate} from 'react-router-dom'


const SignUp = () => {
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate('')
  const handleSignUp = async(e) => {
    e.preventDefault()
    try{
      const response = await axios.post('http://localhost:5050/signup',{
        firstname,lastname,email,password
      })
      console.log('Signup Success: ', response.data)
      setFirstname('')
      setLastname('')
      setEmail('')
      setPassword('')
      navigate("/signin")
    }catch(error){
      console.error('Signup Error: ', error)
    }
  };

  return (
    <div className="container">
      <h2>Signup Page</h2>
        <form onSubmit={handleSignUp}>
          <div>
            <input
              name="firstname"
              type="text"
              placeholder="Your First Name here"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              name="lastname"
              type="text"
              placeholder="Your Last Name here"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="email"
              value={email}
              placeholder="Your Email here"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              placeholder="Your PassWord here"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="page-btn" type="submit">Sign Up</button>
          <Link className="link" to="/signin">Already have an account?</Link>
        </form>
    </div>
  );
};

export default SignUp;
