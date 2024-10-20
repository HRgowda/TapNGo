"use client";

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,  
  Title,
  ChartData,
  ScriptableContext,
  Color,
  TooltipItem,
  ChartOptions,
} from 'chart.js';

// Register required components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Title);

interface OnRampTransaction {
  amount: number;
  startTime: Date;
  provider: string;
}

export function OnRampChart({ data }: { data: OnRampTransaction[] }) {
  const chartData: ChartData<'line'> = {
    labels: data.map((item) => item.provider),
    datasets: [
      {
        label: 'Total Amount Transferred (₹)',
        data: data.map((item) => item.amount),
        backgroundColor: (context: ScriptableContext<'line'>): Color => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            return 'rgba(75, 192, 192, 0.2)'; // Default color
          }
          const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
          gradient.addColorStop(0, 'rgba(75, 192, 192, 0.8)');
          gradient.addColorStop(1, 'rgba(75, 192, 192, 0.2)');
          return gradient;
        },
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        tension: 0.3,
        fill: true,
        pointRadius: 5,
      },
    ],
  };

  const tooltipCallbacks = {
    label: (tooltipItem: TooltipItem<'line'>) => {
      const value = tooltipItem.raw as number;
      const index = tooltipItem.dataIndex;
      const transactionDate = data[index]?.startTime.toLocaleDateString(); // Format the date
      return `₹${value.toFixed(2)} | Date: ${transactionDate}`;
    },
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: { color: 'lightgray', font: { size: 14, family: 'Arial, sans-serif' } },
      },
      title: {
        display: true,
        text: 'On-Ramp Transactions Overview',
        color: 'lightgray',
        font: { size: 24, family: 'Arial, sans-serif' },
        align: 'start',
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(255, 255, 255, 0.6)',
        borderWidth: 1,
        callbacks: tooltipCallbacks,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Providers',
          color: 'lightgray',
          font: { size: 16, family: 'Arial, sans-serif' },
        },
        ticks: { color: 'lightgray' },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Total Amount Transferred (₹)',
          color: 'lightgray',
          font: { size: 16, family: 'Arial, sans-serif' },
        },
        ticks: { color: 'lightgray' },
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
    },
  };

  return (
    <div className="flex bg-gray-900 p-6 rounded-lg">
      <Line data={chartData} options={options} className="flex-1" />
    </div>
  );
}