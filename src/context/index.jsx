import { createContext, useEffect, useState } from "react";
import { ReadUserId, UpdateUserId } from "../services/user.routes";

export const LaravelContext = createContext();


// eslint-disable-next-line react/prop-types
export const LaravelProvider = ({children}) => {

    const [modal, setModal] = useState(false);
    const [deleteItem, setDeleteItem] = useState(0);
    const [login, setLogin] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);

    /* account */
    const [account, setAccount] = useState({});


    const handleOpenModal = (id) => {
        setModal(true);
        setDeleteItem(id);
    };

    const handleCloseModal = () => {
        setModal(false);
        setDeleteItem([]);
    };

    const handleDeleteUser = async (userId) => {
        try {
            const { data, error } = await ReadUserId(userId);
            if (error) {
                console.log(error);
                return;
            }

            const newData = {
                name: data.name,
                surname: data.surname,
                email: data.email,
                password: data.password,
                status: 1,
                fk_role: data.fk_role
            };

            await UpdateUserId(userId, newData);
            handleCloseModal();
            /* setTimeout(() => {
                window.location.reload();
            }, 1000); */
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (loggedIn) {
            const timeout = setTimeout(() => {
                window.location.reload();
            }, 200);

            return () => clearTimeout(timeout);
        }
    }, [loggedIn]);

    return(
        <>
            <LaravelContext.Provider value={{
                modal,
                setModal,
                deleteItem,
                setDeleteItem,
                handleOpenModal,
                handleCloseModal,
                handleDeleteUser,
                login,
                setLogin,
                account,
                setAccount,
                setLoggedIn
            }}>
                {children}
            </LaravelContext.Provider>
        </>
    )
}