import PropTypes from 'prop-types'
import { useState } from 'react'
import { AUTHOR } from '../constants'
import { Button } from '../button/Button'
import { useDispatch } from 'react-redux'
import { addMessage, addMessageWithReply } from '../store/messages/actions'
import { useParams } from 'react-router-dom'
import styles from './Form.module.css'

export function Form() {
    const [text, setText] = useState('')
    const dispatch = useDispatch()
    const { chatId } = useParams()

    const handleSubmit = (e) => {
        e.preventDefault()

        dispatch(addMessageWithReply(chatId, {
            author: AUTHOR.user,
            text
        }))

        setText('')
    }

    return (
        <>
            <h1 className={styles.hForm}>Форма</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                />
                <Button type="submit">Добавить сообщение</Button>
            </form>

        </>
    )
}

Form.propTypes = {
    addMessage: PropTypes.func

}