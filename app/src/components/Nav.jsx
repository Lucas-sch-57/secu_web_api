import { HomeSimple, LogIn, LogOut, User, Archive } from 'iconoir-react'
import { NavLink } from 'react-router-dom'
import { userContext } from '../stores/UserStore'
import { useContext } from 'react'
import { observer } from 'mobx-react'

export const Nav = observer(() => {
    const userStore = useContext(userContext)
    const token = localStorage.getItem('token');
    const handleLogout = (e) => {
        if (token) {
            e.preventDefault();
            localStorage.removeItem('token');
            window.location.href = '/';
        }
    }
    return (
        <div className="navbar bg-slate-900 py-6">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li>
                            <NavLink to="/" className="flex items-center gap-2">
                                Accueil
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/posts" className="flex items-center gap-2">
                                Posts
                            </NavLink>
                        </li>
                        <li>
                            {!userStore.isLoggedIn && (
                                <NavLink to="/register" className="flex items-center gap-2">
                                    <User />
                                    Inscription
                                </NavLink>
                            )}
                        </li>
                        <li>
                            <NavLink to="/profile" className="flex items-center gap-2">
                                <User />
                                Profil
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <a className="btn btn-ghost normal-case text-xl">WishTwitter</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-5">
                    <li>
                        <NavLink to="/" className="flex items-center gap-2">
                            <HomeSimple />
                            Accueil
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/posts" className="flex items-center gap-2">
                            <Archive />
                            Posts
                        </NavLink>
                    </li>
                    {!userStore.isLoggedIn && (
                        <li>
                            <NavLink to="/register" className="flex items-center gap-2">
                                <User />
                                Inscription
                            </NavLink>
                        </li>
                    )}
                    <li>
                        <NavLink to="/profile" className="flex items-center gap-2">
                            <User />
                            Profil
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className="navbar-end">
                {userStore.isLoggedIn ? (
                    <a className="btn btn-xs btn-error" onClick={handleLogout}>
                        <LogOut />
                        Déconnexion
                    </a>
                ) : (
                    <li>
                        <NavLink className="btn btn-xs btn-primary" to='/login'>
                            <LogIn />
                            Connexion
                        </NavLink>
                    </li>
                )}
            </div>
        </div >
    )
})
