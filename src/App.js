import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";

import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx";

import Dashboard from "./components/Dashboard";
import Catalog from "./components/Catalog";
import Details from "./components/Details";

function App(props) {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Sidebar />
        <main className="content">
          <Switch>
            <Route component={Dashboard} path="/test_app/" exact />
            <Route component={Catalog} path="/test_app/catalog" exact />
            <Route component={Details} path="/test_app/catalog/item-:slug" />
          </Switch>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
