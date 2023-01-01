import { Routes, Route } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { Header } from './components/header/Header'
import { Main } from './components/pages/main/Main'
import { Chat } from './components/pages/chat/Chat'
import { ChatList } from './components/chatList/ChatList'
import { useEffect, useState } from 'react'
import { defaultContext, ThemeContext } from './components/utils/ThemeContext'
import { store, persistor } from './components/store'
import { AboutWithConnect } from './components/pages/profile/About'
import { Articles } from './components/pages/articles/Articles'
import { SingIn } from './components/pages/SignIn'
import { SignUp } from './components/pages/SignUp'
import { useDispatch } from 'react-redux'
import { auth } from './components/store/profile/actions'
import { firebaseAuth, messagesRef } from './components/services/firebase'
import { onValue } from "firebase/database";
import { Profile } from './components/pages/profile/Profile'
import { PublicRoute } from './components/utils/PublicRoute'
import { PrivateRoute } from './components/utils/PriviteRoute'


export function App () {
    const dispatch = useDispatch()
    const [theme, setTheme] = useState(defaultContext.theme)
    const [messageDB, setMessageDB] = useState({})
    const [chats, setChats] = useState([])

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }

    useEffect(() => {
        const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
            if (user) {
                dispatch(auth(true))
            } else {
                dispatch(auth(false))
            }
        })

        return unsubscribe
    }, [])

    useEffect(() => {
        onValue(messagesRef, (snapshot) => {
            const data = snapshot.val()
            console.log('snapshot', data)

            const newChats = Object.entries(data).map((item) => ({
                name: item[0],
                message: item[1].messageList
            }))
            console.log(newChats)

            setMessageDB(data)
            setChats(newChats)
        })
    }, [])

    return (
        <>
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
                            <Route path="chats" element={<PrivateRoute />}>
                            <Route
                                index
                                element={<ChatList chats={chats} messageDB={messageDB} />}
                            />
                            <Route
                                path=":chatId"
                                element={<Chat chats={chats} messageDB={messageDB} />}
                            />
                        </Route>
                        <Route path="articles" element={<Articles />} />
                        <Route path="signin" element={<PublicRoute component={<SingIn />} />} />
                        <Route path="signup" element={<SignUp />} />
                    </Route>

                    <Route path="*" element={<h2>404 Ошибка страници</h2>} />
                    </Routes>
                </ThemeContext.Provider>
                </PersistGate>
        </>
    )
}