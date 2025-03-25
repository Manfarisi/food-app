import React, { useContext, useEffect, useState } from 'react';
import "./MyOrders.css";
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/frontend_assets/assets';

const MyOrders = () => {
  const [data, setData] = useState([]);
  const { url, token } = useContext(StoreContext);

  const fetchOrders = async () => {
    const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
    setData(response.data.data);
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className='my-orders'>
      <h2>My Orders</h2>
      <div className="container">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Items</th>
              <th>Amount</th>
              <th>Total Items</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((order, index) => (
              <tr key={index}>
                <td><img src={assets.parcel_icon} alt="" className="order-img" /></td>
                <td>{order.items.map((item, i) => (
                  <span key={i}>{item.name} x {item.quantity}{i !== order.items.length - 1 ? ', ' : ''}</span>
                ))}</td>
                <td>${order.amount}.00</td>
                <td>{order.items.length}</td>
                <td className='simbol'><span>&#x25cf; </span><b>{order.status}</b></td>
                
                <td>
                  <button onClick={fetchOrders} className="track-btn">Track Order</button>
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;
