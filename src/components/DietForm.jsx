import React, { useState } from 'react';
import { Plus, Trash2, Save, Utensils } from 'lucide-react';
import { motion } from 'framer-motion';

const DietForm = ({ onAdd }) => {
    const [name, setName] = useState('');
    const [meals, setMeals] = useState([
        { name: '', calories: '', protein: '', carbs: '', fats: '' }
    ]);

    const handleMealChange = (index, field, value) => {
        const newMeals = [...meals];
        newMeals[index][field] = value;
        setMeals(newMeals);
    };

    const addMeal = () => {
        setMeals([...meals, { name: '', calories: '', protein: '', carbs: '', fats: '' }]);
    };

    const removeMeal = (index) => {
        const newMeals = meals.filter((_, i) => i !== index);
        setMeals(newMeals);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd({ name, meals });
        setName('');
        setMeals([{ name: '', calories: '', protein: '', carbs: '', fats: '' }]);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-secondary/30 rounded-2xl p-6 border border-white/10 backdrop-blur-sm mb-8"
        >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Plus className="h-6 w-6 mr-2 text-primary" />
                Create New Diet Plan
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Diet Plan Name</label>
                    <input
                        type="text"
                        placeholder="e.g., Bulking Diet, Keto Plan"
                        required
                        className="block w-full px-4 py-3 border border-white/10 rounded-lg bg-black/50 text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-400">Meals</label>
                    {meals.map((meal, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end bg-black/30 p-4 rounded-xl border border-white/5">
                            <div className="md:col-span-4">
                                <label className="block text-xs text-gray-500 mb-1">Meal Name</label>
                                <input
                                    type="text"
                                    placeholder="e.g., Breakfast"
                                    required
                                    className="block w-full px-3 py-2 border border-white/10 rounded-lg bg-black/50 text-white text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                                    value={meal.name}
                                    onChange={(e) => handleMealChange(index, 'name', e.target.value)}
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs text-gray-500 mb-1">Calories</label>
                                <input
                                    type="number"
                                    placeholder="500"
                                    required
                                    className="block w-full px-3 py-2 border border-white/10 rounded-lg bg-black/50 text-white text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                                    value={meal.calories}
                                    onChange={(e) => handleMealChange(index, 'calories', e.target.value)}
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs text-gray-500 mb-1">Protein (g)</label>
                                <input
                                    type="number"
                                    placeholder="30"
                                    required
                                    className="block w-full px-3 py-2 border border-white/10 rounded-lg bg-black/50 text-white text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                                    value={meal.protein}
                                    onChange={(e) => handleMealChange(index, 'protein', e.target.value)}
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs text-gray-500 mb-1">Carbs (g)</label>
                                <input
                                    type="number"
                                    placeholder="50"
                                    required
                                    className="block w-full px-3 py-2 border border-white/10 rounded-lg bg-black/50 text-white text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                                    value={meal.carbs}
                                    onChange={(e) => handleMealChange(index, 'carbs', e.target.value)}
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs text-gray-500 mb-1">Fats (g)</label>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="number"
                                        placeholder="15"
                                        required
                                        className="block w-full px-3 py-2 border border-white/10 rounded-lg bg-black/50 text-white text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                                        value={meal.fats}
                                        onChange={(e) => handleMealChange(index, 'fats', e.target.value)}
                                    />
                                    {meals.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeMeal(index)}
                                            className="p-2 text-red-400 hover:text-red-300 transition-colors"
                                        >
                                            <Trash2 className="h-5 w-5" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex space-x-4">
                    <button
                        type="button"
                        onClick={addMeal}
                        className="flex items-center px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors"
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Meal
                    </button>
                    <button
                        type="submit"
                        className="flex-1 flex items-center justify-center px-6 py-2 bg-primary text-white rounded-lg hover:bg-orange-600 transition-colors"
                    >
                        <Save className="h-4 w-4 mr-2" />
                        Save Diet Plan
                    </button>
                </div>
            </form>
        </motion.div>
    );
};

export default DietForm;
