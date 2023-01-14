import React from "react";
import { Component } from "react";
import UserContext from "../../context/UserContext";
import Popup from "reactjs-popup";
import { withRouter, Link } from "react-router-dom";
import "./index.css";

class Header extends Component {
  state = { allUsersList: [], onLoadCurrentUser: {}, onLoadRandomUsers: [] };

  componentDidMount() {
    this.getAllUsersList();
  }

  getAllUsersList = async () => {
    const getAllUsersApi = await fetch("https://panorbit.in/api/users.json");
    const getAllUsersApiResponse = await getAllUsersApi.json();

    if (getAllUsersApi.ok) {
      const { match } = this.props;
      const { params } = match;

      const currentUserData = getAllUsersApiResponse.users.filter(
        (eachData) => eachData.id === parseInt(params.id)
      );

      let getFirstRandomIndex = null;
      do {
        getFirstRandomIndex = Math.floor(Math.random() * 10);
      } while (getFirstRandomIndex === parseInt(params.id) - 1);

      let getSecondRandomIndex = null;
      do {
        getSecondRandomIndex = Math.floor(Math.random() * 10);
      } while (
        getSecondRandomIndex === parseInt(params.id) - 1 ||
        getFirstRandomIndex === getSecondRandomIndex
      );
      const randomUsersList = [
        getAllUsersApiResponse.users[getFirstRandomIndex],
        getAllUsersApiResponse.users[getSecondRandomIndex],
      ];

      this.setState({
        allUsersList: getAllUsersApiResponse.users,
        onLoadCurrentUser: currentUserData[0],
        onLoadRandomUsers: randomUsersList,
      });
    }
  };

