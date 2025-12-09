import React from 'react';
import { Activity, Utensils, Users, TrendingUp, Smartphone, Video } from 'lucide-react';

const Features = () => {
    const features = [
        {
            icon: <Activity className="h-8 w-8 text-primary" />,
            title: 'Personalized Workouts',
            description: 'AI-driven workout plans tailored to your specific goals and fitness level.',
        },
        {
            icon: <Utensils className="h-8 w-8 text-primary" />,
            title: 'Nutrition Plans',
            description: 'Custom diet charts with macro breakdowns to fuel your body correctly.',
        },
        {
            icon: <TrendingUp className="h-8 w-8 text-primary" />,
            title: 'Progress Tracking',
            description: 'Visualize your journey with detailed analytics and transformation graphs.',
        },
        {
            icon: <Video className="h-8 w-8 text-primary" />,
            title: 'Video Library',
            description: 'Access 250+ high-quality exercise tutorials to perfect your form.',
        },
        {
            icon: <Users className="h-8 w-8 text-primary" />,
            title: 'Community Support',
            description: 'Join a tribe of like-minded individuals and stay motivated together.',
        },
        {
            icon: <Smartphone className="h-8 w-8 text-primary" />,
            title: 'Mobile App Access',
            description: 'Take your gym mentor with you wherever you go with our premium app.',
        },
    ];

    return (
        <section id="features" className="py-24 bg-black relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-64 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-primary font-semibold tracking-wide uppercase text-sm mb-2">Why Choose Us</h2>
                    <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">Redefine Your Limits</h3>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        We provide everything you need to build the best version of yourself.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/50 transition-all duration-300 backdrop-blur-sm"
                        >
                            <div className="h-14 w-14 bg-black/50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-white/5 group-hover:border-primary/30">
                                {feature.icon}
                            </div>
                            <h4 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                                {feature.title}
                            </h4>
                            <p className="text-gray-400 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
