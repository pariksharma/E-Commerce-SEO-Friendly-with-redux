import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import RoutePage from "./Route";
import AppFooter from "./Component/Footer/Footer";
import AppNavbar from "./Component/Header/Navbar";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import "react-loading-skeleton/dist/skeleton.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <header>
        <AppNavbar />
      </header>
      <RoutePage />
      <footer>
        <AppFooter />
      </footer>
    </BrowserRouter>
  );
}

export default App;
