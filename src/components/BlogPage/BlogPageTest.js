import React from "react";

import ReactDOM from "react-dom";

import { MemoryRouter } from "react-router-dom";

import BlogPagePage from "./BlogPagePage";

it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(
    <MemoryRouter>
      <BlogPagePage title="" />
    </MemoryRouter>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});