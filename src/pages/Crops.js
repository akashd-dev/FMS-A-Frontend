import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

export default function Crops() {
  const [crops, setCrops] = useState([]);

  useEffect(() => {
    fetchCrops();
  }, []);

  const fetchCrops = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/crops/all', { withCredentials: true });
      setCrops(res.data.crops || []);
    } catch (err) {}
  };

  const deleteCrop = async (id) => {
    if (!window.confirm('Delete this crop?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/crop/${id}`, { withCredentials: true });
      setCrops(crops.filter(c => c._id !== id));
      alert('Crop deleted');
    } catch (err) {
      alert('Failed to delete crop');
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div style={{ marginLeft: '270px', width: '100%' }}>
        <Navbar />
        <div className="container mt-4">
          <h3 className="mb-4">🌱 Manage All Crops</h3>
          <div className="card">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Crop Name</th>
                  <th>Farmer</th>
                  <th>Price (₹)</th>
                  <th>Quantity (kg)</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {crops.map(crop => (
                  <tr key={crop._id}>
                    <td>{crop.name}</td>
                    <td>{crop.farmerId?.name || 'Unknown'}</td>
                    <td>{crop.price}</td>
                    <td>{crop.quantity}</td>
                    <td>
                      <button 
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteCrop(crop._id)}
                      >
                        Delete
                      </button>
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