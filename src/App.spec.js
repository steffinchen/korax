import React from "react";
import { shallow } from "enzyme";
import App from "./App";
import Deck from "./components/deck-container";

it("renders without crashing", () => {
  const app = shallow(<App />);
  expect(app.find(Deck)).toBeTruthy();
});
