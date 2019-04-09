import React, { Component } from "react";
import Deck from "./deck-container";
import Navbar from "./navbar";

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Deck />
      </div>
    );
  }
}

export default App;
