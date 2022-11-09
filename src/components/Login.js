import {useState} from 'react'
import {useAuthValue} from "../contexts/AuthContext"

import {signInWithEmailAndPassword, sendEmailVerification} from 'firebase/auth'
import {auth} from '../utils/firebase'
import {useNavigate} from 'react-router-dom'
import Button from "react-bootstrap/Button";

export function Login() {

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
                if (!auth.currentUser.emailVerified) {
                    sendEmailVerification(auth.currentUser)
                        .then(() => {
                            setTimeActive(true)
                            history('/VerifyEmail')
                        })
                        .catch(err => alert(err.message))
                } else {
                    history('/Profile')
                }
            })
            .catch(err => setError(err.message))
    }

    return (
        <div>
            <h1 className={"text-center mb-3"}>Log in</h1>
            <div className='text-center'>

                {error && <div className='auth__error'>{error}</div>}
                <form className={"d-flex flex-column align-items-center gap-3 mb-3"} onSubmit={login} name='login_form'>
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
                    <div>
                        <Button className={"mx-3"} Variant="info" type='submit'>Login</Button>
                        <Button Variant="warning" href="#/Register">Register an account</Button>
                    </div>

                </form>

            </div>
        </div>
    )
}
