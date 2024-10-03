import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import App from "./App";
import store from "../src/redux/store";
import "font-awesome/css/font-awesome.min.css";
import "./App.css";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
