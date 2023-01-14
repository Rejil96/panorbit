import "./index.css";
import { Link, withRouter } from "react-router-dom";
import UserContext from "../../context/UserContext";

const UserItem = (props) => {
  return (
    <UserContext.Consumer>
      {(value) => {
        const { userData, allUser } = props;
        
        const { onUpdateCurrentUser, onUpdateRandomUser } = value;
        const { id, profilepicture, name } = userData;
        const onContextUpdate = () => {
          const currentUserData = allUser.filter(
            (eachData) => eachData.id === id
          );
          onUpdateCurrentUser(currentUserData[0]);
          let getFirstRandomIndex = null;
          do {
            getFirstRandomIndex = Math.floor(Math.random() * 10);
          } while (getFirstRandomIndex === (currentUserData[0].id - 1));

          let getSecondRandomIndex = null; 
          do {
            getSecondRandomIndex = Math.floor(Math.random() * 10);
          } while (
            getSecondRandomIndex === (currentUserData[0].id - 1)||
            getFirstRandomIndex === getSecondRandomIndex 
          );
            

          const randomUsersList = [
            allUser[getFirstRandomIndex],
            allUser[getSecondRandomIndex],
          ];
          onUpdateRandomUser(randomUsersList);
        };

        return (
          <Link
            to={`/user/${id}`}
            className="custom-link"
            style={{ textDecoration: "none" }}
            onClick={onContextUpdate}
          >
            <li className="user-list-item">
              <img
                src={profilepicture}
                alt="profile-img"
                className="profile-picture"
              />
              <p className="username">{name}</p>
            </li>
          </Link>
        );
      }}
    </UserContext.Consumer>
  );
};

export default withRouter(UserItem);
