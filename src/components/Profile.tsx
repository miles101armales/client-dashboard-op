import { useEffect, useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

const Profile = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const { data } = await axios.get('http://localhost:3000/managers/leaderboard');
        setLeaderboard(data);
      } catch (error) {
        console.error('Error fetching leaderboard data', error);
      }
    };

    fetchLeaderboard();

    // Подключение к WebSocket серверу
    const socket = io('http://localhost:3000');

    // Обновление данных при получении уведомления
    socket.on('updateLeaderboard', fetchLeaderboard);

    // Очистка при размонтировании компонента
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div id="profile">
      {Array.isArray(leaderboard) ? item(leaderboard) : <div>Loading...</div>}
    </div>
  );
};

function item(data) {
	return (
	  <>
		{data
		  .filter(value => value.monthly_sales !== null && value.monthly_sales !== 0) // Фильтруем null и 0
		  .map((value, index) => (
			<div className="profile-item" key={index}>
			  <div className="profile-info">
				<h3>{value.name}</h3>
				<span>{value.team}</span>
			  </div>
			  <div className="profile-sales">
				<span>{value.monthly_sales !== null ? value.monthly_sales.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' }) : '-'}</span>
			  </div>
			</div>
		  ))}
	  </>
	);
  }

export default Profile;