  render() {
    return (
      <UserContext.Consumer>
        {(value) => {
          const { history, match } = this.props;
          const { allUsersList, onLoadCurrentUser, onLoadRandomUsers } =
            this.state;

          const {
            currentUser,
            randomUser,
            onUpdateCurrentUser,
            onUpdateRandomUser,
          } = value;

          //random users list consist 2 users always
          const firstRandomUser = randomUser[0];
          const secondRandomUser = randomUser[1];
          const userBasedonLoad =
            currentUser === undefined ? onLoadCurrentUser : currentUser;
          const { id, profilepicture, name, email } = userBasedonLoad;

          const { location } = history;
          const { params } = match;
          const currentPage = location.pathname;
          let getHeadingText = null;

          switch (currentPage) {
            case `/user/${params.id}`:
              getHeadingText = <p className="page-heading">Profile</p>;
              break;
            case `/user/${id}/posts`:
              getHeadingText = <p className="page-heading">Posts</p>;
              break;
            case `/user/${id}/gallery`:
              getHeadingText = <p className="page-heading">Gallery</p>;
              break;
            case `/user/${id}/todo`:
              getHeadingText = <p className="page-heading">ToDo</p>;
              break;
            default:
              getHeadingText = null;
          }

          const onSignout = () => {
            history.push("/");
          };

          const onFirstRandClick = () => {
            const firstUserBasedonLoad =
              firstRandomUser === undefined
                ? onLoadRandomUsers[0]
                : firstRandomUser;
            onUpdateCurrentUser(firstUserBasedonLoad);
            let getFirstRandomIndex = null;
            do {
              getFirstRandomIndex = Math.floor(Math.random() * 10);
            } while (getFirstRandomIndex === firstUserBasedonLoad.id - 1);

            let getSecondRandomIndex = null;
            do {
              getSecondRandomIndex = Math.floor(Math.random() * 10);
            } while (
              getSecondRandomIndex === getFirstRandomIndex ||
              getSecondRandomIndex === firstUserBasedonLoad.id - 1
            );

            const randomUsersList = [
              allUsersList[getFirstRandomIndex],
              allUsersList[getSecondRandomIndex],
            ];
            onUpdateRandomUser(randomUsersList);
          };

          const onSecondRandClick = () => {
            const secondUserBasedonLoad =
              secondRandomUser === undefined
                ? onLoadRandomUsers[1]
                : secondRandomUser;

            onUpdateCurrentUser(secondUserBasedonLoad);

            let getFirstRandomIndex = null;
            do {
              getFirstRandomIndex = Math.floor(Math.random() * 10);
            } while (getFirstRandomIndex === secondUserBasedonLoad.id - 1);

            let getSecondRandomIndex = null;

            do {
              getSecondRandomIndex = Math.floor(Math.random() * 10);
            } while (
              getSecondRandomIndex === secondUserBasedonLoad.id - 1 ||
              getFirstRandomIndex === getSecondRandomIndex
            );
            const randomUsersList = [
              allUsersList[getFirstRandomIndex],
              allUsersList[getSecondRandomIndex],
            ];
            onUpdateRandomUser(randomUsersList);
          };

          const profileSettings = () => {
            const onLoadFirstUserId =
              onLoadRandomUsers[0] !== undefined
                ? onLoadRandomUsers[0].id
                : null;
            const onLoadFirstUserProfilePic =
              onLoadRandomUsers[0] !== undefined
                ? onLoadRandomUsers[0].profilepicture
                : null;
            const onLoadFirstUserName =
              onLoadRandomUsers[0] !== undefined
                ? onLoadRandomUsers[0].name
                : null;
            const onLoadSecondUserId =
              onLoadRandomUsers[1] !== undefined
                ? onLoadRandomUsers[1].id
                : null;
            const onLoadSecondUserProfilePic =
              onLoadRandomUsers[1] !== undefined
                ? onLoadRandomUsers[1].profilepicture
                : null;
            const onLoadSecondUserName =
              onLoadRandomUsers[1] !== undefined
                ? onLoadRandomUsers[1].name
                : null;

            return (
              <Popup
                trigger={
                  <button type="button" className="profile-settings-button">
                    <img
                      src={
                        profilepicture === undefined
                          ? onLoadCurrentUser.profilepicture
                          : profilepicture
                      }
                      alt="profile pic"
                      className="header-profile-pic"
                    />
                    <p className="header-profile-name">
                      {name === undefined ? onLoadCurrentUser.name : name}
                    </p>
                  </button>
                }
                closeOnDocumentClick
              >
                <div className="profile-setting-popup">
                  <img
                    src={
                      profilepicture === undefined
                        ? onLoadCurrentUser.profilepicture
                        : profilepicture
                    }
                    alt="profile pic"
                    className="popup-profile-pic"
                  />
                  <p className="popup-profile-name">
                    {name === undefined ? onLoadCurrentUser.name : name}
                  </p>
                  <p className="popup-profile-email">
                    {email === undefined ? onLoadCurrentUser.email : email}
                  </p>

                  <Link
                    to={`/user/${
                      firstRandomUser !== undefined
                        ? firstRandomUser.id
                        : onLoadFirstUserId
                    }`}
                    className="custom-link"
                    style={{ textDecoration: "none" }}
                    onClick={onFirstRandClick}
                  >
                    <div className="popup-random-user-container">
                      <img
                        src={
                          firstRandomUser !== undefined
                            ? firstRandomUser.profilepicture
                            : onLoadFirstUserProfilePic
                        }
                        alt="profile pic"
                        className="rand-profile-pic"
                      />
                      <p className="rand-profile-name">
                        {firstRandomUser !== undefined
                          ? firstRandomUser.name
                          : onLoadFirstUserName}
                      </p>
                    </div>
                  </Link>
                  <Link
                    to={`/user/${
                      secondRandomUser !== undefined
                        ? secondRandomUser.id
                        : onLoadSecondUserId
                    }`}
                    className="custom-link"
                    style={{ textDecoration: "none" }}
                    onClick={onSecondRandClick}
                  >
                    <div className="popup-random-user-container">
                      <img
                        src={
                          secondRandomUser !== undefined
                            ? secondRandomUser.profilepicture
                            : onLoadSecondUserProfilePic
                        }
                        alt="profile pic"
                        className="rand-profile-pic"
                      />
                      <p className="rand-profile-name">
                        {secondRandomUser !== undefined
                          ? secondRandomUser.name
                          : onLoadSecondUserName}
                      </p>
                    </div>
                  </Link>
                  <button
                    type="button"
                    onClick={onSignout}
                    className="signout-button"
                  >
                    Sign out
                  </button>
                </div>
              </Popup>
            );
          };
          return (
            <div className="header-container">
              {getHeadingText} {profileSettings()}
            </div>
          );
        }}
      </UserContext.Consumer>
    );
  }
}

export default withRouter(Header);
