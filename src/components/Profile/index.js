import { Component } from "react";
import { IoIosClose } from "react-icons/io";
import React from "react";
import Popup from "reactjs-popup";
import { MdChatBubbleOutline } from "react-icons/md";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { GoPrimitiveDot } from "react-icons/go";
import UserContext from "../../context/UserContext";
import { withRouter } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";
import "./index.css";

class Profile extends Component {
  state = { currentLoadUser: {}, chatBox: false, allUsersLabel: [] };

  componentDidMount() {
    this.getAllUsers();
  }

  getAllUsers = async () => {
    const getAllUsersApi = await fetch("https://panorbit.in/api/users.json");
    const getAllUsersApiResponse = await getAllUsersApi.json();

    if (getAllUsersApi.ok) {
      const { match } = this.props;
      const { params } = match;

      const currentUserData = getAllUsersApiResponse.users.filter(
        (eachData) => eachData.id === parseInt(params.id)
      );

      this.setState({
        currentLoadUser: currentUserData[0],
        allUsersLabel: getAllUsersApiResponse.users,
      });
    }
  };

  onToggleChat = () => {
    this.setState((prevState) => ({ chatBox: !prevState.chatBox }));
  };

  render() {
    return (
      <UserContext.Consumer>
        {(value) => {
          const { currentUser, randomUser } = value;
          const { currentLoadUser, chatBox, allUsersLabel } = this.state;
          const usersBasedOnLoad =
            currentUser.id === undefined ? currentLoadUser : currentUser;
          console.log(allUsersLabel);
          const {
            profilepicture,
            name,
            username,
            email,
            phone,
            website,
            company,
            address,
          } = usersBasedOnLoad;

          const renderUserListChat = () => (
            <div className="chat-users-list-wrapper">
              {allUsersLabel.map((eachData, index) => (
                <Popup
                  key={eachData.id}
                  trigger={
                    <button type="button" className="user-chat-label">
                      <li className="user-list-item-chat">
                        <img
                          src={eachData.profilepicture}
                          alt="profile-img"
                          className="profile-picture"
                        />
                        <p className="username">{eachData.name}</p>
                      </li>
                      <div
                        className={`online ${
                          randomUser.id !== undefined
                            ? randomUser[index - 1].id === eachData.id
                              ? "display-utility"
                              : ""
                            : null
                        }
                        
                        `}
                      >
                        <GoPrimitiveDot />
                      </div>
                    </button>
                  }
                  position="left top"
                  closeOnDocumentClick
                >
                  <div className="user-chat-panel">
                    <div className="chat-header-label">
                      <li className="user-list-item-chat-header">
                        <img
                          src={eachData.profilepicture}
                          alt="profile-img"
                          className="profile-picture"
                        />
                        <p className="chat-username">{eachData.name}</p>
                      </li>
                      <button
                        type="button"
                        className="chat-controll-btn"
                        onClick={this.onToggleChat}
                      >
                        <IoIosArrowDown />
                        <IoIosClose />
                      </button>
                    </div>
                    <div className="chat-section">
                      <p className="chat">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Maecenas quis cursus velit.
                      </p>
                      <p className="chat custom-align-right">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Maecenas quis cursus velit.
                      </p>
                      <p className="chat">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Maecenas quis cursus velit.
                      </p>
                    </div>
                  </div>
                </Popup>
              ))}
            </div>
          );

          const renderChatBox = () => {
            return (
              <>
                <div className={`chat-box ${chatBox ? "display-utility" : ""}`}>
                  <div className="chat-box-name-container">
                    <MdChatBubbleOutline />
                    <span className="chat-text">Chats</span>
                  </div>
                  <button
                    type="button"
                    className="chat-controll-btn"
                    onClick={this.onToggleChat}
                  >
                    <IoIosArrowUp />
                  </button>
                </div>
                <div className={`chatList ${chatBox ? "" : "display-utility"}`}>
                  <div className="chat-header">
                    <div className="chat-box-name-container">
                      <MdChatBubbleOutline />{" "}
                      <span className="chat-text">Chats</span>
                    </div>
                    <button
                      type="button"
                      className="chat-controll-btn"
                      onClick={this.onToggleChat}
                    >
                      <IoIosArrowDown />
                    </button>
                  </div>
                  {renderUserListChat()}
                </div>
              </>
            );
          };

          return (
            <div className="user-container">
              <Sidebar />
              <div className="content-wrapper">
                <Header />

                <div className="user-details-container">
                  <div className="user-info-container">
                    <img
                      src={profilepicture !== undefined ? profilepicture : null}
                      alt="profile pic"
                      className="user-info-profile-img"
                    />
                    <p className="user-info-text-name">
                      {name !== undefined ? name : null}
                    </p>
                    <div className="user-personal-info-container">
                      <div className="user-info-labels-wrapper">
                        <p className="user-info-label">
                          Username &nbsp; &nbsp; &nbsp;:
                        </p>
                        <p className="user-info-label">
                          Email &nbsp; &nbsp; &nbsp;:
                        </p>
                        <p className="user-info-label">
                          Phone &nbsp; &nbsp; &nbsp;:
                        </p>
                        <p className="user-info-label">
                          Website &nbsp; &nbsp; &nbsp;:
                        </p>
                      </div>
                      <div className="user-info-text-wrapper">
                        <p className="user-info-text">
                          {username !== undefined ? username : null}
                        </p>
                        <p className="user-info-text">
                          {email !== undefined ? email : null}
                        </p>
                        <p className="user-info-text">
                          {phone !== undefined ? phone : null}
                        </p>
                        <p className="user-info-text">
                          {website !== undefined ? website : null}
                        </p>
                      </div>
                    </div>
                    <hr className="horiz-line" />
                    <p className="user-info-text-company">Company</p>
                    <div className="user-personal-info-container">
                      <div className="user-info-labels-wrapper">
                        <p className="user-info-label">
                          Name &nbsp; &nbsp; &nbsp;:
                        </p>
                        <p className="user-info-label">
                          catchPhrase &nbsp; &nbsp; &nbsp;:
                        </p>
                        <p className="user-info-label">
                          bs &nbsp; &nbsp; &nbsp;:
                        </p>
                      </div>
                      <div className="user-info-text-wrapper">
                        <p className="user-info-text">
                          {company !== undefined ? company.name : null}
                        </p>
                        <p className="user-info-text">
                          {company !== undefined ? company.catchPhrase : null}
                        </p>
                        <p className="user-info-text">
                          {company !== undefined ? company.bs : null}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="user-info-address-container">
                    <p className="user-info-text-address">Address:</p>
                    <div className="user-personal-info-container">
                      <div className="user-info-labels-wrapper">
                        <p className="user-info-label">
                          Street &nbsp; &nbsp; &nbsp;:
                        </p>
                        <p className="user-info-label">
                          Suite &nbsp; &nbsp; &nbsp;:
                        </p>
                        <p className="user-info-label">
                          City &nbsp; &nbsp; &nbsp;:
                        </p>
                        <p className="user-info-label">
                          Zipcode &nbsp; &nbsp; &nbsp;:
                        </p>
                      </div>
                      <div className="user-info-text-wrapper">
                        <p className="user-info-text">
                          {address !== undefined ? address.street : null}
                        </p>
                        <p className="user-info-text">
                          {address !== undefined ? address.suite : null}
                        </p>
                        <p className="user-info-text">
                          {address !== undefined ? address.city : null}
                        </p>
                        <p className="user-info-text">
                          {address !== undefined ? address.zipcode : null}
                        </p>
                      </div>
                    </div>
                    <div className="map">
                      <iframe
                        title="map"
                        src="https://maps.google.com/maps?q=10.305385,77.923029&hl=es;z=14&amp;output=embed"
                        width="100%"
                        height="220"
                        frameBorder="0"
                        style={{ border: 0, borderRadius: "20px" }}
                        allowFullScreen
                      />
                      <div className="geo-info-container">
                        <p className="geo-text">
                          <span className="geo-label">Lat: </span>
                          {address !== undefined ? address.geo.lat : null}
                        </p>
                        <p className="geo-text">
                          <span className="geo-label">Long:</span>
                          {address !== undefined ? address.geo.lng : null}
                        </p>
                      </div>
                    </div>
                    {renderChatBox()}
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </UserContext.Consumer>
    );
  }
}

export default withRouter(Profile);
