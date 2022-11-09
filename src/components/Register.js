import {useState} from 'react'
import {auth} from '../utils/firebase'
import {useNavigate} from 'react-router-dom'
import {createUserWithEmailAndPassword, sendEmailVerification} from 'firebase/auth'
import {useAuthValue} from '../contexts/AuthContext'
import Button from "react-bootstrap/Button";

export function Register() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const history = useNavigate()
    const {setTimeActive} = useAuthValue()

    const validatePassword = () => {
        let isValid = true
        if (password !== '' && confirmPassword !== ''){
            if (password !== confirmPassword) {
                isValid = false
                setError('Passwords does not match')
            }
        }
        return isValid
    }

    const register = e => {

        e.preventDefault()
        setError('')
        if(validatePassword()) {
            // Create a new user with email and password using firebase
            createUserWithEmailAndPassword(auth, email, password)
                .then(() => {
                    sendEmailVerification(auth.currentUser)
                        .then(() => {
                            setTimeActive(true)
                            history('/VerifyEmail')
                        }).catch((err) => alert(err.message))
                })
                .catch(err => setError(err.message))
        }
        setEmail('')
        setPassword('')
        setConfirmPassword('')
    }

    return (
        <div>
            <h1 className={"text-center mb-3"}>Register</h1>
            <div className='text-center'>
                {error && <div className='auth__error'>{error}</div>}
                <form className={"d-flex flex-column align-items-center gap-3 mb-3"} onSubmit={register} name='registration_form'>
                    <input
                        type='email'
                        value={email}
                        placeholder="Enter your email"
                        required
                        onChange={e => setEmail(e.target.value)}/>

                    <input
                        type='password'
                        value={password}
                        required
                        placeholder='Enter your password'
                        onChange={e => setPassword(e.target.value)}/>

                    <input
                        type='password'
                        value={confirmPassword}
                        required
                        placeholder='Confirm password'
                        onChange={e => setConfirmPassword(e.target.value)}/>

                    <Button Variant="info" type='submit'>Register</Button>

                </form>
                <span>
          <p>Already have an account? </p>
          <Button className={"mb-3"} Variant="warning" href="#/Login">Log in</Button>
        </span>
            </div>
        </div>
    )
}
