import styles from './header.module.css'
import HeaderNav from "../HeaderNav/HeaderNav";
import {Link} from "react-router-dom";
import useHttp from "../../hooks/useHttp.hook";
import {useContext} from "react";
import {AuthContext, SetCurrentUser} from "../../App";

const Header = ({setCurrentUser}: {setCurrentUser: SetCurrentUser}) => {
    const {request} = useHttp()
    const currentUser = useContext(AuthContext)

    const logoutClickHandler = async () => {
        const response = await request('/api/auth/logout', 'POST', {}, {'Content-Type': 'application/json'})
        localStorage.removeItem('token')
        setCurrentUser({...currentUser, isAuthorized: false})
    }


    return (
      <header className={styles.header}>
          <div className='container'>
              <div className={styles.inner}>
                  <Link to={`/`} className={styles.logo}>Портфолио</Link>
                  <HeaderNav />
                  {currentUser.isAuthorized &&
                  <div className={styles.controls}>
                      <Link to={`/admin`} className={styles.admin}>Войти в админ-панель</Link>
                      <div className={styles.logout} onClick={logoutClickHandler}>Выйти</div>
                  </div>}

              </div>
          </div>
      </header>
    );
}

export default Header;