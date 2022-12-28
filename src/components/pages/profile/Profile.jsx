import { useContext, useState } from 'react'
import { ThemeContext } from '../../utils/ThemeContext'
import { useSelector, useDispatch } from 'react-redux'
import { changeName, toggleProfile } from '../../store/profile/actions'
import { selectName, selectVisible } from '../../store/profile/selectors'
import styles from './Profile.module.css'

export function Profile() {
    const { theme, toggleTheme } = useContext(ThemeContext)
    const name = useSelector(selectName)
    const visible = useSelector(selectVisible)
    const [value, setValue] = useState('')
    const dispatch = useDispatch()


    return (
        <>

            <h1 className={styles.hProfile}>Профиль</h1>
            <div className={styles.profileTheme}>
                <p className={styles.temeProfile}>{theme === 'light' ? '🌞' : '🌙'}</p>
                <button className={styles.buttonProfile} onClick={toggleTheme}>Изменить тему</button>
            </div>
            <hr />
            <h2>{name}</h2>
            <input className={styles.ProfileCheckbox} type="checkbox" checked={visible} readOnly />
            <button className={styles.profileButtonCheckbox } onClick={() => dispatch(toggleProfile())} >Изменить имя</button>
            <br />
            <input
                className={styles.inputProfile}
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <button className={styles.buttonProfile} onClick={() => dispatch(changeName(value))}>Cменить имя</button>
        </>
    )
}