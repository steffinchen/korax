import React, { Component } from "react";
import { DragDropContextProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

import Deck from "./components/deck-container";
import Navbar from "./components/navbar";

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <DragDropContextProvider backend={HTML5Backend}>
          <Deck />
        </DragDropContextProvider>
      </div>
    );
  }
}

export default App;
