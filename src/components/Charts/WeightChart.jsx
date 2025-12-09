import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const WeightChart = ({ currentWeight }) => {
    // Mock data for weight history since we don't track it over time yet
    // In a real app, this would come from the backend
    const data = [
        { name: 'Week 1', weight: currentWeight + 2 },
        { name: 'Week 2', weight: currentWeight + 1.5 },
        { name: 'Week 3', weight: currentWeight + 0.5 },
        { name: 'Week 4', weight: currentWeight },
    ];

    return (
        <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="name" stroke="#888" />
                    <YAxis domain={['dataMin - 5', 'dataMax + 5']} stroke="#888" />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
                        itemStyle={{ color: '#fff' }}
                    />
                    <Line
                        type="monotone"
                        dataKey="weight"
                        stroke="#f97316"
                        strokeWidth={2}
                        dot={{ fill: '#f97316' }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default WeightChart;
