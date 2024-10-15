// UserUpload.js
import React, { useState } from 'react';
import axios from '../axiosConfig.js';
import { useNavigate, Link } from 'react-router-dom';

const UserUpload = () => {
    const [fullName, setFullName] = useState('');
    const [socialMediaHandle, setSocialMediaHandle] = useState('');
    const [images, setImages] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setImages((prevImages) => [...prevImages, ...selectedFiles]); // Concatenate new files with existing ones
        const imagePreviews = selectedFiles.map(file => URL.createObjectURL(file));
        setPreviewImages((prevPreviews) => [...prevPreviews, ...imagePreviews]); // Concatenate new previews with existing ones
    };

    const handleCancelImage = (index) => {
        const newImages = images.filter((_, i) => i !== index);
        const newPreviewImages = previewImages.filter((_, i) => i !== index);
        setImages(newImages);
        setPreviewImages(newPreviewImages);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('fullName', fullName);
        formData.append('socialMediaHandle', socialMediaHandle);
        for (let i = 0; i < images.length; i++) {
            formData.append('images', images[i]);
        }

        try {
            const response = await axios.post('/users', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert(response.data.message);
            navigate("/admin/login");
        } catch (error) {
            alert('Error: ' + error.response.data.message);
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
            <h1 className="text-xl font-bold mb-4">User Upload</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Full Name:</label>
                    <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Social Media Handle:</label>
                    <input
                        type="text"
                        value={socialMediaHandle}
                        onChange={(e) => setSocialMediaHandle(e.target.value)}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Upload Images:</label>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>

                {/* Preview Images */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {previewImages.map((imgSrc, index) => (
                        <div key={index} className="relative">
                            <img src={imgSrc} alt={`Preview ${index}`} className="w-24 h-24 object-cover rounded-md" />
                            <button
                                type="button"
                                onClick={() => handleCancelImage(index)}
                                className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
                            >
                                &times;
                            </button>
                        </div>
                    ))}
                </div>

                <button
                    type="submit"
                    className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default UserUpload;
