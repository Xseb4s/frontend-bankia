import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import RequestFormComponent from "../../../components/forms/requestForm";
import "../request.css";
import { ArrowBack } from "@mui/icons-material";

const RequestEdit = () => {
  const { id } = useParams(); 
  if (!id) {
    return null;
  }
  return (
    <div className="p-4 w-100 request-img">
      <div className="p-4 mt-5 bg-light rounded-3">
        <h1>Edit request</h1>
        <Link to="/credit_requests">
          <button type="button" className="btn btn-secondary">
            <ArrowBack/>
            Volver
          </button>
        </Link>
        {<RequestFormComponent id={id}/>}
      </div>
    </div>
  )
}

export default RequestEdit