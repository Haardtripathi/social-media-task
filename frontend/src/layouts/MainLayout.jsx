// src/layouts/MainLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const MainLayout = () => {
    return (
        <div>
            <Navbar />
            <main className="p-6">
                <Outlet /> {/* Render the child routes here */}
            </main>
        </div>
    );
};

export default MainLayout;
