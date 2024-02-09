import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import CreditFormComponent from "../../../components/forms/creditForm";
import "../credit.css";

const CreditEdit = () => {
  const { id } = useParams(); 
  if (!id) {
    return null;
  }
  return (
    <div className="p-4 w-100 credit-bg">
      <div className="p-4 mt-5 bg-light rounded-3 w-75">
        <h1>Edit credit</h1>
        <Link to="/credits">
          <button type="button" className="btn btn-secondary">
            Volver
          </button>
        </Link>
        {<CreditFormComponent id={id}/>}
      </div>
    </div>
  )
}

export default CreditEdit