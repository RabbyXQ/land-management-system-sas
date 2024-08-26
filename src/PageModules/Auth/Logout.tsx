import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spin, Layout, Typography } from 'antd';

const { Content } = Layout;
const { Title } = Typography;

const Logout: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        const response = await fetch('http://localhost:4000/users/logout', {
          method: 'POST',
          credentials: 'include', // Include cookies for authentication
        });

        if (response.status === 200) {
          navigate('/login'); // Redirect to login page after successful logout
        } else {
          // Handle unexpected status codes
          console.error('Logout failed');
          navigate('/login'); // Redirect to login page even if logout fails
        }
      } catch (error) {
        console.error('Logout error:', error);
        navigate('/login'); // Redirect to login page in case of an error
      }
    };

    performLogout();
  }, [navigate]);

  return (
    <Layout style={{ height: '100vh', background: '#f0f2f5' }}>
      <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <Title level={2}>Logging out...</Title>
          <Spin size="large" />
        </div>
      </Content>
    </Layout>
  );
};

export default Logout;
