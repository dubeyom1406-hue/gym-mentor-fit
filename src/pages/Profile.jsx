import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { User, Save, Activity, Ruler, Weight, Target } from 'lucide-react';

const Profile = () => {
    const { user, updateProfile } = useAuth();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('male');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [goal, setGoal] = useState('fitness');
    const [activityLevel, setActivityLevel] = useState('moderate');

    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (user) {
            setName(user.name || '');
            setEmail(user.email || '');
            setAge(user.age || '');
            setGender(user.gender || 'male');
            setHeight(user.height || '');
            setWeight(user.weight || '');
            setGoal(user.goal || 'fitness');
            setActivityLevel(user.activityLevel || 'moderate');
        }
    }, [user]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
        } else {
            try {
                await updateProfile({
                    _id: user._id,
                    name,
                    email,
                    password,
                    age,
                    gender,
                    height,
                    weight,
                    goal,
                    activityLevel
                });
                setSuccess(true);
                setMessage(null);
                setError(null);
                setTimeout(() => setSuccess(false), 3000);
            } catch (err) {
                setError(err.response && err.response.data.message ? err.response.data.message : err.message);
                setSuccess(false);
            }
        }
    };

    return (
        <div className="min-h-screen bg-black pt-20 px-4 sm:px-6 lg:px-8 pb-10">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-secondary/30 rounded-2xl p-8 border border-white/10 backdrop-blur-sm"
                >
                    <div className="flex items-center space-x-4 mb-8">
                        <div className="h-16 w-16 bg-primary rounded-full flex items-center justify-center">
                            <User className="h-8 w-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-white">Profile Settings</h1>
                            <p className="text-gray-400">Update your personal information and fitness goals</p>
                        </div>
                    </div>

                    {message && <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded-lg mb-6">{message}</div>}
                    {error && <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded-lg mb-6">{error}</div>}
                    {success && <div className="bg-green-500/10 border border-green-500 text-green-500 px-4 py-2 rounded-lg mb-6">Profile Updated Successfully</div>}

                    <form onSubmit={submitHandler} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Personal Info */}
                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold text-white border-b border-white/10 pb-2">Personal Info</h3>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        className="block w-full px-4 py-3 border border-white/10 rounded-lg bg-black/50 text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Email Address</label>
                                    <input
                                        type="email"
                                        className="block w-full px-4 py-3 border border-white/10 rounded-lg bg-black/50 text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">New Password</label>
                                    <input
                                        type="password"
                                        placeholder="Leave blank to keep current"
                                        className="block w-full px-4 py-3 border border-white/10 rounded-lg bg-black/50 text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Confirm New Password</label>
                                    <input
                                        type="password"
                                        placeholder="Confirm new password"
                                        className="block w-full px-4 py-3 border border-white/10 rounded-lg bg-black/50 text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Physical Stats */}
                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold text-white border-b border-white/10 pb-2">Physical Stats</h3>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Age</label>
                                        <input
                                            type="number"
                                            className="block w-full px-4 py-3 border border-white/10 rounded-lg bg-black/50 text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                                            value={age}
                                            onChange={(e) => setAge(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Gender</label>
                                        <select
                                            className="block w-full px-4 py-3 border border-white/10 rounded-lg bg-black/50 text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                                            value={gender}
                                            onChange={(e) => setGender(e.target.value)}
                                        >
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Height (cm)</label>
                                        <div className="relative">
                                            <Ruler className="absolute left-3 top-3.5 h-5 w-5 text-gray-500" />
                                            <input
                                                type="number"
                                                className="block w-full pl-10 pr-4 py-3 border border-white/10 rounded-lg bg-black/50 text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                                                value={height}
                                                onChange={(e) => setHeight(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Weight (kg)</label>
                                        <div className="relative">
                                            <Weight className="absolute left-3 top-3.5 h-5 w-5 text-gray-500" />
                                            <input
                                                type="number"
                                                className="block w-full pl-10 pr-4 py-3 border border-white/10 rounded-lg bg-black/50 text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                                                value={weight}
                                                onChange={(e) => setWeight(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Fitness Goal</label>
                                    <div className="relative">
                                        <Target className="absolute left-3 top-3.5 h-5 w-5 text-gray-500" />
                                        <select
                                            className="block w-full pl-10 pr-4 py-3 border border-white/10 rounded-lg bg-black/50 text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                                            value={goal}
                                            onChange={(e) => setGoal(e.target.value)}
                                        >
                                            <option value="weight_loss">Weight Loss</option>
                                            <option value="weight_gain">Weight Gain</option>
                                            <option value="muscle_gain">Muscle Gain</option>
                                            <option value="fitness">General Fitness</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Activity Level</label>
                                    <div className="relative">
                                        <Activity className="absolute left-3 top-3.5 h-5 w-5 text-gray-500" />
                                        <select
                                            className="block w-full pl-10 pr-4 py-3 border border-white/10 rounded-lg bg-black/50 text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                                            value={activityLevel}
                                            onChange={(e) => setActivityLevel(e.target.value)}
                                        >
                                            <option value="sedentary">Sedentary (Little to no exercise)</option>
                                            <option value="light">Light (Exercise 1-3 days/week)</option>
                                            <option value="moderate">Moderate (Exercise 3-5 days/week)</option>
                                            <option value="active">Active (Exercise 6-7 days/week)</option>
                                            <option value="very_active">Very Active (Physical job or training)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end pt-6">
                            <button
                                type="submit"
                                className="flex items-center space-x-2 bg-primary hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300"
                            >
                                <Save className="h-5 w-5" />
                                <span>Save Changes</span>
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default Profile;
