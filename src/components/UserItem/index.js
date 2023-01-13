import './index.css'
import {Link, withRouter} from 'react-router-dom'

const UserItem = (props) => {
    const {userData} = props
    const {id,profilepicture,name} = userData
    return(
        <Link to={`/user/${id}`} className="custom-link" style={{textDecoration: 'none'}}>
            <li className="user-list-item">
                <img src={profilepicture} alt="profile-img" className ="profile-picture"/>
                <p className="username">{name}</p>
            </li>
        </Link>
    )
}

export default withRouter(UserItem)