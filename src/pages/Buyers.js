import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

export default function Buyers() {
  const [buyers, setBuyers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBuyers();
  }, []);

  const fetchBuyers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/buyers', { withCredentials: true });
      setBuyers(res.data.buyers || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteBuyer = async (id) => {
    if (!window.confirm('Delete this buyer?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/user/${id}`, { withCredentials: true });
      setBuyers(buyers.filter(b => b._id !== id));
      alert('Buyer deleted');
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
          <h3 className="mb-4">🛍️ Manage Buyers</h3>

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
                  {buyers.map(buyer => (
                    <tr key={buyer._id}>
                      <td>{buyer.name}</td>
                      <td>{buyer.email}</td>
                      <td>{buyer.phone}</td>
                      <td>{buyer.location}</td>
                      <td>
                        <button 
                          className="btn btn-danger btn-sm"
                          onClick={() => deleteBuyer(buyer._id)}
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