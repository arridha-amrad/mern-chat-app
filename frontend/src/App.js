import { Route } from "react-router-dom";
import { ChatPage, HomePage } from "./pages";
import "./App.css";
import { Switch } from "react-router-dom";

function App() {
   return (
      <div className="app">
         <Switch>
            <Route path="/" component={HomePage} exact />
            <Route path="/chats" exact component={ChatPage} />
         </Switch>
      </div>
   );
}

export default App;
