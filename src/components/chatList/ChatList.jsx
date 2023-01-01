import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addChat, deleteChat } from '../store/messages/actions';
import { selectChat } from '../store/messages/selectors';
import stules from './ChatList.module.css';
import { push, set, remove } from "firebase/database";
import { messagesRef } from '../services/firebase'


export function ChatList({messageDB, chats}) {
    const [value, setValue] = useState('')
    const dispatch = useDispatch()


    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(addChat(value))
        set(messagesRef, {
            ...messageDB,
            [value]: {
                name: value
            }
        })
    }
    return (
        <>
            <ul>
                {chats.map((chat) => (
                    <li className={stules.chatListLi} key={chat.id}>
                        <Link to={`/chats/${chat.name}`}>
                            {chat.name}
                        </Link>
                        <button className={stules.ChatListButton} onClick={() => dispatch(deleteChat(chat.name))}>X</button>
                    </li>
                ))}
            </ul>

            <h1 className={stules.hCatList}>Чаты</h1>
            <div className={stules.width}>
                <form onSubmit={handleSubmit}>
                    <div className={stules.chatFlex}>
                        <input
                            type="text"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                        />
                        <button type="submit" className={stules.button}>Создать чат</button>
                    </div>
                </form>
            </div>
        </>
    )
}