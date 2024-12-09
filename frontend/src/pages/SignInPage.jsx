import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()


  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5050/signin`, {
        email,
        password,
      });
      if (response.data.user) {
        console.log("Signin Success: ", response.data);
        const userId = response.data.user.id; // Extract the user's unique ID
        navigate(`/dashboard/${userId}`); // Redirect to the unique dashboard
      }
    } catch (error) {
      console.error("Signin Error: ", error.message);
    }
  };
  
  // const handleSignIn = async (e) => {
  //   e.preventDefault()
  //   try {
  //     const response = await axios.post(`http://localhost:5050/signin`, {
  //       email,
  //       password
  //     })
  //     if (response.data.user) {
  //       console.log("Signin Success: ", response.data)
  //       navigate(`/dashboard`)
  //     }
  //   } catch (error) {
  //     console.error("Signin Error")
  //   }
  // }

  return (
    <div className="container">
      <h2>Signin Page</h2>
        <form onSubmit={handleSignIn}>
          <div>
            <input
              id="email"
              type="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              id="password"
              type="password"
              value={password}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="page-btn" type="submit">Sign In</button>
          <div>
            <Link className="link" to="/signup">Forgot password?</Link>
            <Link className="link" to="/signup">Do not have an account?</Link>
          </div>
        </form>
    </div>
  )
}

export default SignIn;
