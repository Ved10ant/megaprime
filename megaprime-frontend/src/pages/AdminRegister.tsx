import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { authService } from '../services/api';

const AdminRegister: React.FC = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);

        try {
            const response = await authService.register(formData.email, formData.password);
            localStorage.setItem('token', response.data.token);
            navigate('/admin/dashboard');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Admin Register</h2>

                {/* Google Sign Up */}
                <div className="mb-6 flex justify-center">
                    <GoogleLogin
                        onSuccess={credentialResponse => {
                            console.log(credentialResponse);
                            alert("Google Register Success! Check console. Backend integration pending.");
                        }}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                        text="signup_with"
                    />
                </div>

                <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">Or register with email</span>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="admin@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="********"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="********"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>

                <p className="mt-4 text-center text-gray-600">
                    Already have an account? <Link to="/admin/login" className="text-blue-600 hover:underline">Login here</Link>
                </p>
            </div>
        </div>
    );
};

export default AdminRegister;
