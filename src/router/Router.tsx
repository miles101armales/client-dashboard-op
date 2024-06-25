import { createBrowserRouter } from 'react-router-dom';
import Layout from '../pages/Layout';
import ErrorPage from '../pages/ErrorPage';
import Leaderboard from '../pages/Leaderboard';
import MySales from '../pages/MySales';
import MyTeam from '../pages/MyTeam';
import Auth from '../pages/Auth';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: <Leaderboard />,
			},
			{
				path: '/mysales',
				element: <MySales />,
			},
			{
				path: '/myteam',
				element: <MyTeam />,
			},
			{
				path: '/auth',
				element: <Auth />,
			}
		]
	},
])