import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
    const testimonials = [
        {
            name: 'Rahul Sharma',
            role: 'Software Engineer',
            image: '',
            content: "I lost 15kg in 3 months! The personalized diet plan was a game changer. I never felt hungry and still saw results every week.",
            rating: 5
        },
        {
            name: 'Priya Patel',
            role: 'Student',
            image: '',
            content: "The trainer support is incredible. They corrected my squat form over video call, and my back pain is completely gone.",
            rating: 5
        },
        {
            name: 'Amit Verma',
            role: 'Entrepreneur',
            image: '',
            content: "Best investment for my health. The premium plan's analytics help me track every calorie and workout. Highly recommended!",
            rating: 5
        }
    ];

    return (
        <section className="py-24 bg-black border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-white mb-4">Success Stories</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Real results from real people. Join thousands of others who have transformed their lives.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((item, index) => (
                        <div key={index} className="bg-secondary/20 p-8 rounded-2xl border border-white/10 relative">
                            <Quote className="absolute top-6 right-6 h-8 w-8 text-white/10" />
                            <div className="flex items-center space-x-4 mb-6">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="h-14 w-14 rounded-full object-cover border-2 border-primary"
                                />
                                <div>
                                    <h4 className="text-white font-bold">{item.name}</h4>
                                    <p className="text-primary text-sm">{item.role}</p>
                                </div>
                            </div>
                            <div className="flex mb-4">
                                {[...Array(item.rating)].map((_, i) => (
                                    <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                                ))}
                            </div>
                            <p className="text-gray-300 italic">"{item.content}"</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
