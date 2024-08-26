import React from 'react';
import ColorModeSwitcher from './Components/ColorModeSwitcher';
import LanguageSwitcher from './Components/LanguageSwitcher';
import Land from './Components/Land';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Map from './Components/Map';
import logo from './logo.svg';
import './App.css';
import { Box } from '@chakra-ui/react';
import ViewLand from './PageModules/Land/ViewLand';
import AppLayout from './Layouts/AppLayout';
import AddLand from './PageModules/Land/AddLand';
import Lands from './PageModules/Land/Lands';
import Login from './PageModules/Auth/Login';
import Signup from './PageModules/Auth/Signup';
import Logout from './PageModules/Auth/Logout';
import AuthGuard from './Components/AuthGuard';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<AuthGuard><></></AuthGuard>} />

        <Route path="/land/:id" element={<ViewLand />} />
        <Route path="/land/add" element={<AddLand/>} />
        <Route path="/lands" element={<Lands/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/logout" element={<Logout/>} />
      </Routes>
  </Router>
  );
}

export default App;
