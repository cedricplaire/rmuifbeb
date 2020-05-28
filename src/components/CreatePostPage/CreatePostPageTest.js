import React from "react";

import ReactDOM from "react-dom";

import { MemoryRouter } from "react-router-dom";

import CreatePostPage from "./CreatePostPage";

it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(
    <MemoryRouter>
      <CreatePostPage title="" />
    </MemoryRouter>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});