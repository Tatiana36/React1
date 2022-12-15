import { Routes, Route } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { Header } from './components/header/Header';
import { Main } from './components/pages/main/Main';
import { Profile} from './components/pages/profile/Profile';
import { Chat } from './components/pages/chat/Chat';
import { ChatList } from './components/chatList/ChatList';
import React, { useState } from 'react';
import { defaultContext, ThemeContext } from './utils/ThemeContext';


const degaultMessges = {
    default: [
        {
            author: 'пользователь',
            text: 'первое сообщение'
        },
        {
            author: 'пользователь',
            text: 'второе сообщение'
        },
    ]
}

export function App () {
    const [messages, setMessages] = useState(degaultMessges.theme)
    const [theme, setTheme] = useState(defaultContext)
    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }
    const chats = Object.keys(messages).map((chat) => ({
        id: nanoid(),
        name: chat
    }))

    const onAddChat = (newChat) => {
        setMessages({
            ...messages,
            [newChat.name]: []
        })
    }

    const onAddMessage = (chatId, newMassage) => {
        setMessages({
            ...messages,
            [chatId]: [...messages[chatId], newMassage]
        })
    }

    return (
        <>
            <ThemeContext.Provider value={{
                theme,
                toggleTheme
           }}>
            <Routes>
                <Route path='/' element={<Header />}>
                    <Route index element={<Main />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="chats">
                        <Route index element={<ChatList chats={chats} onAddChat={onAddChat} />} />
                        <Route
                            path=":chatId"
                            element={<Chat   chats={chats}
                                                messages={messages}
                                                onAddMessage={onAddMessage}
                                                onAddChat={onAddChat} />}
                        />
                    </Route>
                </Route>
                <Route path="*" element={<h2>404 Page not FOUND</h2>} />
            </Routes>
            </ThemeContext.Provider>
        </>
    )
}