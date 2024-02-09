import { useContext, useState } from "react"
import { LaravelContext } from "../../context"
import { Link, useNavigate } from "react-router-dom";
import { ReadUsersAdmin } from "../../services/user.routes";
import "./login.css"

const Login = () => {
    const {setLogin, setLoggedIn} = useContext(LaravelContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const { data, error } = await ReadUsersAdmin();
            if (error) {
                console.log(error);
                return;
            }
            const user = data.find(user => user.email === email && user.password === password);
            console.log(user)
            if (user) {
                setLogin(user); 
                navigate("/credit_requests", { replace: true });

                localStorage.setItem("account", JSON.stringify(user));
                setLoggedIn(true)
            } else {
                setErrorMessage("incorrect credentials");
            }
            
        } catch (error) {
            console.log(error);
        }
    };
    
    return (
        <div className="w-100 position-relative login">
            <div className="w-25 d-flex flex-column justify-content-center align-items-center position-absolute top-50 start-50 translate-middle border rounded-3 p-4 bg-light">
                <h1 className="mb-4 mt-4">Login</h1>
                {errorMessage && <div className="error-message text-danger border p-1">{errorMessage}</div>}
                <form>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input 
                            type="email" 
                            id="email"  
                            className="form-control" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="d-flex justify-content-evenly mt-4">
                        <Link to="/login/sign">
                            <button type="button" className="btn btn-secondary">Sign Up</button>
                        </Link>
                        <button type="button" className="btn btn-success" onClick={handleLogin}>
                            Sign In
                        </button>
                    </div>
                </form>
                
            </div>
        </div>
    )
}

export default Login