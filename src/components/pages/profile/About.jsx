import { useContext, useState } from 'react'
import { connect } from 'react-redux'
import { ThemeContext } from '../../utils/ThemeContext'
import { changeName, toggleProfile } from '../../store/profile/actions'
import styles from './Profile.module.css'

function About(props) {
    const { theme, toggleTheme } = useContext(ThemeContext)
    const [value, setValue] = useState('')


    return (
        <>

            <h1 className={styles.hProfile}>О нас</h1>
            <div className={styles.profileTheme}>
                <p className={styles.temeProfile}>{theme === 'light' ? '🌞' : '🌙'}</p>
                <button className={styles.buttonProfile} onClick={toggleTheme}>Изменить тему</button>
            </div>
            <hr />
            <h2>{props.name}</h2>
            <input className={styles.ProfileCheckbox} type="checkbox" checked={props.visible} readOnly />
            <button className={styles.profileButtonCheckbox } onClick={() => props.toggle()} >Изменить имя</button>
            <br />
            <input
                className={styles.inputProfile}
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <button className={styles.buttonProfile} onClick={() => props.changeName(value)}>Cменить имя</button>
        </>
    )
}

const mapStateToProps = (state) => ({
    name: state.profile.name,
    visible: state.profile.visible
})

const mapDispatchToProps = (dispatch) => ({
    toggle: () => dispatch(toggleProfile()),
    changeName: value => dispatch(changeName(value))
})

export const AboutWithConnect = connect(mapStateToProps, mapDispatchToProps)(About)