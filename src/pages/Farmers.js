import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

export default function Farmers() {
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFarmers();
  }, []);

  const fetchFarmers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/farmers', { withCredentials: true });
      setFarmers(res.data.farmers || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteFarmer = async (id) => {
    if (!window.confirm('Delete this farmer?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/user/${id}`, { withCredentials: true });
      setFarmers(farmers.filter(f => f._id !== id));
      alert('Farmer deleted');
    } catch (err) {
      alert('Failed to delete');
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div style={{ marginLeft: '270px', width: '100%' }}>
        <Navbar />
        <div className="container mt-4">
          <h3 className="mb-4">👨‍🌾 Manage Farmers</h3>

          {loading ? <p>Loading...</p> : (
            <div className="card">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Location</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {farmers.map(farmer => (
                    <tr key={farmer._id}>
                      <td>{farmer.name}</td>
                      <td>{farmer.email}</td>
                      <td>{farmer.phone}</td>
                      <td>{farmer.location}</td>
                      <td>
                        <button 
                          className="btn btn-danger btn-sm"
                          onClick={() => deleteFarmer(farmer._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}