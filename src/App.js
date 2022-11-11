import Login from "./screens/Login";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import MessageUpload from "./screens/MessageUpload";
import FileUpload from "./screens/FileUpload";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/messages">
          <MessageUpload />
        </Route>
        <Route exact path="/files">
          <FileUpload />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
