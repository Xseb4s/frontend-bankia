import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CreateCreditRequest } from "../../../services/request.routes"
import AlertComponent from "../../../components/alerts";

const RequestCreate = () => {
    const [data, setData] = useState({
        amount: "",
        dues: "",
        description: "",
        typeid:"",
        status:0,
        client_id: ""
    });
    const [alertConfig, setAlertConfig] = useState({
        open: false,
        message: "",
        type: "success",
    });
    const [errorMessage, setErrorMessage] = useState(""); 

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('account'));
        if (user) {
            setData(prevData => ({
                ...prevData,
                client_id: user.Id_user
            }));
        }
    }, []);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [id]: value
        }));
    };

    const handleSubmit = async () => {
        setErrorMessage(null);
        const { error } = await CreateCreditRequest(data);
        if (error) {
            setAlertConfig({
                open: true,
                message: "Failed to create credit request successfully, please try again later",
                type: "error"
            });
        } else {
            setAlertConfig({
                open: true,
                message: "Request submitted successfully",
                type: "success"
            });
            setData({
                ...data,
                amount: "",
                dues: "",
                description: "",
                typeid: ""
            });
        }
    };

    const handleCloseAlert = () => {
        setAlertConfig({ ...alertConfig, open: false });
    };

    return (
        <div className="w-100 position-relative login">
            <AlertComponent {...alertConfig} handleClose={handleCloseAlert} />
            <div className="w-25 d-flex flex-column justify-content-center align-items-center position-absolute top-50 start-50 translate-middle border rounded-3 p-4 bg-light">
                <h1 className="mb-4 mt-4">Create Credit Request</h1>
                {errorMessage && <div className="text-danger mb-3">{errorMessage}</div>}
                <form className="w-100">
                    <div className="mb-3">
                        <label htmlFor="amount" className="form-label">Amount $</label>
                        <input 
                            type="number" 
                            id="amount"  
                            className="form-control"
                            value={data.amount}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="dues" className="form-label">Dues</label>
                        <select 
                            id="dues" 
                            className="form-select"
                            onChange={handleChange}
                        >
                            <option value="">Select Dues</option>
                            <option value="6">6 months</option>
                            <option value="12">12 months</option>
                            <option value="24">24 months</option>
                            <option value="36">36 months</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea 
                            id="description"
                            placeholder="Talk to us about your request"
                            className="form-control"
                            value={data.description}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="typeid" className="form-label">Type of Credit</label>
                        <select 
                            id="typeid" 
                            className="form-select"
                            onChange={handleChange}
                        >
                            <option value="">Select Type of Credit</option>
                            <option value="1">Free Investment 2.5%</option>
                            <option value="2">Housing 1.3%</option>
                        </select>
                    </div>
                    <div className="d-flex justify-content-evenly mt-4 pt-4">
                        <Link to="/credit_requests">
                            <button type="button" className="btn btn-secondary">Back</button>
                        </Link>
                        <button type="button" className="btn btn-success" onClick={handleSubmit}>
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RequestCreate;