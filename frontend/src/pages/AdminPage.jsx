import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const AdminPage = () => {
  const [orders, setOrders] = useState([])

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5050/admin')
        const data = await response.json()
        setOrders(data.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchUsers()
  }, [])

  // Handle delete user
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5050/delete/${id}`, { method: 'DELETE' })
      setOrders(orders.filter(order => order.id !== id))
    } catch (error) {
      console.log(error)
    }
  }

  const openInNewTab = (url) => {
    window.open(url, '_blank','noopener,noreferrer')
  }

  return (
    <div className="container">
        <h2>Your Curious Customers</h2>
        <button onClick={() => openInNewTab('/search')}>Go to the search page?</button>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer ID</th>
              <th>Address</th>
              <th>Square Feet</th>
              <th>Budget</th>
              <th>Pictures</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.order_id}>
                <td>{order.order_id}</td>
                <td>{order.customer_id}</td>
                <td>{order.address}</td>
                <td>{order.square_feet}</td>
                <td>{order.budget}</td>
                <td>{order.pictures}</td>
                <td>{order.date = new Date(order.date).toLocaleString()}</td>
                <td>{order.status}</td>
                <td>
                  <Link to = {`/davidchat/${order.order_id}`}>
                    <button className="update-btn">Negotiate</button>
                  </Link>
                  <button className="delete-btn" onClick={() => handleDelete(order.order_id)}>Accept</button>
                  <button className="delete-btn" onClick={() => handleDelete(order.order_id)}>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  )
}

export default AdminPage
