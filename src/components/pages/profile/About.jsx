import { useContext, useState } from 'react'
import { ThemeContext } from '../../utils/ThemeContext'
import { useSelector, useDispatch } from 'react-redux'
import * as types from '../../store/profile/tupes'
import { changeName, toggleProfile } from '../../store/profile/actions'
import { selectName, selectVisible } from '../../store/profile/selectors'
import stules from './Profile.module.css'

export function About() {
    const { theme, toggleTheme } = useContext(ThemeContext)
    const name = useSelector(selectName)
    const visible = useSelector(selectVisible)
    const [value, setValue] = useState('')
    const dispatch = useDispatch()
    const hendleChange = () => {
        console.log(value)
        dispatch(changeName(value))
        setValue('')
    }

    return (
        <>

            <h1 className={stules.hProfile}>About</h1>
            <div className={stules.profileTheme}>
                <p className={stules.temeProfile}>{theme === 'light' ? '🌞' : '🌙'}</p>
                <button className={stules.buttonProfile} onClick={toggleTheme}>Изменить тему</button>
            </div>
            <hr />
            <h2>{name}</h2>
            <input className={stules.ProfileCheckbox} type="checkbox" checked={visible} readOnly />
            <button className={stules.profileButtonCheckbox } onClick={() => dispatch(toggleProfile())} >Изменить имя</button>
            <br />
            <input
                className={stules.inputProfile}
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <button className={stules.buttonProfile} onClick={() => dispatch(changeName(value))}>Cменить имя</button>
        </>
    )
}