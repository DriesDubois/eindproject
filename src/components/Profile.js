import {useAuthValue} from '../contexts/AuthContext'
import { signOut } from 'firebase/auth'
import { auth } from '../utils/firebase'
import Button from "react-bootstrap/Button";

export function Profile() {
    const {currentUser} = useAuthValue()

    return (
        <div className='center'>
            <div className='profile'>
                <h1>Profile</h1>
                <p><strong>Email: </strong>{currentUser?.email}</p>
                <p>
                    <strong>Email verified: </strong>
                    {`${currentUser?.emailVerified}`}
                </p>
                <Button onClick={() => signOut(auth)} variant="outline-danger" href="#/">Sign Out</Button>
            </div>
        </div>
    )
}
