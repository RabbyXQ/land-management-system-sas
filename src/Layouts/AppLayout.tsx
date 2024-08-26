import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faMap, faPlus, faEye } from '@fortawesome/free-solid-svg-icons';
import Head from "../Components/Head";
import { useNavigate } from 'react-router-dom';

const { Sider, Content, Footer } = Layout;

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(true);
  const [manualCollapse, setManualCollapse] = useState(false);
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
    setManualCollapse(!collapsed); // Set manual collapse state
  };

  const handleMouseEnter = () => {
    if (!manualCollapse) {
      setCollapsed(false); // Expand on hover if not manually collapsed
    }
  };

  const handleMouseLeave = () => {
    if (!manualCollapse) {
      setCollapsed(true); // Collapse on hover out if not manually collapsed
    }
  };

  const handleMenuClick = (e: any) => {
    const key = e.key;
    switch (key) {
      case '1':
        navigate('/dashboard'); // Navigate to Dashboard
        break;
      case '4':
        navigate('/land/add'); // Navigate to Add Land
        break;
      case '5':
        navigate('/lands'); // Navigate to View Land
        break;
      default:
        break;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <Sider
        width={250}
        collapsedWidth={80}
        collapsible
        collapsed={collapsed}
        onCollapse={toggleCollapsed}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ 
          background: '#ffffff',
          position: 'fixed',
          top: 64, // Adjust based on header height
          left: 0,
          bottom: 0,
          transition: 'all 0.3s ease',
          boxShadow: '2px 0 8px rgba(0, 0, 0, 0.1)',
          zIndex: 100,
        }}
      >
        <Menu theme="light" mode="inline" defaultSelectedKeys={['1']} onClick={handleMenuClick}>
          <Menu.Item key="1" icon={<FontAwesomeIcon icon={faTachometerAlt} />}>
            Dashboard
          </Menu.Item>
          <Menu.SubMenu key="sub1" icon={<FontAwesomeIcon icon={faMap} />} title="Lands">
            <Menu.Item key="4" icon={<FontAwesomeIcon icon={faPlus} />}>
              Add Land
            </Menu.Item>
            <Menu.Item key="5" icon={<FontAwesomeIcon icon={faEye} />}>
              View Land
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </Sider>

      {/* Main layout */}
      <Head />
      <Layout
        style={{
          marginLeft: collapsed ? 80 : 80,
          transition: 'margin-left 0.3s ease',
          marginTop: 64,
          filter: collapsed ? 'none' : 'blur(5px)', // Apply blur when Sider is expanded
        }}
      >
        <Content style={{ padding: '24px' }}>
          {children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          My App ©2024 Created by My Name
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
