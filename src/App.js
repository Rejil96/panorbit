import { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import UserDetails from "./components/UserDetails";
import UserContext from "./context/UserContext";

class App extends Component {
  state = { currentUser: {}, randomUser: [] };

  onUpdateCurrentUser = (userData) => {
    this.setState({ currentUser: userData });
  };

  onUpdateRandomUser = (randUserData) => {
    this.setState({ randomUser: randUserData });
  };

  render() {
    const { currentUser, randomUser } = this.state;
    return (
      <UserContext.Provider
        value={{
          currentUser,
          randomUser,
          onUpdateCurrentUser: this.onUpdateCurrentUser,
          onUpdateRandomUser: this.onUpdateRandomUser,
        }}
      >
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/user/:id" component={UserDetails} />
          </Switch>
        </div>
      </UserContext.Provider>
    );
  }
}

export default App;
