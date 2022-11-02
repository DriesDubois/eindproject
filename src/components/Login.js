import {useState} from 'react'
import { Link } from 'react-router-dom'
import { useAuthValue } from "../contexts/AuthContext"

import {signInWithEmailAndPassword, sendEmailVerification} from 'firebase/auth'
import {auth} from '../services/firebase'
import {useNavigate} from 'react-router-dom'

export function Login(){

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const {currentUser} = useAuthValue()
    console.log(currentUser)
    const {setTimeActive} = useAuthValue()
    const history = useNavigate()

    const login = e => {
        e.preventDefault()
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                if(!auth.currentUser.emailVerified) {
                    sendEmailVerification(auth.currentUser)
                        .then(() => {
                            setTimeActive(true)
                            history('/VerifyEmail')
                        })
                        .catch(err => alert(err.message))
                }else{
                    history('/Profile')
                }
            })
            .catch(err => setError(err.message))
    }

    return(
        <div className='center'>
            <div className='auth'>
                <h1>Log in</h1>
                {error && <div className='auth__error'>{error}</div>}
                <form onSubmit={login} name='login_form'>
                    <input
                        type='email'
                        value={email}
                        required
                        placeholder="Enter your email"
                        onChange={e => setEmail(e.target.value)}/>

                    <input
                        type='password'
                        value={password}
                        required
                        placeholder='Enter your password'
                        onChange={e => setPassword(e.target.value)}/>

                    <button type='submit'>Login</button>
                </form>
                <p>
                    Don't have and account?
                    <Link to='/register'>Create one here</Link>
                </p>
            </div>
        </div>
    )
}
