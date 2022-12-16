import styles from './Profile.module.css';
import {useContext, useState} from 'react';
import {ThemeContext} from '../../utils/ThemeContext';
import { useSelector, useDispatch } from 'react-redux';
import * as types from '../../store/profile/tupes';
import { changeName } from '../../store/profile/actions';

export function Profile() {
    const { theme, toggleTheme } = useContext(ThemeContext)
    const name = useSelector((store) => store.name)
    const [value, setValue] = useState('')
    const dispatch = useDispatch()
    const hendleChange = () => {
        console.log(value)
        dispatch(changeName(value))
        setValue('')
    }

    return (
        <>
            <div className={styles.profileTheme}>
            <h1 className={styles.profileH}>Профиль</h1>
            <p>{theme === 'light' ? '🌞' : '🌙'}</p>
            <button className={styles.buttonProfile} onClick={toggleTheme}>Сменить тему</button>
            </div>
            <hr />
            <h2>{name}</h2>
            <input
                autoFocus
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <button className={styles.buttonProfile} onClick={() => dispatch(changeName(value))}>Изменить имя</button>
        </>
    )
}