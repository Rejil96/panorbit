import { Component } from "react";
import UserItem from "../UserItem";
import "./index.css";

class Home extends Component {
  state = { usersList: [], isLoading: "initial" };

  componentDidMount() {
    this.getUsers();
  }

  getUsers = async () => {
    const getUsersApi = await fetch("https://panorbit.in/api/users.json");
    const getUsersApiResponse = await getUsersApi.json();
    if (getUsersApi.ok) {
      this.setState({
        usersList: getUsersApiResponse.users,
        isLoading: "success",
      });
      console.log(getUsersApiResponse);
    } else {
      this.setState({ isLoading: "failed" });
    }
  };

  render() {
    const { usersList } = this.state;

    return (
      <div className="home-container">
        <div className="user-list-card">
            <div className="card-header">
                <h1 className="users-card-list-heading">Select an account</h1>
            </div>
            <ul className="user-list-wrapper">
                {usersList.map(eachData => <UserItem key={eachData.id} userData ={eachData}/>)}
            </ul>
        </div>
      </div>
    );
  }
}

export default Home;
