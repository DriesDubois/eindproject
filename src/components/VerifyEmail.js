import {useAuthValue} from '../contexts/AuthContext'
import {useState,useEffect} from 'react'
import {auth} from '../services/firebase'
import {sendEmailVerification} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'

function VerifyEmail() {
    const {currentUser} = useAuthValue()
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [time, setTime] = useState(60)

    // Imported timer form app.js for use over entire app
    const {timeActive, setTimeActive} = useAuthValue()

    const history = useNavigate()

    useEffect(() => {
        const interval = setInterval(() => {
            currentUser?.reload()
                .then(() => {
                    if(currentUser?.emailVerified){
                        clearInterval(interval)
                        history('/Profile')
                    }
                })
                .catch((err) => {
                    alert(err.message)
                })
        }, 1000)
    }, [history, currentUser])

    //This is an effect (timer) to disable the button for 60 seconds
    //so you can't accidentally send too many verification mails
    useEffect(() => {
        let interval = null
        if(timeActive && time !== 0 ){
            interval = setInterval(() => {
                setTime((time) => time - 1)
            }, 1000)
        }else if(time === 0){
            setTimeActive(false)
            setTime(60)
            clearInterval(interval)
        }
        return () => clearInterval(interval);
    }, [timeActive, time])

    //This resends the verification email but firebase has a limit of 60 seconds between resending these
    const resendEmailVerification = () => {
        setButtonDisabled(true)
        sendEmailVerification(auth.currentUser)
            .then(() => {
                setButtonDisabled(false)
                setTimeActive(true)
            }).catch((err) => {
            alert(err.message)
            setButtonDisabled(false)
        })
    }


    return (
        <div className='center'>
            <div className='verifyEmail'>
                <h1>Verify your Email Address</h1>
                <p>
                    <strong>A Verification email has been sent to:</strong><br/>
                    <span>{currentUser?.email}</span>
                </p>
                <span>Follow the instruction in the email to verify your account</span>
                <button
                    onClick={resendEmailVerification}
                    disabled={timeActive}
                >Resend Email {timeActive && time}
                </button>
            </div>
        </div>
    )
}

export default VerifyEmail
