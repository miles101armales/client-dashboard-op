import { FC } from 'react';
import loadingGif from '../assets/NZFC.gif'

const UnderConstruction: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <img src={loadingGif} alt="Loading Animation" className="h-40" />
      <h1 className="mt-5 text-2xl font-bold text-black animate-pulse font-roboto">В разработке</h1>
    </div>
  );
}

export default UnderConstruction;