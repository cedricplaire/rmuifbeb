import React from "react";
import ReactDOM from "react-dom";

import { MemoryRouter } from "react-router-dom";

import TutorialsPage from "./TutorialsPage";

it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(
    <MemoryRouter>
      <TutorialsPage title="" />
    </MemoryRouter>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});