import React, { useState, useEffect } from 'react';
import api from '../lib/api';
import { useAuth } from '../context/AuthContext';
import DietForm from '../components/DietForm';
import DietList from '../components/DietList';
import { Utensils } from 'lucide-react';

const Diet = () => {
    const { user } = useAuth();
    const [diets, setDiets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchDiets = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await api.get('/api/diets', config);
            setDiets(data);
            setLoading(false);
        } catch (err) {
            setError(err.response && err.response.data.message ? err.response.data.message : err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            fetchDiets();
        }
    }, [user]);

    const addDiet = async (dietData) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await api.post('/api/diets', dietData, config);
            setDiets([data, ...diets]);
        } catch (err) {
            setError(err.response && err.response.data.message ? err.response.data.message : err.message);
        }
    };

    const deleteDiet = async (id) => {
        if (window.confirm('Are you sure you want to delete this diet plan?')) {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                await api.delete(`/api/diets/${id}`, config);
                setDiets(diets.filter((d) => d._id !== id));
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
                        <Utensils className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-white">My Diet Plans</h1>
                        <p className="text-gray-400">Track your nutrition and meal plans</p>
                    </div>
                </div>

                {error && <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded-lg mb-6">{error}</div>}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                        <DietForm onAdd={addDiet} />
                    </div>
                    <div className="lg:col-span-2">
                        {loading ? (
                            <div className="text-center text-white">Loading...</div>
                        ) : (
                            <DietList diets={diets} onDelete={deleteDiet} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Diet;
