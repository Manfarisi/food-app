import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = ({ url }) => {
  const [list, setList] = useState([]);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchList();
    fetchAllOrders();
  }, []);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching food list");
      }
    } catch (error) {
      toast.error("Failed to fetch food list");
    }
  };

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      toast.error("Failed to fetch orders");
    }
  };

  const categorizedList = list.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  const totalAmount = orders.reduce((sum, order) => sum + order.amount, 0);

  return (
    <div className="dashboard-container">
      <h2>Admin Dashboard</h2>
      <div className="dashboard-section">
        <h3>All Food List</h3>
        {Object.keys(categorizedList).map((category) => (
          <div key={category} className="category-section">
            <p><b>{category} ({categorizedList[category].length} items)</b></p>
          </div>
        ))}
      </div>

      <div className="dashboard-orders">
        <h3>Orders</h3>
        <p><b>Total Amount: ${totalAmount.toFixed(2)}</b></p>
      </div>
    </div>
  );
};

export default Dashboard;
