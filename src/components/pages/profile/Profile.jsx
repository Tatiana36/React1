import styles from './Profile.module.css';
import {useContext} from 'react';
import {ThemeContext} from '../../../utils/ThemeContext';

export function Profile() {
    const {theme, toggleTheme} = useContext(ThemeContext)
    console.log('theme ===>', theme);


    return (
        <>
            <h1 className={styles.hProfile}>Профиль</h1>

                <p className={styles.themeProfile}> 🌞 : 🌙</p>
                <button className={styles.buttonProfile} onClick={()=> toggleTheme}>Изменить тему</button>


        </>
    )
}