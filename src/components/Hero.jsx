import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop"
                    alt="Gym Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-4xl md:text-7xl font-extrabold text-white tracking-tight mb-4 md:mb-6">
                        TRANSFORM YOUR <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-600">
                            BODY & MIND
                        </span>
                    </h1>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mt-2 md:mt-4 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8 md:mb-10 px-4"
                >
                    Join the elite fitness community. Get personalized workout plans,
                    expert diet guidance, and AI-powered analytics to achieve your dream physique.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4"
                >
                    <Link
                        to="/signup"
                        className="w-full sm:w-auto px-8 py-3 md:py-4 bg-primary hover:bg-orange-600 text-white rounded-full font-bold text-base md:text-lg transition-all transform hover:scale-105 flex items-center justify-center shadow-lg shadow-primary/30"
                    >
                        Start Your Journey <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                    <a
                        href="#features"
                        className="w-full sm:w-auto px-8 py-3 md:py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full font-bold text-base md:text-lg transition-all backdrop-blur-sm flex items-center justify-center"
                    >
                        Explore Features
                    </a>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
                >
                    <div>
                        <h3 className="text-4xl font-bold text-white">500+</h3>
                        <p className="text-gray-400">Happy Members</p>
                    </div>
                    <div>
                        <h3 className="text-4xl font-bold text-white">50+</h3>
                        <p className="text-gray-400">Expert Trainers</p>
                    </div>
                    <div>
                        <h3 className="text-4xl font-bold text-white">250+</h3>
                        <p className="text-gray-400">Workout Videos</p>
                    </div>
                    <div>
                        <h3 className="text-4xl font-bold text-white">98%</h3>
                        <p className="text-gray-400">Success Rate</p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Hero;
