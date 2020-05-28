import React from "react";

import ReactDOM from "react-dom";

import { MemoryRouter } from "react-router-dom";

import ReadPostPage from "./ReadPostPage";

it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(
    <MemoryRouter>
      <ReadPostPage title="" />
    </MemoryRouter>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});