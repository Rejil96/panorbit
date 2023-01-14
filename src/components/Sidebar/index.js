import "./index.css";
import UserContext from "../../context/UserContext";
import { withRouter } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";

const Sidebar = (props) => (
  <UserContext.Consumer>
    {(value) => {
      const { history, match } = props;
      const { params } = match;
      const { location } = history;

      return (
        <div className="sidebar-container">
          <ul className="nav-bar-wrapper">
            <li className="nav-item">
              <span
                className={`nav-text ${
                  location.pathname === `/user/${params.id}` ? "active-text" : ""
                }`}
              >
                Profile
              </span>
              <div
                className={`arrow-icon-container ${
                  location.pathname === `/user/${params.id}` ? "active-tab" : ""
                }`}
              >
                {<MdKeyboardArrowRight />}
              </div>
            </li>
            <li className="nav-item">
              <span
                className={`nav-text ${
                  location.pathname === `/user/${params.id}/posts`
                    ? "active-text"
                    : ""
                }`}
              >
                Posts
              </span>
              <div
                className={`arrow-icon-container ${
                  location.pathname === `/user/${params.id}/posts`
                    ? "active-tab"
                    : ""
                }`}
              >
                {<MdKeyboardArrowRight />}
              </div>
            </li>
            <li className="nav-item">
              <span
                className={`nav-text ${
                  location.pathname === `/user/${params.id}/gallery`
                    ? "active-text"
                    : ""
                }`}
              >
                Gallery
              </span>
              <div
                className={`arrow-icon-container ${
                  location.pathname === `/user/${params.id}/gallery`
                    ? "active-tab"
                    : ""
                }`}
              >
                {<MdKeyboardArrowRight />}
              </div>
            </li>
            <li className="nav-item">
              <span
                className={`nav-text last-nav-item ${
                  location.pathname === `/user/${params.id}/todo`
                    ? "active-text"
                    : ""
                }`}
              >
                ToDo
              </span>
              <div
                className={`arrow-icon-container ${
                  location.pathname === `/user/${params.id}/todo`
                    ? "active-tab"
                    : ""
                }`}
              >
                {<MdKeyboardArrowRight />}
              </div>
            </li>
          </ul>
        </div>
      );
    }}
  </UserContext.Consumer>
);

export default withRouter(Sidebar);
