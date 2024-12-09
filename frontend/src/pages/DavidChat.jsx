import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const DavidChat = () => {
  const { order_id } = useParams();
  const [chat, setChat] = useState([]);
  const [details, setDetails] = useState([]);
  const [message, setMessage] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  // Fetch chat messages based on order_id
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.get(`http://localhost:5050/getdetails/${order_id}`);
        const details_ = response1.data?.data || [];
        setDetails(details_);
      } catch (error) {
        console.error("Error fetching chat data: ", error.message);
      }
    };
    fetchData();
  }, [order_id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response2 = await axios.get(`http://localhost:5050/getchats/${order_id}`);
        const chats_ = response2.data?.data || [];
        setChat(chats_);
      } catch (error) {
        console.error("Error fetching chat data: ", error.message);
      }
    };
    fetchData();
  }, [order_id]);

  // Send a new message
  const handleSubmit1 = async (e) => {
    e.preventDefault();

    try {
      if (details.length > 0) {
        const response = await axios.post(`http://localhost:5050/chat/${order_id}`, {
          orderid: details[0].order_id,
          customerid: details[0].customer_id,
          message,
          by:'David'
        });
        console.log("Message Sent: ", response.data);

        // Add the new message to the chat state
        setChat((prevChat) => [
          ...prevChat,
          {
            order_id: details[0].order_id,
            customer_id: details[0].customer_id,
            message
          },
        ]);
        setResponseMessage("Message sent successfully!");
        setMessage("");
      }
    } catch (error) {
      setResponseMessage("Failed to send message. Please try again.");
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Chat Messages</h1>

      {/* Display Chat Messages */}
      <div
        style={{
          maxHeight: "300px",
          overflowY: "auto",
          border: "1px solid #ccc",
          padding: "10px",
          marginBottom: "20px",
        }}
      >
        {chat.length > 0 ? (
        chat.map((item, index) => (
            <div key={index}>
            {item.by === "Client" ? (
                <p>
                <strong>Client's Message:</strong> {item.message}
                </p>
            ) : (
                <p>
                <strong>David's Message:</strong> {item.message}
                </p>
            )}
            </div>
        ))
        ) : (
        <p>No messages found for this order.</p>
        )}

      </div>

      {/* Send Message Form */}
      <form
        onSubmit={handleSubmit1}
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "400px",
        }}>
        {details.length > 0 ? (
          <div>
            <p>Order_Id: {details[0].order_id}</p>
            <p>Customer_Id: {details[0].customer_id}</p>
          </div>
        ) : (
          <p>Loading chat details...</p>
        )}
        <label>
          David Message:
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows="4"
            style={{ marginBottom: "10px", padding: "8px" }}
          ></textarea>
        </label>
        <button>
          Send Message
        </button>
      </form>
      {responseMessage && (
        <p>
          {responseMessage}
        </p>
      )}
    </div>
  );
};

export default DavidChat;
