import { Routes, Route } from 'react-router-dom'
import { Header } from './components/header/Header'
import { Main } from './components/pages/main/Main'
import { Profile } from './components/pages/profile/Profile'
import { Chat } from './components/pages/chat/Chat'
import { ChatList } from './components/chatList/ChatList'
import { useState } from 'react'
import { defaultContext, ThemeContext } from './components/utils/ThemeContext'
import { Provider } from 'react-redux'
import { store } from './components/store/index'
import { About } from './components/pages/profile/About';

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
                            <Route path="about" element={<About />} />
                            <Route path="chats">
                                <Route index element={<ChatList />} />
                                <Route
                                    path=":chatId"
                                    element={<Chat />}
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