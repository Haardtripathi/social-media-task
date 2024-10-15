import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig.js';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null); // State for selected image
    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('/admin/dashboard');
                setUsers(response.data);
            } catch (err) {
                setError('Error fetching users.Unauthorized Access');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const openModal = (image) => {
        setSelectedImage(image); // Set the selected image
        setIsModalOpen(true); // Open the modal
    };

    const closeModal = () => {
        setIsModalOpen(false); // Close the modal
        setSelectedImage(null); // Reset selected image
    };

    if (loading) return <div className="text-center mt-4">Loading...</div>;
    if (error) return <div className="text-red-500 text-center mt-4">{error}</div>;

    return (
        <div className="max-w-7xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-6 text-center">Admin Users</h1>
            <table className="min-w-full border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border border-gray-300 p-4 text-left">Full Name</th>
                        <th className="border border-gray-300 p-4 text-left">Social Media Handle</th>
                        <th className="border border-gray-300 p-4 text-left">Uploaded Images</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id} className="hover:bg-gray-50">
                            <td className="border border-gray-300 p-4">{user.fullName}</td>
                            <td className="border border-gray-300 p-4">{user.socialMediaHandle}</td>
                            <td className="border border-gray-300 p-4">
                                <div className="flex flex-wrap">
                                    {user.uploadedImages.map((image, index) => (
                                        <img
                                            key={index}
                                            src={`data:${image.contentType};base64,${image.data}`}
                                            alt={`Uploaded image ${index + 1}`}
                                            className="w-20 h-20 object-cover rounded-md m-1 cursor-pointer"
                                            onClick={() => openModal(`data:${image.contentType};base64,${image.data}`)} // Open modal on click
                                        />
                                    ))}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal for displaying the selected image */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
                    <div className="bg-white p-4 rounded-lg relative">
                        <button
                            className="absolute top-2 right-2 bg-red-600 text-black rounded-full p-1 hover:bg-red-700 transition duration-300" // Circular red button with black text
                            onClick={closeModal}
                        >
                            &times; {/* Black cross */}
                        </button>
                        <img
                            src={selectedImage}
                            alt="Selected"
                            className="max-w-full max-h-full"
                        />
                    </div>
                </div>
            )}

        </div>
    );
};

export default AdminUsers;
