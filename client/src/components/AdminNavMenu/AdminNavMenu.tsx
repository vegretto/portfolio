import {Link} from "react-router-dom";

const AdminNavMenu = () => {
    return (
        <ul>
            <li>
                <Link to={`/admin/edit-works`}>Редактировать работы</Link>
            </li>
            <li>
                <Link to={`/admin/edit-experience`}>Редактировать опыт</Link>
            </li>
            <li>
                <Link to={`/admin/add-user`}>Добавить пользователя</Link>
            </li>
        </ul>
    )
}

export default AdminNavMenu