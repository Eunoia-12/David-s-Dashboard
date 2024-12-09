import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const UsersQuotes = () => {
  const { id } = useParams(); // Extract the dynamic ID from the route
  const [quotes, setQuotes] = useState([]); // State to hold fetched quotes
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors

  // Fetch quotes from the backend
  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await axios.get(`http://localhost:5050/quotes/${id}`);
        const quote_ = response.data.data
        setQuotes(quote_);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch quotes');
        setLoading(false);
      }
    };

    fetchQuotes();
  }, [id]); 

  if (loading) return <div>Loading...</div>; 
  if (error) return <div>{error}</div>; 

  return (
    <div>
      <h1>Quotes for ID: {id}</h1>
      {quotes.length > 0 ? (
        <table border="1">
          <thead>
            <tr>
              <th>Actions</th> {/* New column for buttons */}
              {Object.keys(quotes[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {quotes.map((quote, index) => (
              <tr key={index}>
                <td>
                  {/* Button that links to QuoteChat */}
                  <Link to={`/chat/${quotes[index].order_id}`}>
                    <button>Negotiate</button>
                  </Link>
                </td>
                {Object.values(quote).map((value, idx) => (
                  <td key={idx}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading.....</p>
      )}
    </div>
  );
};

export default UsersQuotes;
