/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { instance } from '../api/axios.api';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const Chart: React.FC = () => {
  const [chartData, setChartData] = useState({
    labels: [] as string[],
    datasets: [
      {
        label: 'Количество закрытий',
        data: [] as number[],
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 5,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await instance.get('/sales/all');

        const transformedData = data
          .filter((item: any) => item.payedAt)
          .map((item: any) => ({
            ...item,
            payedAt: new Date(item.payedAt).toLocaleDateString('ru-RU'),
          }));

        const salesCountByDate: { [key: string]: number } = {};

        transformedData.forEach((item: any) => {
          if (salesCountByDate[item.payedAt]) {
            salesCountByDate[item.payedAt]++;
          } else {
            salesCountByDate[item.payedAt] = 1;
          }
        });

        const labels = Object.keys(salesCountByDate);
        const salesCounts = Object.values(salesCountByDate);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Количество закрытий',
              data: salesCounts,
              backgroundColor: 'rgba(75,192,192,0.4)',
              borderColor: 'rgba(75,192,192,1)',
              borderWidth: 5,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching sales data', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="chart-container p-4 bg-white shadow-md rounded-lg mx-20 my-10">
      <h2 className="text-2xl font-bold mb-4 text-center">График закрытий</h2>
      <Line data={chartData} />
    </div>
  );
};

export default Chart;