import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import UserFormComponent from "../../../components/forms/userForm";
import "../user.css";

const UserEdit = () => {
  const { id } = useParams(); 
  if (!id) {
    return null;
  }
  return (
    <div className="p-4 user-bg">
      <div className="p-4 mt-5 bg-light rounded-3">
        <h1>Edit user</h1>
        <Link to="/users">
          <button type="button" className="btn btn-secondary">
            Volver
          </button>
        </Link>
        {<UserFormComponent id={id}/>}
      </div>
    </div>
  )
}

export default UserEdit