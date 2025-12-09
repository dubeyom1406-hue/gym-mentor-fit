import React, { useState } from 'react';
import { Check, X, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Pricing = () => {
    const { user, updateProfile } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleWhatsAppPayment = (plan) => {
        if (!user) {
            navigate('/login?redirect=/pricing');
            return;
        }
        const message = `Hello, I want to buy the ${plan} Plan. My email is ${user?.email || 'N/A'}.`;
        const url = `https://wa.me/919931426338?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    return (
        <div className="min-h-screen bg-black pt-20 pb-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Choose Your Transformation</h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Whether you're just starting or looking for a complete transformation, we have the perfect plan for you.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {/* Basic Plan */}
                    <div className="bg-white/5 rounded-3xl border border-white/10 overflow-hidden flex flex-col">
                        <div className="p-8 border-b border-white/10">
                            <h2 className="text-2xl font-bold text-white mb-2">Basic Plan</h2>
                            <p className="text-gray-400 mb-6">Best for beginners who need guidance.</p>
                            <div className="flex items-baseline">
                                <span className="text-5xl font-bold text-white">₹299</span>
                                <span className="text-xl text-gray-400 ml-2">/month</span>
                            </div>
                            <button
                                onClick={() => handleWhatsAppPayment('Basic')}
                                disabled={user?.subscription === 'Basic' || user?.subscription === 'Premium'}
                                className="w-full mt-8 bg-white text-black py-4 rounded-xl font-bold hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                            >
                                {user?.subscription === 'Basic' ? 'Current Plan' : 'Buy Now'}
                            </button>
                        </div>
                        <div className="p-8 space-y-8 flex-1">
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-4">Workout Plans (Limited)</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start text-gray-300"><Check className="h-5 w-5 text-green-500 mr-3 shrink-0" /> 3-day weekly beginner routine</li>
                                    <li className="flex items-start text-gray-300"><Check className="h-5 w-5 text-green-500 mr-3 shrink-0" /> Home + No-equipment workouts</li>
                                    <li className="flex items-start text-gray-300"><Check className="h-5 w-5 text-green-500 mr-3 shrink-0" /> Basic fat-loss or muscle-gain plan</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-4">Diet Plan (Basic)</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start text-gray-300"><Check className="h-5 w-5 text-green-500 mr-3 shrink-0" /> Simple calorie-based diet</li>
                                    <li className="flex items-start text-gray-300"><Check className="h-5 w-5 text-green-500 mr-3 shrink-0" /> Veg/Non-Veg options</li>
                                    <li className="flex items-start text-gray-300"><Check className="h-5 w-5 text-green-500 mr-3 shrink-0" /> 1 fixed weekly meal plan</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-4">App Features</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start text-gray-300"><Check className="h-5 w-5 text-green-500 mr-3 shrink-0" /> Daily workout & diet tracker</li>
                                    <li className="flex items-start text-gray-300"><Check className="h-5 w-5 text-green-500 mr-3 shrink-0" /> BMI & Calorie Calculator</li>
                                    <li className="flex items-start text-gray-300"><Check className="h-5 w-5 text-green-500 mr-3 shrink-0" /> Exercise video library (50 videos)</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start text-gray-300"><Check className="h-5 w-5 text-green-500 mr-3 shrink-0" /> Chat support once a week</li>
                                    <li className="flex items-start text-gray-300"><Check className="h-5 w-5 text-green-500 mr-3 shrink-0" /> Monthly progress report</li>
                                </ul>
                            </div>
                            <div className="bg-red-500/10 p-4 rounded-xl border border-red-500/20">
                                <h3 className="text-sm font-semibold text-red-400 mb-2">Limitations</h3>
                                <ul className="space-y-2">
                                    <li className="flex items-start text-gray-400 text-sm"><X className="h-4 w-4 text-red-500 mr-2 shrink-0" /> No personalized workout/diet</li>
                                    <li className="flex items-start text-gray-400 text-sm"><X className="h-4 w-4 text-red-500 mr-2 shrink-0" /> No 1-on-1 trainer chat</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Premium Plan */}
                    <div className="bg-gradient-to-b from-primary/20 to-black rounded-3xl border border-primary/50 overflow-hidden flex flex-col relative transform hover:scale-[1.02] transition-all duration-300 shadow-2xl shadow-primary/10">
                        <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-xl shadow-lg">POPULAR</div>
                        <div className="p-8 border-b border-primary/20">
                            <h2 className="text-2xl font-bold text-white mb-2 flex items-center">
                                Premium Plan <Star className="h-5 w-5 text-yellow-500 ml-2 fill-current animate-pulse" />
                            </h2>
                            <p className="text-gray-300 mb-6">For serious transformations & muscle gain.</p>
                            <div className="flex items-baseline">
                                <span className="text-5xl font-bold text-primary">₹599</span>
                                <span className="text-xl text-gray-400 ml-2">/month</span>
                            </div>
                            <button
                                onClick={() => handleWhatsAppPayment('Premium')}
                                disabled={user?.subscription === 'Premium'}
                                className="w-full mt-8 bg-primary text-white py-4 rounded-xl font-bold hover:bg-orange-600 transition-all duration-300 shadow-lg shadow-primary/25 transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                            >
                                {user?.subscription === 'Premium' ? 'Current Plan' : 'Buy Now'}
                            </button>
                        </div>
                        <div className="p-8 space-y-8 flex-1">
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-4">Personalized Workouts (Full Access)</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start text-gray-300"><Check className="h-5 w-5 text-primary mr-3 shrink-0" /> Completely customized workout plan</li>
                                    <li className="flex items-start text-gray-300"><Check className="h-5 w-5 text-primary mr-3 shrink-0" /> 5/6-day advanced training (Home/Gym)</li>
                                    <li className="flex items-start text-gray-300"><Check className="h-5 w-5 text-primary mr-3 shrink-0" /> Daily corrective form coaching</li>
                                    <li className="flex items-start text-gray-300"><Check className="h-5 w-5 text-primary mr-3 shrink-0" /> 250+ exercise video library</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-4">Custom Diet Plan</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start text-gray-300"><Check className="h-5 w-5 text-primary mr-3 shrink-0" /> Personalized by Goal/Body Type</li>
                                    <li className="flex items-start text-gray-300"><Check className="h-5 w-5 text-primary mr-3 shrink-0" /> Weekly diet changes & Grocery list</li>
                                    <li className="flex items-start text-gray-300"><Check className="h-5 w-5 text-primary mr-3 shrink-0" /> Budget friendly options</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-4">Premium Tools</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start text-gray-300"><Check className="h-5 w-5 text-primary mr-3 shrink-0" /> AI Posture Correction</li>
                                    <li className="flex items-start text-gray-300"><Check className="h-5 w-5 text-primary mr-3 shrink-0" /> Macro & Body Fat % Calculator</li>
                                    <li className="flex items-start text-gray-300"><Check className="h-5 w-5 text-primary mr-3 shrink-0" /> Exclusive programs (HIIT, PPL, Abs)</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-4">Trainer Support</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start text-gray-300"><Check className="h-5 w-5 text-primary mr-3 shrink-0" /> Daily chat support</li>
                                    <li className="flex items-start text-gray-300"><Check className="h-5 w-5 text-primary mr-3 shrink-0" /> Weekly video call (15 min)</li>
                                    <li className="flex items-start text-gray-300"><Check className="h-5 w-5 text-primary mr-3 shrink-0" /> Form correction videos</li>
                                </ul>
                            </div>
                            <div className="bg-primary/10 p-4 rounded-xl border border-primary/20">
                                <h3 className="text-sm font-semibold text-primary mb-2">Extras</h3>
                                <ul className="space-y-2">
                                    <li className="flex items-start text-gray-300 text-sm"><Star className="h-4 w-4 text-yellow-500 mr-2 shrink-0" /> Certificate on completion of 8 weeks</li>
                                    <li className="flex items-start text-gray-300 text-sm"><Star className="h-4 w-4 text-yellow-500 mr-2 shrink-0" /> Motivational challenges</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pricing;
