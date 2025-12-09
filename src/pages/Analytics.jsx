import React, { useState, useEffect } from 'react';
import api from '../lib/api';
import { useAuth } from '../context/AuthContext';
import ActivityChart from '../components/Charts/ActivityChart';
import WeightChart from '../components/Charts/WeightChart';
import { Lock, TrendingUp, Activity, Flame } from 'lucide-react';

const Analytics = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            if (user?.subscription === 'Premium') {
                try {
                    const config = {
                        headers: {
                            Authorization: `Bearer ${user.token}`,
                        },
                    };
                    const { data } = await api.get('/api/stats', config);
                    setStats(data);
                } catch (error) {
                    console.error(error);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        fetchStats();
    }, [user]);

    if (!user) return null;

    if (user.subscription !== 'Premium') {
        return (
            <div className="min-h-screen bg-black pt-20 px-4 flex items-center justify-center">
                <div className="text-center max-w-md">
                    <div className="bg-secondary/30 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
                        <div className="h-16 w-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Lock className="h-8 w-8 text-gray-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-4">Premium Feature</h2>
                        <p className="text-gray-400 mb-8">
                            Upgrade to Premium to access advanced analytics, progress tracking, and detailed insights.
                        </p>
                        <a
                            href="/pricing"
                            className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-orange-600 transition-colors"
                        >
                            Upgrade Now
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    if (loading) {
        return <div className="min-h-screen bg-black pt-20 text-center text-white">Loading stats...</div>;
    }

    return (
        <div className="min-h-screen bg-black pt-20 px-4 sm:px-6 lg:px-8 pb-10">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white">Analytics Dashboard</h1>
                    <p className="text-gray-400">Track your progress and achievements</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-secondary/30 p-6 rounded-xl border border-white/10">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-gray-400">Total Workouts</h3>
                            <Activity className="h-6 w-6 text-primary" />
                        </div>
                        <p className="text-3xl font-bold text-white">{stats?.totalWorkouts || 0}</p>
                    </div>
                    <div className="bg-secondary/30 p-6 rounded-xl border border-white/10">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-gray-400">Calories Tracked</h3>
                            <Flame className="h-6 w-6 text-orange-500" />
                        </div>
                        <p className="text-3xl font-bold text-white">{stats?.totalCalories || 0}</p>
                    </div>
                    <div className="bg-secondary/30 p-6 rounded-xl border border-white/10">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-gray-400">Current Weight</h3>
                            <TrendingUp className="h-6 w-6 text-green-500" />
                        </div>
                        <p className="text-3xl font-bold text-white">{stats?.weight || 0} kg</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-secondary/30 p-6 rounded-xl border border-white/10">
                        <h3 className="text-xl font-bold text-white mb-6">Weekly Activity</h3>
                        {stats?.activityData && <ActivityChart data={stats.activityData} />}
                    </div>
                    <div className="bg-secondary/30 p-6 rounded-xl border border-white/10">
                        <h3 className="text-xl font-bold text-white mb-6">Weight Progress</h3>
                        <WeightChart currentWeight={stats?.weight || 70} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
