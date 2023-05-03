import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";

import App from "./components/App";
import store from "./app/store";

import ToggleColorMode from "./utils/ToggleColorMode";
// https://redux-toolkit.js.org/tutorials/quick-start#what-youve-learned
/* The dispatch function is used with the context API OR state management library such as Redux
to update the state or data of an application. It is used to trigger an action that will update
the store, which will then trigger a re-render of the component tree with the updated data.
The dispatch function takes an action object as an argument, which describes the change to be
made to the state. */
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ToggleColorMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ToggleColorMode>
  </Provider>
);
