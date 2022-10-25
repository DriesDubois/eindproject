import {
    MDBFooter,
    MDBContainer,
    MDBIcon,
    MDBInput,
    MDBCol,
    MDBRow,
    MDBBtn
} from 'mdb-react-ui-kit';

export function MyFooter (){
    return <MDBFooter className='text-center fixed-bottom' color='white' bgColor='dark'>
        <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
            <p className='text-white'>
                © 2022 Copyright Dries Dubois
            </p>
        </div>
    </MDBFooter>
}