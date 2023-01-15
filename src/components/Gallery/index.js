import { Component } from "react";
import { IoIosClose } from "react-icons/io";
import React from "react";
import Popup from "reactjs-popup";
import { MdChatBubbleOutline } from "react-icons/md";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { GoPrimitiveDot } from "react-icons/go";
import UserContext from "../../context/UserContext";
import Header from "../Header";
import Sidebar from "../Sidebar";

class Gallery extends Component {
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
          const { randomUser } = value;
          const { chatBox, allUsersLabel } = this.state;

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
                <div className="coming-soon-container">
                  <h1 className="coming-soon-heading">Coming Soon</h1>
                </div>
                {renderChatBox()}
              </div>
            </div>
          );
        }}
      </UserContext.Consumer>
    );
  }
}

export default Gallery;
