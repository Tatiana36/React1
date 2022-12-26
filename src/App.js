import { Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { Header } from './components/header/Header'
import { Main } from './components/pages/main/Main'
import { Profile } from './components/pages/profile/Profile'
import { Chat } from './components/pages/chat/Chat'
import { ChatList } from './components/chatList/ChatList'
import { useState } from 'react'
import { defaultContext, ThemeContext } from './components/utils/ThemeContext'
import { store, persistor } from './components/store/index'
import { AboutWithConnect } from './components/pages/profile/About'



export function App () {
    const [theme, setTheme] = useState(defaultContext.theme)

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }

    return (
        <>
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                <ThemeContext.Provider value={{
                    theme,
                    toggleTheme
                }}>
                    <Routes>
                        <Route path='/' element={<Header />}>
                            <Route index element={<Main />} />
                            <Route path="profile" element={<Profile />} />
                            <Route path="about" element={<AboutWithConnect />} />
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
                </PersistGate>
            </Provider>
        </>
    )
}