import React, { useState } from 'react';
import { Layout, Avatar, Button, Dropdown, Menu } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUser, faStore } from '@fortawesome/free-solid-svg-icons';
import { ChakraProvider, Box, Input, Text } from '@chakra-ui/react';
import ColorModeSwitcher from './ColorModeSwitcher';
import LanguageSwitcher from './LanguageSwitcher';
import { useNavigate } from 'react-router-dom';

const { Header } = Layout;

const Head: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:4000/users/logout', {
        method: 'POST',
        credentials: 'include', // Include cookies for authentication
      });

      if (response.ok) {
        // Redirect to login page or home page after logout
        navigate('/login');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const menu = (
    <Menu>
      <Menu.Item key="logout">
        <Button onClick={handleLogout} type="link">
          Logout
        </Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <ChakraProvider>
      <Header
        style={{
          background: '#ffffff',
          padding: 0,
          position: 'fixed',
          width: '100%',
          zIndex: 2,
          top: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Logo and Search Bar Container */}
        <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          {/* Logo Text */}
          <Text
            fontSize="18px"
            fontWeight="bold"
            color="blue.500"
            style={{ marginRight: '16px', marginLeft: '16px' }} // Margin left added
          >
            Jomir Hishab
          </Text>

          {/* Search Bar */}
          <Box
            flex="1"
            maxWidth="400px" // Reduced width
            margin="0 auto"
            display="flex"
            alignItems="center"
          >
            <Input
              placeholder="Search..."
              size="sm" // Adjust size as needed
              style={{
                width: '100%',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              }}
            />
          </Box>
        </div>

        {/* Icons */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Button
            icon={<FontAwesomeIcon icon={faBell} style={{ fontSize: '24px' }} />}
            style={{ margin: '0 16px', background: 'none', border: 'none' }}
          />
          <Button
            icon={<FontAwesomeIcon icon={faStore} style={{ fontSize: '24px' }} />}
            style={{ margin: '0 16px', background: 'none', border: 'none' }}
          />
          <Button
            icon={<FontAwesomeIcon icon={faUser} style={{ fontSize: '24px' }} />}
            style={{ margin: '0 16px', background: 'none', border: 'none' }}
          />

          <Dropdown overlay={menu} trigger={['click']}>
            <Avatar
              size="large"
              src="https://via.placeholder.com/150" // Replace with actual profile image URL
              style={{ backgroundColor: '#f56a00', borderRadius: '50%', marginLeft: '16px', marginRight: '16px' }} // Margin right added
            />
          </Dropdown>
        </div>
      </Header>
    </ChakraProvider>
  );
};

export default Head;
