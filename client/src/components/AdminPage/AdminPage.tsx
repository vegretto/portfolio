import styles from "../AdminPage/admin-page.module.css";
import {Link, Outlet} from "react-router-dom";
import React, {Suspense, useContext} from "react";
import {AuthContext, SetCurrentUser, SetModal} from "../../App";
import Loader from "../Loader/Loader";
const LoginPage = React.lazy(() => import('../../components/LoginPage/LoginPage'));


const AdminPage = ({setCurrentUser, setModal}: {setCurrentUser: SetCurrentUser, setModal:SetModal}) => {
    const currentUser = useContext(AuthContext)

    return (
        <div className={styles.container}>
            <div className={styles.adminHeader}>
                <h1 className={styles.title}>Админ-панель</h1>
                <div><Link to={`/`}>Вернуться на сайт</Link></div>
            </div>
            {currentUser.isAuthorized ?
                <Outlet /> :
                <Suspense fallback={<Loader/>}>
                    <LoginPage setCurrentUser={setCurrentUser} setModal={setModal}/>
                </Suspense>}
        </div>
    )
}

export default AdminPage