import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Calling from "./components/Calling/Calling";
import Err from "./components/Err/Err";
import Whiteboard from "./whiteBoard/Board";
import Calendar from "./components/Calendar/Calendar";
import MindMap from "./components/Mind-map/MindMap";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/whiteboard" component={Whiteboard} />
        <Route exact path="/mindmap" component={MindMap} />
        <Route exact path="/calendar" component={Calendar} />
        <Route exact path="/:id" component={Calling} />
        <Route exact path="/" component={Home} />

        <Route path="*" component={Err} />
      </Switch>
    </Router>
  );
}

export default App;
