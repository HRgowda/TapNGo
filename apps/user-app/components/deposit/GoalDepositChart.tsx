// Import required components
import React from 'react';
import {
    Chart as ChartJS,
    BarElement,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';

import { Doughnut } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(BarElement, ArcElement, Tooltip, Legend);

interface GoalDepositChartProps {
    goalAmount: number;
    currentSavings: number;
}

export function GoalDepositChart({ goalAmount, currentSavings }: GoalDepositChartProps) {

    const remainingBalance = goalAmount - currentSavings;
    // Chart data
    const data = {
        labels: ['Current Savings', 'Remaining'],
        datasets: [
            {
                label: 'Savings Overview',
                data: [currentSavings, remainingBalance],
                backgroundColor: ['rgba(54, 162, 235, 0.8)', 'rgba(255, 99, 132, 0.8)'],
                borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
                borderWidth: 2,
            },
        ],
    };

    // Chart options
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                labels: {
                    color: 'white', // Legend text color
                },
            },
            title: {
                display: true,
                text: 'Savings Goal Progress',
                color: 'white', // Chart title color
                font: {
                    size: 20,
                },
            },
        },
    };

    return (
        <div className="p-6">
            <div>
            <Doughnut data={data} options={options} />
            </div>
        </div>
    );
};
