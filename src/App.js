import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import UserDetails from "./components/UserDetails";

const App = () => (
  <div className="container">
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/user/:id" component={UserDetails} />
    </Switch>
  </div>
);

export default App;
