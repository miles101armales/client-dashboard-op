import { FC, useState } from 'react';
import Slider from 'react-slick';
import Chart from './Chart';
import Profile from './Profile';

const Slideshow: FC = () => {
  const [autoplaySpeed, setAutoplaySpeed] = useState(300000); // Начальное время для leaderboard (5 минут)

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: autoplaySpeed,
    pauseOnHover: false,
    beforeChange: (current: number, next: number) => {
      if (next === 0) {
        setAutoplaySpeed(300000); // Время для leaderboard (5 минут)
      } else if (next === 1) {
        setAutoplaySpeed(30000); // Время для графика (30 секунд)
      }
    },
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full md:w-2/3 lg:w-1/2">
        <Slider {...settings}>
          <div>
            <Chart />
          </div>
          <div>
            <Profile />
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default Slideshow;