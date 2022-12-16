import { Routes, Route } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { Header } from './components/header/Header';
import { Main } from './components/pages/main/Main';
import { Profile} from './components/pages/profile/Profile';
import { Chat } from './components/pages/chat/Chat';
import { ChatList } from './components/chatList/ChatList';
import React, { useState } from 'react';
import { defaultContext, ThemeContext } from './components/utils/ThemeContext';
import { Provider } from 'react-redux';
import { store } from './components/store'


const degaultMessges = {
    default: [
        {
            author: 'Пользователь',
            text: 'первое сообщение'
        },
        {
            author: 'Пользователь',
            text: 'второе сообщение'
        },
    ]
}

export function App () {
    const [messages, setMessages] = useState(degaultMessges)
    const [theme, setTheme] = useState(defaultContext.theme)

    const chats = Object.keys(messages).map((chat) => ({
        id: nanoid(),
        name: chat
    }))

    const onAddChat = (newChat) => {
        console.log('newChat', newChat)
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

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }

    return (
        <>
            <Provider store={store}>
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
                                    element={<Chat chats={chats}
                                                        messages={messages}
                                                        onAddMessage={onAddMessage}
                                                        onAddChat={onAddChat} />}
                                />
                            </Route>
                        </Route>

                        <Route path="*" element={<h2>404 Страница не найдена</h2>} />
                    </Routes>
                </ThemeContext.Provider>
            </Provider>
        </>
    )
}