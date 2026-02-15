import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navbar */}
            <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                    Logout
                </button>
            </nav>

            <div className="container mx-auto px-6 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Placeholder Cards for Future Content Management */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-2">Content Management</h3>
                        <p className="text-gray-600">Edit website content sections.</p>
                        <button className="mt-4 text-blue-600 hover:underline">Manage Content &rarr;</button>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-2">Contact Inquiries</h3>
                        <p className="text-gray-600">View messages from the contact form.</p>
                        <button className="mt-4 text-blue-600 hover:underline">View Inquiries &rarr;</button>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-2">Settings</h3>
                        <p className="text-gray-600">Manage admin account settings.</p>
                        <button className="mt-4 text-blue-600 hover:underline">Access Settings &rarr;</button>
                    </div>
                </div>

                <div className="mt-12 bg-white p-8 rounded-lg shadow-sm text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome, Admin!</h2>
                    <p className="text-gray-600">Select an option above to get started.</p>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
