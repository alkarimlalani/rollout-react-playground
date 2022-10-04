import React from "react";
import { render } from "react-dom";
import './styles.css';
import { App } from "./components/app";

render(<App />, document.getElementsByTagName("app-root")[0]);
