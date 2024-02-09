import {PeopleAlt, AttachMoney, Notifications, ExitToApp, Login} from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Chat from '../chat';

const Navbar = () => {

    const [loginValue, setLoginValue] = useState(null);

    useEffect(() => {
        const accountData = localStorage.getItem("account");
        const newLog = accountData ? JSON.parse(accountData) : null;
        
        if (newLog !== null) {
            const role = newLog.fk_role;
            setLoginValue(role);
        }
    }, []);

    const signout = () => {
        localStorage.removeItem("account");
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }

    const renderView = () => {
        if(loginValue === 1 || loginValue === 2){
            return (
                <div className="d-flex flex-column bg-primary list-unstyled">
                    <div className='mb-5 lead'>
                        <Link to="/users">
                            <span className="d-flex justify-content-between text-light"><PeopleAlt className='me-5'/> Users</span>
                        </Link>
                    </div>
                    <div className="mb-5 lead">
                        <Link to="/credits">
                            <span className="d-flex justify-content-between text-light"><AttachMoney className='me-5'/> Credits</span>
                        </Link>
                    </div>
                    <div className='mb-5 lead'>
                        <Link to="/credit_requests">
                            <span className="d-flex justify-content-between text-light"><Notifications className='me-5'/> Requests</span>
                        </Link>
                    </div>
                    <div className='lead'>
                        <Link to="/" onClick={signout}>
                            <span className="d-flex justify-content-between text-light"><ExitToApp className='me-5'/> Sign Out</span>
                        </Link>
                    </div>
                </div>
              )
        } 
        if(loginValue === 3) {
            return(
                <div className="d-flex flex-column bg-primary list-unstyled">
                    <div className='mb-5 lead'>
                        <Link to="/credit_requests">
                            <span className="d-flex justify-content-between text-light"><Notifications className='me-5'/> Requests</span>
                        </Link>
                    </div>
                    <div className='lead'>
                        <Link to="/" onClick={signout}>
                            <span className="d-flex justify-content-between text-light"><ExitToApp className='me-5'/> Sign Out</span>
                        </Link>
                    </div>
                </div>
            )
        }
        if(loginValue === 4) {
            return(
                <>
                <Chat/>  
                    <div className="d-flex flex-column bg-primary list-unstyled">
                        <div className="mb-5 lead">
                            <Link to="/credits">
                                <span className="d-flex justify-content-between text-light"><AttachMoney className='me-5'/>My Credits</span>
                            </Link>
                        </div>
                        <div className='mb-5 lead'>
                            <Link to="/credit_requests">
                                <span className="d-flex justify-content-between text-light"><Notifications className='me-5'/>My Requests</span>
                            </Link>
                        </div>
                        <div className='lead'>
                            <Link to="/" onClick={signout}>
                                <span className="d-flex justify-content-between text-light"><ExitToApp className='me-5'/>Sign Out</span>
                            </Link>
                        </div>
                    </div>
                </>
            )
        }
        if (loginValue === null) {
            return(
                <div className="d-flex flex-column bg-primary text-light">
                    <div className='mb-4'>
                        <h1 className='fw-seemibold'>Bank IA</h1>
                        <figcaption className="blockquote-footer text-light">
                            <cite title="Source Title">Conectando el poder de la inteligencia artificial con tus necesidades financieras</cite>
                        </figcaption>
                    </div>
                    <div className='mt-4'>
                        <Link to="/login" className='text-light'>
                            <span className="d-flex text-light"><Login className='me-5'/>Log In</span>
                        </Link>
                    </div>
                </div>                
            );
        }
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }
    

    return (
        <>
            <div className="d-flex justify-content-center align-items-center bg-primary text-light p-5 position-relative" style={{height:"100vh", width:"25vw"}}>
                {renderView()}
            </div>
        </>
      )
}

export default Navbar