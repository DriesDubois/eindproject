import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {MyNavBar} from "./components/MyNavBar";
import {MyBrowserRouter} from "./fragments/MyBrowserRouter";
import "./utils/firebase";
import {MyFooter} from "./components/MyFooter";
import {AuthProvider} from './contexts/AuthContext'
import {useState, useEffect} from 'react'
import {auth} from './utils/firebase'
import {onAuthStateChanged} from 'firebase/auth'

function App() {
    const [currentUser, setCurrentUser] = useState(null)
    const [adminList, setAdminList] = useState(process.env.REACT_APP_ADMINS.split(' '))

    // this is here so that the timer on user registration starts immediatly
    //so theres no firebase errors if user clicks resend email right after making account
    const [timeActive, setTimeActive] = useState(false)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
            setAdminList(process.env.REACT_APP_ADMINS.split(' '))
        })
    }, [])

    return (
        <>
            <AuthProvider value={{currentUser,timeActive, setTimeActive,adminList}}>
                <MyNavBar/>
                <MyBrowserRouter/>
                <MyFooter/>
            </AuthProvider>
        </>
    );
}

export default App;
