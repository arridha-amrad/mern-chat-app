import { Route } from "react-router-dom";
import { ChatPage, HomePage } from "./pages";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Route path="/" component={HomePage} exact />
      <Route path="/chat" exact component={ChatPage} />
    </div>
  );
}

export default App;
