import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const { id } = useParams(); // Get the user's ID from the route
  const [userData, setUserData] = useState(null);

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

  return (
    <div>
      <h1>Welcome to your Dashboard, User {id}</h1>
      <nav>
        <ul>
          <li><Link to={`/createquote/${id}`}>CreateQuote</Link></li>
          <li><Link to={`/quotes/${id}`}>My Quotes</Link></li>
          <li><Link to={`/chat/${id}`}>Quote Chats</Link></li>
        </ul>
      </nav>
      {userData ? (
        <div>
          <p>Name: {userData.first_name}</p>
          <p>Email: {userData.email}</p>
          {/* Add more user-specific details as needed */}
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default Dashboard;
