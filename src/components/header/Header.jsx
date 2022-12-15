import { Outlet, NavLink } from 'react-router-dom';
import styles from './Header.module.css'

export const navigate = [
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
]

export function Header() {

    return (
        <>
            <header>
                <nav className={styles.header}>
                    <ul className={styles.headerUl}>
                        {navigate.map((link) => (
                            <li className={styles.headerLi} key={link.id}>
                                <NavLink className={styles.headerA}
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
                </nav>
            </header>
            <main className={styles.margin}>
                <Outlet/>
            </main>
        </>
    )
}