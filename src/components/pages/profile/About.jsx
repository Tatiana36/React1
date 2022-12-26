import { useContext, useState } from 'react'
import { connect } from 'react-redux'
import { ThemeContext } from '../../utils/ThemeContext'
import { changeName, toggleProfile } from '../../store/profile/actions'
import stules from './Profile.module.css'

function About(props) {
    const { theme, toggleTheme } = useContext(ThemeContext)
    const [value, setValue] = useState('')


    return (
        <>

            <h1 className={stules.hProfile}>About</h1>
            <div className={stules.profileTheme}>
                <p className={stules.temeProfile}>{theme === 'light' ? '🌞' : '🌙'}</p>
                <button className={stules.buttonProfile} onClick={toggleTheme}>Изменить тему</button>
            </div>
            <hr />
            <h2>{props.name}</h2>
            <input className={stules.ProfileCheckbox} type="checkbox" checked={props.visible} readOnly />
            <button className={stules.profileButtonCheckbox } onClick={() => props.toggle()} >Изменить имя</button>
            <br />
            <input
                className={stules.inputProfile}
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <button className={stules.buttonProfile} onClick={() => props.changeName(value)}>Cменить имя</button>
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