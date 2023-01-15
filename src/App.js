import { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Gallery from "./components/Gallery";
import Home from "./components/Home";
import Posts from "./components/Posts";
import ToDo from "./components/ToDo";
import Profile from "./components/Profile";
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
            <Route exact path="/user/:id" component={Profile} />
            <Route exact path="/user/:id/posts" component={Posts} />
            <Route exact path="/user/:id/gallery" component={Gallery} />
            <Route exact path="/user/:id/todo" component={ToDo} />
          </Switch>
        </div>
      </UserContext.Provider>
    );
  }
}

export default App;
