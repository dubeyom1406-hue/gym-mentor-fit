import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SubscriptionRoute = ({ children }) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (user.subscription === 'Free') {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center px-4">
                <div className="max-w-md w-full bg-gray-900 border border-white/10 rounded-2xl p-8 text-center shadow-2xl">
                    <div className="bg-primary/20 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4">Feature Locked</h2>
                    <p className="text-gray-400 mb-8">
                        This feature is available exclusively for <span className="text-primary font-bold">Basic</span> and <span className="text-primary font-bold">Premium</span> members. Upgrade your plan to unlock full access.
                    </p>
                    <div className="space-y-4">
                        <a
                            href="/pricing"
                            className="block w-full bg-primary hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-primary/25"
                        >
                            View Plans & Upgrade
                        </a>
                        <a
                            href="/dashboard"
                            className="block w-full bg-white/5 hover:bg-white/10 text-gray-300 font-medium py-3 rounded-xl transition-colors"
                        >
                            Back to Dashboard
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    return children;
};

export default SubscriptionRoute;
