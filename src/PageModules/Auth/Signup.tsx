import React, { useState } from 'react';
import { Form, Input, Button, Typography, message, Layout, Row, Col, Spin } from 'antd';
import { UserOutlined, LockOutlined, IdcardOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;
const { Content } = Layout;

const Signup: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values: { email: string; password: string; type: string }) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:4000/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
        credentials: 'include', // Include cookies for authentication
      });

      if (response.status === 201) { // Assuming 201 Created is returned on successful signup
        message.success('Signup successful!');
        navigate('/login'); // Redirect to login page or another route
      } else {
        message.error('Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Signup error:', error);
      message.error('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout style={{ height: '100vh', background: '#f0f2f5' }}>
      <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Row justify="center" align="middle" style={{ width: '100%' }}>
          <Col xs={24} sm={12} md={8}>
            <div style={{ padding: '24px', background: '#ffffff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
              <Title level={2} style={{ textAlign: 'center', marginBottom: '24px' }}>Sign Up</Title>
              {loading ? (
                <div style={{ textAlign: 'center' }}>
                  <Spin size="large" />
                </div>
              ) : (
                <Form
                  name="signup"
                  initialValues={{ remember: true }}
                  onFinish={handleSubmit}
                  layout="vertical"
                >
                  <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
                  >
                    <Input
                      prefix={<UserOutlined />}
                      placeholder="Email"
                    />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                  >
                    <Input.Password
                      prefix={<LockOutlined />}
                      placeholder="Password"
                    />
                  </Form.Item>
                  <Form.Item
                    name="type"
                    rules={[{ required: true, message: 'Please select your type!' }]}
                  >
                    <Input
                      prefix={<IdcardOutlined />}
                      placeholder="Type (e.g., Admin, User)"
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                      Sign Up
                    </Button>
                  </Form.Item>
                  <Form.Item style={{ textAlign: 'center' }}>
                    <Button type="link" onClick={() => navigate('/login')}>
                      Already have an account? Log in
                    </Button>
                  </Form.Item>
                </Form>
              )}
            </div>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Signup;
