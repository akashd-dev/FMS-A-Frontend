import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/orders', { withCredentials: true });
      setOrders(res.data.orders || []);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div style={{ marginLeft: '270px', width: '100%' }}>
        <Navbar />
        <div className="container mt-4">
          <h3 className="mb-4">📦 All System Orders</h3>
          <div className="card">
            <table className="table">
              <thead>
                <tr>
                  <th>Buyer</th>
                  <th>Farmer</th>
                  <th>Crop</th>
                  <th>Quantity</th>
                  <th>Total (₹)</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order._id}>
                    <td>{order.buyerId?.name}</td>
                    <td>{order.farmerId?.name}</td>
                    <td>{order.cropId?.name}</td>
                    <td>{order.quantity} kg</td>
                    <td>₹{order.totalPrice}</td>
                    <td>
                      <span className={`badge ${order.status === 'pending' ? 'bg-warning' : 'bg-success'}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}