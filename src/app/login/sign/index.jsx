import { useState } from "react";
import { Link } from "react-router-dom";
import { CreateUser } from "../../../services/user.routes";
import AlertComponent from "../../../components/alerts";

const SignUp = () => {
    const [data, setData] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        repeatPassword: "", 
        status: 0,
        fk_role: 4
    });
    const [alertConfig, setAlertConfig] = useState({
        open: false,
        message: "",
        type: "success",
      });
    const [errorMessage, setErrorMessage] = useState(""); 

    const handleChange = (e) => {
        const { id, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [id]: value
        }));
    };

    const handleSubmit = async () => {
        if (data.password !== data.repeatPassword) {
            setErrorMessage("Passwords do not match");
            return;
        }
        const { repeatPassword, ...dataToSend } = data;        

        setData({
            name: "",
            surname: "",
            email: "",
            password: "",
            repeatPassword: "",
            status: 0,
            fk_role: 4
        });
        setErrorMessage(null);
        const {error} = await CreateUser(dataToSend);
        if(error){
          setAlertConfig({
            open: true,
            message: "Failed to create user successfully, please try again later",
          });

          return;
        }
        setAlertConfig({
          open: true,
          message: "User saved successfully",
        });
    };
    const handleCloseAlert = () => {
        setAlertConfig({ ...alertConfig, open: false });
      };
      

    return (
        <div className="w-100 position-relative login">
            <AlertComponent {...alertConfig} handleClose={handleCloseAlert} />
            <div className="w-25 d-flex flex-column justify-content-center align-items-center position-absolute top-50 start-50 translate-middle border rounded-3 p-4 bg-light">
                <h1 className="mb-4 mt-4">Sign Up</h1>
                {errorMessage && <div className="text-danger mb-3">{errorMessage}</div>}
                <form>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input 
                            type="text" 
                            id="name"  
                            className="form-control"
                            value={data.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="surname" className="form-label">Last Name</label>
                        <input 
                            type="text" 
                            id="surname"  
                            className="form-control"
                            value={data.surname}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input 
                            type="email" 
                            id="email"  
                            className="form-control"
                            value={data.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            value={data.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="repeatPassword" className="form-label">Repeat Password</label>
                        <input
                            type="password"
                            id="repeatPassword"
                            className="form-control"
                            value={data.repeatPassword}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="d-flex justify-content-evenly mt-4">
                        <Link to="/login">
                            <button type="button" className="btn btn-secondary">Login</button>
                        </Link>
                        <button type="button" className="btn btn-success" onClick={handleSubmit}>
                            Sign Up
                        </button>
                    </div>
                </form>
                
            </div>
        </div>
    );
};

export default SignUp;