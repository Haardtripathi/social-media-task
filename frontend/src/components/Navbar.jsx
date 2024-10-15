// src/components/Navbar.js
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth'; // Ensure this function checks if the user is authenticated

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear the token from local storage
        localStorage.removeItem('adminToken');
        navigate('/admin/login'); // Redirect to login after logout
    };

    return (
        <nav className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-500 to-blue-700 shadow-md">
            <h1 className="text-2xl font-bold text-white">Social Media Task</h1>
            <div>
                {isAuthenticated() ? (
                    <>
                        <Link
                            to="/admin/dashboard"
                            className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-lg shadow hover:bg-blue-100 transition duration-300 ease-in-out"
                        >
                            Dashboard
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="ml-4 bg-red-600 text-white font-semibold px-4 py-2 rounded-lg shadow hover:bg-red-500 transition duration-300 ease-in-out"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link
                            to="/admin/login"
                            className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-lg shadow hover:bg-blue-100 transition duration-300 ease-in-out"
                        >
                            Login
                        </Link>
                        <Link
                            to="/users"
                            className="ml-4 bg-white text-blue-600 font-semibold px-4 py-2 rounded-lg shadow hover:bg-blue-100 transition duration-300 ease-in-out"
                        >
                            Add User
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
