import React from 'react';
import { Trash2, Calendar, Utensils } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DietList = ({ diets, onDelete }) => {
    if (!diets || diets.length === 0) {
        return (
            <div className="text-center py-12 text-gray-500">
                <Utensils className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No diet plans found. Create one to get started!</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
                {diets.map((diet) => (
                    <motion.div
                        key={diet._id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="bg-secondary/30 rounded-xl border border-white/10 backdrop-blur-sm overflow-hidden hover:border-primary/50 transition-colors duration-300"
                    >
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-white">{diet.name}</h3>
                                    <div className="flex items-center text-xs text-gray-400 mt-1">
                                        <Calendar className="h-3 w-3 mr-1" />
                                        {new Date(diet.createdAt).toLocaleDateString()}
                                    </div>
                                </div>
                                <button
                                    onClick={() => onDelete(diet._id)}
                                    className="text-gray-500 hover:text-red-500 transition-colors p-1"
                                >
                                    <Trash2 className="h-5 w-5" />
                                </button>
                            </div>

                            <div className="space-y-3">
                                {diet.meals.map((meal, idx) => (
                                    <div key={idx} className="border-b border-white/5 pb-2 last:border-0 last:pb-0">
                                        <div className="flex justify-between items-center text-sm mb-1">
                                            <span className="text-gray-300 font-medium">{meal.name}</span>
                                            <span className="text-primary font-bold">{meal.calories} kcal</span>
                                        </div>
                                        <div className="flex justify-between text-xs text-gray-500">
                                            <span>P: {meal.protein}g</span>
                                            <span>C: {meal.carbs}g</span>
                                            <span>F: {meal.fats}g</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-4 pt-4 border-t border-white/10 flex justify-between text-sm font-semibold text-white">
                                <span>Total Calories:</span>
                                <span>{diet.meals.reduce((acc, meal) => acc + Number(meal.calories), 0)} kcal</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default DietList;
