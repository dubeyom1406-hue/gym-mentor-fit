import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, Dumbbell, ChevronDown, User, LogOut, LayoutDashboard, Settings, PieChart, Utensils, Activity, Users, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [featuresMenuOpen, setFeaturesMenuOpen] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const userMenuRef = useRef(null);
    const featuresMenuRef = useRef(null);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Features', href: '/#features' },
        { name: 'Pricing', href: '/pricing' },
        { name: 'Contact', href: '/#contact' },
    ];

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setUserMenuOpen(false);
            }
            if (featuresMenuRef.current && !featuresMenuRef.current.contains(event.target)) {
                setFeaturesMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
        setIsOpen(false);
    };

    return (
        <nav className="fixed w-full z-50 bg-black/90 backdrop-blur-sm border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-2">
                            <Dumbbell className="h-8 w-8 text-primary" />
                            <span className="text-white font-bold text-xl tracking-wider">GYM MENTOR FIT</span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    className="text-gray-300 hover:text-primary transition-colors duration-300 text-sm font-medium"
                                >
                                    {link.name}
                                </Link>
                            ))}

                            {user ? (
                                <>
                                    {/* Features Dropdown */}
                                    <div className="relative" ref={featuresMenuRef}>
                                        <button
                                            onClick={() => setFeaturesMenuOpen(!featuresMenuOpen)}
                                            className="flex items-center text-gray-300 hover:text-primary transition-colors duration-300 text-sm font-medium focus:outline-none"
                                        >
                                            Features <ChevronDown className="ml-1 h-4 w-4" />
                                        </button>
                                        <AnimatePresence>
                                            {featuresMenuOpen && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 10 }}
                                                    className="absolute left-0 mt-2 w-48 bg-gray-900 rounded-md shadow-lg py-1 border border-white/10"
                                                >
                                                    {[
                                                        { name: 'Workouts', icon: Activity, href: '/workouts' },
                                                        { name: 'Diet Plans', icon: Utensils, href: '/diet' },
                                                        { name: 'Community', icon: Users, href: '/community' },
                                                        { name: 'Analytics', icon: PieChart, href: '/analytics' },
                                                    ].map((item) => (
                                                        <div key={item.name}>
                                                            {user.subscription === 'Free' ? (
                                                                <button
                                                                    onClick={() => {
                                                                        setFeaturesMenuOpen(false);
                                                                        navigate('/pricing');
                                                                    }}
                                                                    className="w-full text-left px-4 py-2 text-sm text-gray-500 hover:bg-white/5 hover:text-gray-400 flex items-center justify-between group"
                                                                >
                                                                    <div className="flex items-center">
                                                                        <item.icon className="mr-2 h-4 w-4" /> {item.name}
                                                                    </div>
                                                                    <Lock className="h-3 w-3 text-gray-600 group-hover:text-gray-500" />
                                                                </button>
                                                            ) : (
                                                                <Link
                                                                    to={item.href}
                                                                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-primary flex items-center"
                                                                    onClick={() => setFeaturesMenuOpen(false)}
                                                                >
                                                                    <item.icon className="mr-2 h-4 w-4" /> {item.name}
                                                                </Link>
                                                            )}
                                                        </div>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    {/* User Dropdown */}
                                    <div className="relative" ref={userMenuRef}>
                                        <button
                                            onClick={() => setUserMenuOpen(!userMenuOpen)}
                                            className="flex items-center space-x-2 text-gray-300 hover:text-white focus:outline-none"
                                        >
                                            <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                                                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                            </div>
                                            <span className="text-sm font-medium">{user.name || 'User'}</span>
                                            <ChevronDown className="h-4 w-4" />
                                        </button>

                                        <AnimatePresence>
                                            {userMenuOpen && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 10 }}
                                                    className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-md shadow-lg py-1 border border-white/10"
                                                >
                                                    <div className="px-4 py-2 border-b border-white/10">
                                                        <p className="text-sm text-white font-medium truncate">{user.name || 'User'}</p>
                                                        <p className="text-xs text-gray-400 truncate">{user.email}</p>
                                                        <div className="mt-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-800 text-gray-300 border border-gray-700">
                                                            {user.subscription} Plan
                                                        </div>
                                                    </div>
                                                    <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-primary flex items-center">
                                                        <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
                                                    </Link>
                                                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-primary flex items-center">
                                                        <Settings className="mr-2 h-4 w-4" /> Profile
                                                    </Link>
                                                    {user.isAdmin && (
                                                        <Link to="/admin" className="block px-4 py-2 text-sm text-red-400 hover:bg-white/5 hover:text-red-300 flex items-center">
                                                            <User className="mr-2 h-4 w-4" /> Admin Panel
                                                        </Link>
                                                    )}
                                                    <button
                                                        onClick={handleLogout}
                                                        className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-primary flex items-center"
                                                    >
                                                        <LogOut className="mr-2 h-4 w-4" /> Logout
                                                    </button>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </>
                            ) : (
                                <div className="flex items-center space-x-4">
                                    <Link
                                        to="/login"
                                        className="text-gray-300 hover:text-primary transition-colors duration-300 text-sm font-medium"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/signup"
                                        className="bg-primary hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300"
                                    >
                                        Join Now
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-300 hover:text-white focus:outline-none"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-black border-b border-white/10 overflow-hidden"
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    className="text-gray-300 hover:text-primary block px-3 py-2 rounded-md text-sm font-medium"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            {user ? (
                                <>
                                    <div className="border-t border-white/10 my-2 pt-2">
                                        <p className="px-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Features</p>
                                        <div className="grid grid-cols-2 gap-1">
                                            {[
                                                { name: 'Workouts', href: '/workouts' },
                                                { name: 'Diet Plans', href: '/diet' },
                                                { name: 'Community', href: '/community' },
                                                { name: 'Analytics', href: '/analytics' },
                                            ].map((item) => (
                                                user.subscription === 'Free' ? (
                                                    <button
                                                        key={item.name}
                                                        onClick={() => {
                                                            setIsOpen(false);
                                                            navigate('/pricing');
                                                        }}
                                                        className="text-gray-500 hover:text-gray-400 block px-3 py-2 rounded-md text-sm font-medium text-left flex items-center justify-between"
                                                    >
                                                        {item.name} <Lock className="h-3 w-3 ml-1" />
                                                    </button>
                                                ) : (
                                                    <Link
                                                        key={item.name}
                                                        to={item.href}
                                                        className="text-gray-300 hover:text-primary block px-3 py-2 rounded-md text-sm font-medium"
                                                        onClick={() => setIsOpen(false)}
                                                    >
                                                        {item.name}
                                                    </Link>
                                                )
                                            ))}
                                        </div>
                                    </div>
                                    <div className="border-t border-white/10 my-2 pt-2">
                                        <p className="px-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Account</p>
                                        <Link to="/dashboard" className="text-gray-300 hover:text-primary block px-3 py-2 rounded-md text-sm font-medium" onClick={() => setIsOpen(false)}>Dashboard</Link>
                                        <Link to="/profile" className="text-gray-300 hover:text-primary block px-3 py-2 rounded-md text-sm font-medium" onClick={() => setIsOpen(false)}>Profile</Link>
                                        {user.isAdmin && (
                                            <Link to="/admin" className="text-red-500 hover:text-red-400 block px-3 py-2 rounded-md text-sm font-medium" onClick={() => setIsOpen(false)}>Admin Panel</Link>
                                        )}
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left mt-2 bg-primary hover:bg-orange-600 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="border-t border-white/10 my-2 pt-2 flex space-x-2 px-3">
                                    <Link to="/login" className="flex-1 text-center text-gray-300 hover:text-primary border border-gray-700 block py-2 rounded-md text-sm font-medium" onClick={() => setIsOpen(false)}>Login</Link>
                                    <Link to="/signup" className="flex-1 text-center bg-primary hover:bg-orange-600 text-white block py-2 rounded-md text-sm font-medium" onClick={() => setIsOpen(false)}>Join Now</Link>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
