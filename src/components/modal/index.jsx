import { useContext } from "react"
import { LaravelContext } from "../../context"
import WarningIcon from '@mui/icons-material/Warning';


const Modal = () => {
    const {modal, handleCloseModal, deleteItem, handleDeleteUser} = useContext(LaravelContext);

    const onDeleteClick = async () => {
        await handleDeleteUser(deleteItem);
    };

    const renderView = () => {
        if (modal) {
            return(
                <div style={{
                    zIndex:9,
                    backgroundColor:"rgba(128, 128, 128, 0.75)",
                    width:"100vw",
                    height:"100vh"
                }} className="position-absolute">
                    <div className="bg-light position-relative w-25 top-50 start-50 translate-middle p-4 rounded-3">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Are you sure to <span className="text-danger">DELETE</span>?</h4>
                                <button type="button" className="btn-close" onClick={()=>handleCloseModal()} aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                               <p className="m-5">You are about to <span className="text-danger fw-bold">delete</span> potentially 
                                <span className="fw-bold"> important content. </span>Do you want to <span className="text-danger fw-bold ">delete</span> it anyway?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-lg btn-secondary me-3" onClick={()=>handleCloseModal()}>Close</button>
                                <button type="button" className="btn btn-sm btn-danger" onClick={onDeleteClick}><WarningIcon/>Confirm</button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
    
  return (
    <>
    {renderView()}
    </>
  )
}

export default Modal