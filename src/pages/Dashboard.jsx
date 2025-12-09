import React from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { User, Activity, Calendar, Settings } from 'lucide-react';
import DocumentList from '../components/DocumentList';

const Dashboard = () => {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-black pt-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-secondary/30 rounded-2xl p-8 border border-white/10 backdrop-blur-sm"
                >
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center space-x-4">
                            <div className="h-16 w-16 bg-primary rounded-full flex items-center justify-center">
                                <span className="text-2xl font-bold text-white">
                                    {user?.name?.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-white">Welcome back, {user?.name}!</h1>
                                <p className="text-gray-400">{user?.email}</p>
                            </div>
                        </div>
                        {user?.subscription === 'Premium' && (
                            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-2 rounded-full font-bold shadow-lg transform hover:scale-105 transition-transform flex items-center">
                                <span className="mr-2">👑</span> Premium Member
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-black/50 p-6 rounded-xl border border-white/5">
                            <div className="flex items-center space-x-3 mb-4">
                                <Activity className="h-6 w-6 text-primary" />
                                <h3 className="text-xl font-semibold text-white">Current Plan</h3>
                            </div>
                            <p className="text-gray-400">{user?.subscription || 'Free'} Plan</p>
                            {user?.subscription !== 'Premium' && (
                                <a href="/pricing" className="mt-4 inline-block text-primary hover:text-orange-400 text-sm font-medium">
                                    Upgrade to Premium
                                </a>
                            )}
                        </div>

                        <div className="bg-black/50 p-6 rounded-xl border border-white/5">
                            <div className="flex items-center space-x-3 mb-4">
                                <Calendar className="h-6 w-6 text-primary" />
                                <h3 className="text-xl font-semibold text-white">Next Workout</h3>
                            </div>
                            <p className="text-gray-400">No workouts scheduled</p>
                            <a href="/workouts" className="mt-4 inline-block text-primary hover:text-orange-400 text-sm font-medium">
                                Schedule Workout
                            </a>
                        </div>

                        <div className="bg-black/50 p-6 rounded-xl border border-white/5">
                            <div className="flex items-center space-x-3 mb-4">
                                <Settings className="h-6 w-6 text-primary" />
                                <h3 className="text-xl font-semibold text-white">Profile Settings</h3>
                            </div>
                            <p className="text-gray-400">Update your goals and stats</p>
                            <a
                                href="/profile"
                                className="mt-4 inline-block text-primary hover:text-orange-400 text-sm font-medium"
                            >
                                Edit Profile
                            </a>
                        </div>
                    </div>

                    <div className="mt-8">
                        <h2 className="text-2xl font-bold text-white mb-6">My Custom Plans</h2>
                        <DocumentList />
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Dashboard;
