import { FC, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { instance } from '../api/axios.api';
import Profile from '../components/Profile';

const Leaderboard: FC = () => {
  const [totalSales, setTotalSales] = useState(0);

  const profileLoader = async () => {
    const { data } = await instance.get('/managers/leaderboard');
  
    const transformedData = data.map(item => ({
      id: item.id,
      name: item.name,
      monthly_sales: item.monthly_sales,
      personal_monthly_goal: parseFloat(item.personal_monthly_goal),
      salary: item.salary,
      team: item.team,
      quantityOfSales: item.quantityOfSales,
      avgPayedPrice: item.avgPayedPrice,
      updatedAt: new Date(item.updatedAt)
    }));
    console.log(transformedData);
    return transformedData;
  };

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const { data } = await instance.get('/managers/leaderboard');
        const total = data.reduce((acc, item) => acc + (item.monthly_sales || 0), 0);
        setTotalSales(total);
      } catch (error) {
        console.error('Error fetching leaderboard data', error);
      }
    };

    fetchLeaderboard();

    const socket = io('http://45.131.96.9:3000');
    socket.on('updateLeaderboard', fetchLeaderboard);

    return () => {
      socket.disconnect();
    };
  }, []);

  const goal = 19500000; // Цель продаж в рублях
  const progressPercentage = (totalSales / goal) * 100;

  return (
    <div className="profile-container items-center justify-center">
      <div className="profile-header">
        <h1>Список лидеров</h1>
        <h2>Август</h2>
        <h3>Закрытие плана</h3>
        <div className="progress-bar-container">
          <div className="progress-bar">
            <div
              className="progress-bar-fill"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <span className="progress-percentage">
            {progressPercentage.toFixed(2)}%
          </span>
        </div>
      </div>
      <Profile profileLoader={profileLoader} />
    </div>
  );
};

export default Leaderboard;