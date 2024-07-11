import { FC, useEffect, useState } from 'react';
import Profile from '../components/Profile';
import { instance } from '../api/axios.api';

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

const Leaderboard: FC = () => {
  return (
    <div className="profile-container items-center justify-center">
      <div className="profile-header">
        <h1>Список лидеров</h1>
        <h2>Июль</h2>
      </div>
      <Profile profileLoader={profileLoader} />
    </div>
  );
};

export default Leaderboard;