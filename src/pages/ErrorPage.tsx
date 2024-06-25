import { FC } from 'react'
import img from '../assets/1585603552_preview_error404_logo.png'
import { Link } from 'react-router-dom'

const ErrorPage: FC = () => {
  return <div className='min-h-screen bg-slate-100 font-roboto text-white flex justify-center items-center flex-col gap-10'>
    <img src={img} alt='error' className='w-80'></img>
    <Link to={'/'} className='bg-sky-500 rounded-md px-6 py-2 hover:bg-sky-600'>
    Back</Link>
  </div>
}

export default ErrorPage