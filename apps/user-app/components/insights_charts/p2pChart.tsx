'use client';

import { Bar } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  BarElement, 
  CategoryScale, 
  LinearScale, 
  Tooltip, 
  Legend, 
  Title, 
  ChartOptions, 
  TooltipItem,
  ChartData,
  ScriptableContext,
  Color
} from 'chart.js';
import { Transactions } from '@components/Transactions'; // Ensure this component exists

// Register required components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, Title);

// Define the TransactionData interface
interface TransactionData {
  user: string;
  amount: number;
  transactions: number;
}

// Declare the function using the desired syntax
export function P2PChart({ data }: { data: TransactionData[] }) {
  const chartData: ChartData<'bar'> = {
    labels: data.map((item) => item.user),
    datasets: [
      {
        label: 'Total Amount Transferred (₹)',
        data: data.map((item) => item.amount / 100),
        backgroundColor: (context: ScriptableContext<'bar'>): Color => {
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
        borderWidth: 1,
        borderRadius: 8,
        barThickness: 70, 
      },
    ],
  };

  const tooltipCallbacks = {
    label: (tooltipItem: TooltipItem<'bar'>) => {
      const value = tooltipItem.raw as number;
      const index = tooltipItem.dataIndex;
      const transactionCount = data[index]?.transactions;
      return `₹${value.toFixed(2)} | ${transactionCount} transactions`;
    },
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false, 
    plugins: {
      legend: {
        position: 'top',
        labels: { color: 'lightgray', font: { size: 14, family: 'Arial, sans-serif' } },
      },
      title: {
        display: true,
        text: 'Money Transfer Overview',
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
          text: 'Users',
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
      <Bar data={chartData} options={options} className="flex-1" /> 
    </div>
  );
}
