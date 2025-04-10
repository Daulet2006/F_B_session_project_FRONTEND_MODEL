import React, { useEffect, useState } from 'react';
import { getCurrentUser } from '../services/authAPI';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getCurrentUser();
        setUser(data);
        if (data.role === 'admin') navigate('/admin');
        else if (data.role === 'seller') navigate('/seller');
        else if (data.role === 'vet') navigate('/vet');
      } catch (err) {
        navigate('/login');
      }
    };
    fetchUser();
  }, [navigate]);

  return <p className="text-center mt-10">Loading Dashboard...</p>;
};

export default Dashboard;