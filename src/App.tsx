import React from "react";
import Header from "./pages/Header";
import { BrowserRouter as Router } from "react-router-dom";
import Homepage from "./pages/Homepage";

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Homepage />
      </Router>
    </div>
  );
}

export default App;
