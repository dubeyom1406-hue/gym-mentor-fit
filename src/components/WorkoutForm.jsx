import React, { useState } from 'react';
import { Plus, Trash2, Save, Dumbbell } from 'lucide-react';
import { motion } from 'framer-motion';

const WorkoutForm = ({ onAdd }) => {
    const [name, setName] = useState('');
    const [exercises, setExercises] = useState([
        { name: '', sets: '', reps: '', weight: '' }
    ]);

    const handleExerciseChange = (index, field, value) => {
        const newExercises = [...exercises];
        newExercises[index][field] = value;
        setExercises(newExercises);
    };

    const addExercise = () => {
        setExercises([...exercises, { name: '', sets: '', reps: '', weight: '' }]);
    };

    const removeExercise = (index) => {
        const newExercises = exercises.filter((_, i) => i !== index);
        setExercises(newExercises);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd({ name, exercises });
        setName('');
        setExercises([{ name: '', sets: '', reps: '', weight: '' }]);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-secondary/30 rounded-2xl p-6 border border-white/10 backdrop-blur-sm mb-8"
        >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Plus className="h-6 w-6 mr-2 text-primary" />
                Create New Workout
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Workout Name</label>
                    <input
                        type="text"
                        placeholder="e.g., Chest Day, Leg Day"
                        required
                        className="block w-full px-4 py-3 border border-white/10 rounded-lg bg-black/50 text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-400">Exercises</label>
                    {exercises.map((exercise, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end bg-black/30 p-4 rounded-xl border border-white/5">
                            <div className="md:col-span-4">
                                <label className="block text-xs text-gray-500 mb-1">Exercise Name</label>
                                <input
                                    type="text"
                                    placeholder="e.g., Bench Press"
                                    required
                                    className="block w-full px-3 py-2 border border-white/10 rounded-lg bg-black/50 text-white text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                                    value={exercise.name}
                                    onChange={(e) => handleExerciseChange(index, 'name', e.target.value)}
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs text-gray-500 mb-1">Sets</label>
                                <input
                                    type="number"
                                    placeholder="3"
                                    required
                                    className="block w-full px-3 py-2 border border-white/10 rounded-lg bg-black/50 text-white text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                                    value={exercise.sets}
                                    onChange={(e) => handleExerciseChange(index, 'sets', e.target.value)}
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs text-gray-500 mb-1">Reps</label>
                                <input
                                    type="number"
                                    placeholder="10"
                                    required
                                    className="block w-full px-3 py-2 border border-white/10 rounded-lg bg-black/50 text-white text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                                    value={exercise.reps}
                                    onChange={(e) => handleExerciseChange(index, 'reps', e.target.value)}
                                />
                            </div>
                            <div className="md:col-span-3">
                                <label className="block text-xs text-gray-500 mb-1">Weight (kg)</label>
                                <input
                                    type="number"
                                    placeholder="60"
                                    required
                                    className="block w-full px-3 py-2 border border-white/10 rounded-lg bg-black/50 text-white text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                                    value={exercise.weight}
                                    onChange={(e) => handleExerciseChange(index, 'weight', e.target.value)}
                                />
                            </div>
                            <div className="md:col-span-1 flex justify-center">
                                {exercises.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeExercise(index)}
                                        className="p-2 text-red-400 hover:text-red-300 transition-colors"
                                    >
                                        <Trash2 className="h-5 w-5" />
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex space-x-4">
                    <button
                        type="button"
                        onClick={addExercise}
                        className="flex items-center px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors"
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Exercise
                    </button>
                    <button
                        type="submit"
                        className="flex-1 flex items-center justify-center px-6 py-2 bg-primary text-white rounded-lg hover:bg-orange-600 transition-colors"
                    >
                        <Save className="h-4 w-4 mr-2" />
                        Save Workout
                    </button>
                </div>
            </form>
        </motion.div>
    );
};

export default WorkoutForm;
