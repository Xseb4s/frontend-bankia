import { useState } from "react";
import { Link } from "react-router-dom";
import { CreateUser } from "../../../services/user.routes"
import AlertComponent from "../../../components/alerts";

const user = JSON.parse(localStorage.getItem('account'));

let options = [
    { range: "Asesor", value: 3 },
    { range: "Cliente", value: 4 }
  ];
  
  user && user.fk_role === 1 ? (options.push({ range: "Gerente", value: 2 })) : (null)

const UserCreate = () => {
    const [data, setData] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        status: 0,
        fk_role: 0
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

        setErrorMessage(null);
        const {error} = await CreateUser(data);
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

        setData({
            name: "",
            surname: "",
            email: "",
            password: "",
            repeatPassword: "",
            status: 0,
            fk_role: ""
        });
    };
    const handleCloseAlert = () => {
        setAlertConfig({ ...alertConfig, open: false });
    };

  return (
    <div className="w-100 position-relative login">
            <AlertComponent {...alertConfig} handleClose={handleCloseAlert} />
            <div className="w-25 d-flex flex-column justify-content-center align-items-center position-absolute top-50 start-50 translate-middle border rounded-3 p-4 bg-light">
                <h1 className="mb-4 mt-4">Create User</h1>
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
                        <label htmlFor="fk_role" className="form-label">Role</label>
                        <select 
                            id="fk_role" 
                            className="form-select"
                            onChange={handleChange}
                        >
                            <option value="">Select Role</option>
                            {options.map((item, i) => (
                                <option key={i} value={item.value}>{item.range}</option>
                            ))}
                        
                        </select>
                    </div>

                    <div className="d-flex justify-content-evenly mt-4">
                        <Link to="/users">
                            <button type="button" className="btn btn-secondary">Back</button>
                        </Link>
                        <button type="button" className="btn btn-success" onClick={handleSubmit}>
                            Create
                        </button>
                    </div>
                </form>
                
            </div>
        </div>
  )
}

export default UserCreate