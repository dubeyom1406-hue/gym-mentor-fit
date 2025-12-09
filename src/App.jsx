import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import ComponentPricing from './components/Pricing';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Workouts from './pages/Workouts';
import Diet from './pages/Diet';
import AdminDashboard from './pages/AdminDashboard';
import Pricing from './pages/Pricing';
import Analytics from './pages/Analytics';
import Community from './pages/Community';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import SubscriptionRoute from './components/SubscriptionRoute';
import ScrollToTop from './components/ScrollToTop';



const Home = () => (
    <>
        <Hero />
        <Features />
        <ComponentPricing />
        <Contact />
    </>
);

function App() {
    return (
        <AuthProvider>
            <Router>
                <ScrollToTop />
                <div className="bg-black min-h-screen text-white">
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />

                        {/* Protected Routes */}
                        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />

                        {/* Subscription Protected Routes */}
                        <Route path="/workouts" element={<SubscriptionRoute><Workouts /></SubscriptionRoute>} />
                        <Route path="/diet" element={<SubscriptionRoute><Diet /></SubscriptionRoute>} />
                        <Route path="/community" element={<SubscriptionRoute><Community /></SubscriptionRoute>} />

                        <Route path="/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
                        <Route path="/pricing" element={<Pricing />} />
                        <Route path="/analytics" element={<SubscriptionRoute><Analytics /></SubscriptionRoute>} />
                    </Routes>
                    <Footer />
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
