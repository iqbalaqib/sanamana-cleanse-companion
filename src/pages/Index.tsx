
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const user = localStorage.getItem('sanamana-user');
    if (user) {
      navigate('/');
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return null;
};

export default Index;
