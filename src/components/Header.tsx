import { FC } from 'react'
import { Link, NavLink } from 'react-router-dom';
import { FaDollarSign, FaSignOutAlt } from 'react-icons/fa'

const Header: FC = () => {
	const isAuth = true;
  return (
	<header className='flex items-center p-4 shadow-sm bg-slate-800 backdrop-blur-sm'>
		<Link to='/'>
			<FaDollarSign size={20} />
		</Link>

		{/* Menu */}
		{isAuth && (
				<nav className='ml-auto '>
					<ul className="flex items-center gap-5 ml-auto mr-10">
						<li>
							<NavLink to='/' className={({isActive}) => isActive ? 'text-white' : 'text-white/50'}>Leaderboard</NavLink>
						</li>
						<li>
							<NavLink to='/mysales' className={({isActive}) => isActive ? 'text-white' : 'text-white/50'}>My Sales</NavLink>
						</li>
						<li>
							<NavLink to='/myteam' className={({isActive}) => isActive ? 'text-white' : 'text-white/50'}>My Team</NavLink>
						</li>
					</ul>
				</nav>
		)}

		{/* Actions */}
		{
			isAuth ? (
				<button className="btn btn-red">
					<span>Log Out</span>
					<FaSignOutAlt />
				</button>
			) : (
				<Link className='py-2 text-white/50 hover:text-white ml-auto ' to='auth'>
					Log In / Sign In
				</Link>
			)
		}
	</header>
  )
}

export default Header