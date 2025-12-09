import React from 'react';
import { Dumbbell, Instagram, Twitter, Facebook, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-black border-t border-white/10 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center space-x-2 mb-6">
                            <Dumbbell className="h-8 w-8 text-primary" />
                            <span className="text-white font-bold text-xl tracking-wider">GYM MENTOR FIT</span>
                        </div>
                        <p className="text-gray-400 mb-6">
                            Your ultimate partner in fitness. We provide the tools, guidance, and motivation you need to succeed.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Instagram className="h-5 w-5" /></a>
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Twitter className="h-5 w-5" /></a>
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Facebook className="h-5 w-5" /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-bold mb-6">Quick Links</h3>
                        <ul className="space-y-4">
                            <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Home</a></li>
                            <li><a href="#features" className="text-gray-400 hover:text-primary transition-colors">Features</a></li>
                            <li><a href="#pricing" className="text-gray-400 hover:text-primary transition-colors">Pricing</a></li>
                            <li><a href="/login" className="text-gray-400 hover:text-primary transition-colors">Login</a></li>
                        </ul>
                    </div>

                    {/* Programs */}
                    <div>
                        <h3 className="text-white font-bold mb-6">Programs</h3>
                        <ul className="space-y-4">
                            <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Weight Loss</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Muscle Gain</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">HIIT Training</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Yoga & Mobility</a></li>
                        </ul>
                    </div>

                    <p className="text-gray-500 text-sm">
                        &copy; {new Date().getFullYear()} Gym Mentor Fit. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
