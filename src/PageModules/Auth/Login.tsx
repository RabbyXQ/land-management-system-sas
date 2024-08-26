import React, { useState } from 'react';
import { Form, Input, Button, Typography, message, Layout, Row, Col, Spin, Space } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

const { Title } = Typography;
const { Content } = Layout;

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState<any>(null); // State to store response data
  const navigate = useNavigate();

  const handleSubmit = async (values: { email: string; pass: string }) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:4000/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
        credentials: 'include', // Include cookies for authentication
      });

      const data = await response.json();
      setResponseData(data); // Store the response data

      if (response.ok) {
        message.success('Login successful!');
        navigate('/'); // Redirect to home or another protected route
      } else {
        message.error(`Login failed: ${data.message || 'Invalid credentials. Please try again.'}`);
      }
    } catch (error) {
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
              <Title level={2} style={{ textAlign: 'center', marginBottom: '24px' }}>Login</Title>
              {loading ? (
                <div style={{ textAlign: 'center' }}>
                  <Spin size="large" />
                </div>
              ) : (
                <Form
                  name="login"
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
                      autoComplete="email"
                    />
                  </Form.Item>
                  <Form.Item
                    name="pass"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                  >
                    <Input.Password
                      prefix={<LockOutlined />}
                      placeholder="Password"
                      autoComplete="current-password"
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                      Log in
                    </Button>
                  </Form.Item>
                  <Form.Item style={{ textAlign: 'center' }}>
                    <Space>
                      Don't have an account? <Link to="/signup">Sign up</Link>
                    </Space>
                  </Form.Item>
                </Form>
              )}
              {responseData && (
                <div style={{ marginTop: '20px', padding: '10px', background: '#f7f7f7', borderRadius: '4px' }}>
                  <pre>{JSON.stringify(responseData, null, 2)}</pre>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Login;
