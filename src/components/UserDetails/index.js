import UserContext from "../../context/UserContext";
import {withRouter} from 'react-router-dom'
import Header from "../Header";
import Sidebar from "../Sidebar";
import './index.css'

const UserDetails = props => (
      <UserContext.Consumer>
        {value => {
       
          return(
            <div className="user-container">
              <Sidebar/>
              <div className="content-wrapper">
                <Header/>
                <p>Hai</p>
              </div>
            </div>
          )
        }}
      </UserContext.Consumer>
    );
 

export default withRouter(UserDetails);