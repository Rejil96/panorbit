import "./index.css";
import { withRouter } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";

const Sidebar = (props) => {
    const {history, userId} = props
    const {location} = history
    
  return (
    <div className="sidebar-container">
      <ul className="nav-bar-wrapper">
        <li className="nav-item">
          <span className={`nav-text ${location.pathname === `/user/${userId}` ? 'active-text' : ''}`}>Profile</span>
          <div className={`arrow-icon-container ${location.pathname === `/user/${userId}` ? 'active-tab' : ''}`}>
            {<MdKeyboardArrowRight />}
          </div>
        </li>
        <li className="nav-item">
          <span className={`nav-text ${location.pathname === `/user/${userId}/posts` ? 'active-text' : ''}`}>Posts</span>
          <div className={`arrow-icon-container ${location.pathname === `/user/${userId}/posts` ? 'active-tab' : ''}`}>{<MdKeyboardArrowRight />}</div>
        </li>
        <li className="nav-item">
          <span className={`nav-text ${location.pathname === `/user/${userId}/gallery` ? 'active-text' : ''}`}>Gallery</span>
          <div className={`arrow-icon-container ${location.pathname === `/user/${userId}/gallery` ? 'active-tab' : ''}`}>{<MdKeyboardArrowRight />}</div>
        </li>
        <li className="nav-item">
          <span className={`nav-text last-nav-item ${location.pathname === `/user/${userId}/todo` ? 'active-text' : ''}`}>ToDo</span>
          <div className={`arrow-icon-container ${location.pathname === `/user/${userId}/todo` ? 'active-tab' : ''}`}>{<MdKeyboardArrowRight />}</div>
        </li>
      </ul>
    </div>
  );
};

export default withRouter(Sidebar);
