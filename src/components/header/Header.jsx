import { Outlet, NavLink } from 'react-router-dom';
import styles from './Header.module.css';
import { useSelector } from 'react-redux';


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
                        <p className={styles.headerName}>{name}</p>
                    </nav>
                </header>
                <main className={styles.margin}>
                    <Outlet/>
                </main>
            </>
        )
    }