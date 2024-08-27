import { FC, useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { instance } from '../api/axios.api';
import Profile from '../components/Profile';

const Leaderboard: FC = () => {
  const [totalSales, setTotalSales] = useState(0);
  const firstDivRef = useRef(null);
  const lastDivRef = useRef(null);
  const [scrollToLast, setScrollToLast] = useState(true);

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

    const duration = 15000; // Длительность прокрутки в миллисекундах
    const scrollStep = 10; // Шаг прокрутки в пикселях

    const scrollToElement = (element) => {
      const start = window.pageYOffset;
      const end = element.offsetTop;
      const distance = end - start;
      let startTime = null;

      const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const scrollY = Math.min(start + (distance * progress) / duration, end);
        window.scrollTo(0, scrollY);

        if (progress < duration) {
          requestAnimationFrame(step);
        } else {
          window.scrollTo(0, end);
        }
      };

      requestAnimationFrame(step);
    };

    const scrollInterval = setInterval(() => {
      if (scrollToLast) {
        scrollToElement(lastDivRef.current);
      } else {
        scrollToElement(firstDivRef.current);
      }
      setScrollToLast(!scrollToLast);
    }, 15000); // Интервал между прокрутками, 60000 миллисекунд = 1 минута

    // Очистка при размонтировании компонента
    return () => {
      socket.disconnect();
      clearInterval(scrollInterval); // Очищаем интервал при размонтировании
    };
  }, [scrollToLast]); // Обратите внимание на зависимость scrollToLast

  const goal = 19500000; // Цель продаж в рублях
  const progressPercentage = (totalSales / goal) * 100;

  return (
    <div className="profile-container items-center justify-center">
      <div className="profile-header" ref={firstDivRef}>
        <h1>Список лидеров</h1>
        <h2>Август</h2>
        <h3>Закрытие плана</h3>
        <div className="progress-bar-container">
          <span className="progress-percentage">
          {totalSales.toLocaleString()}₽
          </span>
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
      <div ref={lastDivRef}></div>
    </div>
  );
};

export default Leaderboard;