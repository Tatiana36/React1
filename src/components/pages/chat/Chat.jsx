// import { useEffect } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { Form } from '../../form/Form'
import { MessageList } from '../../messageList/MessageList'
import { ChatList } from '../../chatList/ChatList'

import { WithClasses } from '../../HOC/WithClasses'
import { useSelector } from 'react-redux'
import { selectMessage } from '../../store/messages/selectors'
import styles from './Chat.module.css'

export function Chat() {
    const { chatId } = useParams()
    const messages = useSelector(selectMessage)

    const MessageListWithClass = WithClasses(MessageList)

    if (chatId && !messages[chatId]) {
        return <Navigate to="/chats" replace />
    }

    return (
        <>

            <h1 className={styles.hTxt}>Добро пожаловать в чат</h1>
            <div className={styles.chatBox}>
                <div>
                    <ChatList />
                </div>
                <div>
                    <Form />
                    <MessageListWithClass
                        messages={chatId ? messages[chatId] : []}
                        classes={styles.border}
                    />
                </div>
            </div>
        </>
    )
}
