import { Component } from "react";
import Sidebar from "../Sidebar";
import './index.css'

class UserDetails extends Component {
  state = { userDetailsObject: {} };

  componentDidMount() {
    this.getAllUsers();
  }

  getAllUsers = async () => {
    const { match } = this.props;
    const { params } = match;

    const getUsersApi = await fetch("https://panorbit.in/api/users.json");
    const getUsersApiResponse = await getUsersApi.json();

    if (getUsersApi.ok) {
      const userDatas = getUsersApiResponse.users.filter(eachData => eachData.id === parseInt(params.id));
      this.setState({ userDetailsObject: userDatas[0]});
    }
  };

  render() {
    const { userDetailsObject } = this.state;
    const { match } = this.props;
    const { params } = match;

    console.log(userDetailsObject)

    return (
      <div className="user-container">
        <Sidebar userId={params.id}/>
      </div>
    );
  }
}

export default UserDetails;