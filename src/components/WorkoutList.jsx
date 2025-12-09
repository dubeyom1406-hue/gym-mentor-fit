import React from 'react';
import { Trash2, Calendar, Dumbbell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const WorkoutList = ({ workouts, onDelete }) => {
    if (!workouts || workouts.length === 0) {
        return (
            <div className="text-center py-12 text-gray-500">
                <Dumbbell className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No workouts found. Create one to get started!</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
                {workouts.map((workout) => (
                    <motion.div
                        key={workout._id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="bg-secondary/30 rounded-xl border border-white/10 backdrop-blur-sm overflow-hidden hover:border-primary/50 transition-colors duration-300"
                    >
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-white">{workout.name}</h3>
                                    <div className="flex items-center text-xs text-gray-400 mt-1">
                                        <Calendar className="h-3 w-3 mr-1" />
                                        {new Date(workout.createdAt).toLocaleDateString()}
                                    </div>
                                </div>
                                <button
                                    onClick={() => onDelete(workout._id)}
                                    className="text-gray-500 hover:text-red-500 transition-colors p-1"
                                >
                                    <Trash2 className="h-5 w-5" />
                                </button>
                            </div>

                            <div className="space-y-3">
                                {workout.exercises.map((exercise, idx) => (
                                    <div key={idx} className="flex justify-between items-center text-sm border-b border-white/5 pb-2 last:border-0 last:pb-0">
                                        <span className="text-gray-300 font-medium">{exercise.name}</span>
                                        <span className="text-gray-500">
                                            {exercise.sets} x {exercise.reps} @ {exercise.weight}kg
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default WorkoutList;
