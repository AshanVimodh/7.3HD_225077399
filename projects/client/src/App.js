import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import UpdatePost from "./components/UpdatePost";
import React from "react";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Login />
          <Register />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/post/update/:id" exact component={UpdatePost} />
        <Route path="/dashboard">
          <Navbar />
          <Dashboard />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
