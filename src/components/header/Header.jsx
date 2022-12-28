import { Outlet, Link, NavLink } from 'react-router-dom'

import { useSelector } from 'react-redux'

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
    {
        id: 6,
        name: 'Музыка',
        to: '/singin'
    },
    {
        id: 7,
        name: 'Регистрация',
        to: '/signup'
    },
]

export function Header() {

    const name = useSelector((store) => store.name)
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
                <Outlet />
            </main>
        </>
    )
}