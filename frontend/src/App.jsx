// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import UserUpload from './components/UserUpload';
import AdminUsers from './components/AdminUsers';
import AdminLogin from './components/AdminLogin';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />} >

          <Route path='/admin/login' element={<AdminLogin />}></Route>
          <Route path="/admin/dashboard" element={<AdminUsers />}></Route>

          <Route path="/users" element={<UserUpload />}></Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
