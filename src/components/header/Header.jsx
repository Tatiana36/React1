import { Outlet, Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { logOut } from '../services/firebase'
import styles from './Header.module.css'

export const navigates = [
    {
        id: 1,
        name: 'Главная',
        to: '/'
    },
    {
        id: 2,
        name: 'Профиль',
        to: '/profile'
    },
    {
        id: 3,
        name: 'Чат',
        to: '/chats'
    },
    {
        id: 4,
        name: 'О нас',
        to: '/about'
    },
    {
        id: 5,
        name: 'Статьи',
        to: '/articles'
    },


]

export function Header() {
    const navigate = useNavigate()
    const name = useSelector((store) => store.profile.name)
    const isAuth = useSelector((store) => store.profile.isAuth)
    const handleLogin = () => {
        navigate('/signin')
    }
    const handleSignUp = () => {
        navigate('/signup')
    }
    const handleLogout = async () => {
        await logOut()
    }
    return (
        <>
            <header>
                <nav className={styles.header}>
                    <ul className={styles.headerUl}>
                        {navigates.map((link) => (
                            <li className={styles.navlink} key={link.id}>
                                <NavLink
                                    to={link.to}
                                    style={({ isActive }) => ({
                                        color: isActive ? 'white' : 'black'
                                    })}
                                >
                                    {link.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                    {!isAuth && (
                        <>
                            <div className={styles.divButton}>
                                <button className={styles.hedButton} onClick={handleLogin}>Регистрация</button>
                                <button className={styles.hedButton} onClick={handleSignUp}>Mузыка</button>
                            </div>

                        </>
                    )}
                    {isAuth && (
                        <>
                            <button onClick={handleLogout}>logout</button>
                        </>
                    )}
                    <p className={styles.pHeader}>{name}</p>
                </nav>
            </header>
            <main>
                <Outlet/>
            </main>
        </>
    )
}