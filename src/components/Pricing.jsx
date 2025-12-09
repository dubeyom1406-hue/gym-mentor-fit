import React from 'react';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const Pricing = () => {
    const plans = [
        {
            name: 'Basic',
            price: '₹299',
            period: '/month',
            features: [
                '3-day weekly workout routine',
                'Basic diet plan',
                'Daily tracker',
                'BMI calculator',
                'Exercise library (50 videos)',
                'Weekly chat support'
            ],
            popular: false
        },
        {
            name: 'Premium',
            price: '₹599',
            period: '/month',
            features: [
                'Personalized workout plan',
                'Custom diet plan',
                'AI posture correction',
                'Daily chat support',
                'Video calls with trainers',
                'All premium tools'
            ],
            popular: true
        }
    ];

    return (
        <section className="py-20 bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Simple, Transparent Pricing</h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Choose the perfect plan for your fitness journey. All plans include a 7-day free trial.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`rounded-2xl border ${plan.popular
                                ? 'border-orange-500 bg-gradient-to-b from-orange-500/10 to-black'
                                : 'border-gray-700 bg-gray-800/50'
                                } p-8 relative`}
                        >
                            {plan.popular && (
                                <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-bold px-4 py-1 rounded-bl-xl">
                                    POPULAR
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                                <div className="flex items-baseline">
                                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                                    <span className="text-gray-400 ml-2">{plan.period}</span>
                                </div>
                            </div>

                            <ul className="space-y-4 mb-8">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start">
                                        <Check className={`h-5 w-5 mr-3 ${plan.popular ? 'text-orange-500' : 'text-green-500'}`} />
                                        <span className="text-gray-300">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link
                                to="/pricing"
                                className={`block w-full text-center py-3 rounded-xl font-bold transition-colors ${plan.popular
                                    ? 'bg-orange-500 text-white hover:bg-orange-600'
                                    : 'bg-white text-black hover:bg-gray-200'
                                    }`}
                            >
                                Buy Now
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Pricing;