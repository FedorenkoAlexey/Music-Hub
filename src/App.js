import React from "react";
import "./App.css";
import Routes from "./routes/Routes";

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Routes />
      </header>
    </div>
  );
};

export default App;
