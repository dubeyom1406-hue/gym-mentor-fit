import React, { useState, useEffect } from 'react';
import api from '../lib/api';
import { useAuth } from '../context/AuthContext';
import WorkoutForm from '../components/WorkoutForm';
import WorkoutList from '../components/WorkoutList';
import { Dumbbell } from 'lucide-react';

const Workouts = () => {
    const { user } = useAuth();
    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchWorkouts = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await api.get('/api/workouts', config);
            setWorkouts(data);
            setLoading(false);
        } catch (err) {
            setError(err.response && err.response.data.message ? err.response.data.message : err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            fetchWorkouts();
        }
    }, [user]);

    const addWorkout = async (workoutData) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await api.post('/api/workouts', workoutData, config);
            setWorkouts([data, ...workouts]);
        } catch (err) {
            setError(err.response && err.response.data.message ? err.response.data.message : err.message);
        }
    };

    const deleteWorkout = async (id) => {
        if (window.confirm('Are you sure you want to delete this workout?')) {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                await api.delete(`/api/workouts/${id}`, config);
                setWorkouts(workouts.filter((w) => w._id !== id));
            } catch (err) {
                setError(err.response && err.response.data.message ? err.response.data.message : err.message);
            }
        }
    };

    return (
        <div className="min-h-screen bg-black pt-20 px-4 sm:px-6 lg:px-8 pb-10">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center space-x-4 mb-8">
                    <div className="h-12 w-12 bg-primary rounded-full flex items-center justify-center">
                        <Dumbbell className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-white">My Workouts</h1>
                        <p className="text-gray-400">Track and manage your training plans</p>
                    </div>
                </div>

                {error && <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded-lg mb-6">{error}</div>}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                        <WorkoutForm onAdd={addWorkout} />
                    </div>
                    <div className="lg:col-span-2">
                        {loading ? (
                            <div className="text-center text-white">Loading...</div>
                        ) : (
                            <WorkoutList workouts={workouts} onDelete={deleteWorkout} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Workouts;
