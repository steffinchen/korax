import React, { Component } from "react";
import Deck from "./components/deck-container";
import Navbar from "./components/navbar";

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
