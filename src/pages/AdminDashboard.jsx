import React, { useEffect, useState } from 'react';
import api from '../lib/api';
import { useAuth } from '../context/AuthContext';
import { Trash2, Search, User, Mail, Shield, CreditCard, CheckCircle, XCircle } from 'lucide-react';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const { user } = useAuth();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                const { data } = await api.get('/api/users', config);
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [user.token]);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                await api.delete(`/api/users/${id}`, config);
                setUsers(users.filter((u) => u._id !== id));
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    };

    const handleSubscriptionUpdate = async (id, newSubscription) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            await api.put(`/api/users/${id}/subscription`, { subscription: newSubscription }, config);
            setUsers(users.map((u) => (u._id === id ? { ...u, subscription: newSubscription } : u)));
        } catch (error) {
            console.error('Error updating subscription:', error);
            alert(`Failed to update subscription: ${error.response?.data?.message || error.message}`);
        }
    };

    const filteredUsers = users.filter(
        (u) =>
            u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-black pt-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-4 md:mb-0">Admin Dashboard</h1>
                    <div className="relative w-full md:w-64">
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:border-primary"
                        />
                        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
                    </div>
                </div>

                {loading ? (
                    <div className="text-white text-center">Loading...</div>
                ) : (
                    <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 shadow-xl">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-gray-300">
                                <thead className="bg-gray-800 text-gray-100 uppercase text-xs font-semibold">
                                    <tr>
                                        <th className="px-6 py-4">User</th>
                                        <th className="px-6 py-4">Role</th>
                                        <th className="px-6 py-4">Subscription</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-800">
                                    {filteredUsers.map((u) => (
                                        <tr key={u._id} className="hover:bg-gray-800/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold mr-3">
                                                        {u.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-white">{u.name}</div>
                                                        <div className="text-sm text-gray-500">{u.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                {u.isAdmin ? (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                                        <Shield className="w-3 h-3 mr-1" /> Admin
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                        <User className="w-3 h-3 mr-1" /> User
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <select
                                                    value={u.subscription}
                                                    onChange={(e) => handleSubscriptionUpdate(u._id, e.target.value)}
                                                    className={`bg-transparent border border-gray-700 rounded px-2 py-1 text-sm focus:outline-none focus:border-primary ${u.subscription === 'Premium'
                                                        ? 'text-green-400 border-green-500/50'
                                                        : u.subscription === 'Basic'
                                                            ? 'text-blue-400 border-blue-500/50'
                                                            : 'text-gray-400'
                                                        }`}
                                                >
                                                    <option value="Free" className="bg-gray-900 text-gray-400">Free</option>
                                                    <option value="Basic" className="bg-gray-900 text-blue-400">Basic</option>
                                                    <option value="Premium" className="bg-gray-900 text-green-400">Premium</option>
                                                </select>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                {!u.isAdmin && (
                                                    <button
                                                        onClick={() => handleDelete(u._id)}
                                                        className="text-red-400 hover:text-red-300 transition-colors p-2 hover:bg-red-400/10 rounded-full"
                                                        title="Delete User"
                                                    >
                                                        <Trash2 className="h-5 w-5" />
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {filteredUsers.length === 0 && (
                            <div className="p-8 text-center text-gray-500">
                                No users found matching your search.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
