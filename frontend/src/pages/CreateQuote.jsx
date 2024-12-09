import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const { id } = useParams(); // Get the user's ID from the route
  const [userData, setUserData] = useState(null);
  const [address, setAddress] = useState('')
  const [sqft, setSqft] = useState('')
  const [budget, setBudget] = useState('')
  const [pictures, setPictures] = useState('')
  const [date, setDate] = useState('')
  const navigate = useNavigate('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5050/searchId/${id}`);
        const user = response.data.data[0]; // Extract the first item from the data array
        setUserData(user); // Update the state with user data
      } catch (error) {
        console.error("Error fetching user data: ", error.message);
      }
    };
    fetchData();
  }, [id]);

  const handleNewQuote = async(e) => {
    e.preventDefault()
    try{
      const response = await axios.post('http://localhost:5050/quotes',{
        id, address, sqft,budget, pictures, date
      })
      console.log('Quote Success: ', response.data)
      setAddress('')
      setSqft('')
      setBudget('')
      setPictures('')
      setDate('')
    //   navigate(`/dashboard/${id}`)
      if (response.data.data) {
        console.log("Quote Success: ", response.data.data);
        const customer_id = response.data.data.customer_id; // Extract the user's unique ID
        navigate(`/chat/${customer_id}`); // Redirect to the unique dashboard
      }
    }catch(error){
      console.error('Signup Error: ', error)
    }
  };

  return (
    <div>
      {userData ? (
        <div>
          <h2>Create New Quote : {userData.first_name}</h2>
          {/* Add more user-specific details as needed */}
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
      
      <form onSubmit={handleNewQuote}>
            {userData ? (
                <div>
                <p>Id: {userData.id}</p>
                {/* Add more user-specific details as needed */}
                </div>
            ) : (
                <p>Loading user data...</p>
            )}  
            <div>
                <input
                name="address"
                type="text"
                placeholder="Your Address here"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                />
            </div>
            <div>
                <input
                name="sqft"
                type="number"
                placeholder="Your area to be mended in square feet "
                value={sqft}
                onChange={(e) => setSqft(e.target.value)}
                required
                />
            </div>
            <div>
                <input
                name="budget"
                type="number"
                value={budget}
                placeholder="Your Estiamted budget for the job (in dollars)"
                onChange={(e) => setBudget(e.target.value)}
                required
                />
            </div>
            <div>
                <input
                name='pictures'
                type="text"
                value={pictures}
                placeholder="Your Pictures URL here"
                onChange={(e) => setPictures(e.target.value)}
                required
                />
            </div>
            <div>
                <input
                name='date'
                type="date"
                value={date}
                placeholder="Date by which the work should be completed"
                onChange={(e) => setDate(e.target.value)}
                required
                />
            </div>
            
            <button className="page-btn" type="submit">Submit Quote</button>
        </form>
    </div>
  );
};

export default Dashboard;
