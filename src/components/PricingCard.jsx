import React from 'react';
import { Check, X } from 'lucide-react';
import { motion } from 'framer-motion';

const PricingCard = ({ title, price, features, isPremium, onSubscribe, currentPlan }) => {
    const isCurrent = currentPlan === title;

    return (
        <motion.div
            whileHover={{ y: -10 }}
            className={`relative p-8 rounded-2xl border ${isPremium ? 'border-primary bg-primary/10' : 'border-white/10 bg-secondary/30'
                } backdrop-blur-sm flex flex-col h-full`}
        >
            {isPremium && (
                <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                    RECOMMENDED
                </div>
            )}

            <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
            <div className="flex items-baseline mb-6">
                <span className="text-4xl font-extrabold text-white">${price}</span>
                <span className="text-gray-400 ml-2">/month</span>
            </div>

            <ul className="space-y-4 mb-8 flex-1">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-300">
                        {feature.included ? (
                            <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        ) : (
                            <X className="h-5 w-5 text-gray-500 mr-3 flex-shrink-0" />
                        )}
                        <span className={feature.included ? 'text-white' : 'text-gray-500'}>
                            {feature.text}
                        </span>
                    </li>
                ))}
            </ul>

            <button
                onClick={onSubscribe}
                disabled={isCurrent}
                className={`w-full py-3 px-6 rounded-lg font-bold transition-colors ${isCurrent
                        ? 'bg-white/10 text-gray-400 cursor-default'
                        : isPremium
                            ? 'bg-primary text-white hover:bg-orange-600'
                            : 'bg-white text-black hover:bg-gray-200'
                    }`}
            >
                {isCurrent ? 'Current Plan' : isPremium ? 'Upgrade Now' : 'Get Started'}
            </button>
        </motion.div>
    );
};

export default PricingCard;
