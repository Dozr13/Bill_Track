import React from "react";
import { Switch, Route, HashRouter } from "react-router-dom";

import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import Home from "./Components/Home/Home";
import EditUser from "./Components/Auth/EditUser";

export default (
  <Switch>
    <Route exact path='/' component={Login} />
    <Route path='/register' component={Register} />

    <Route path='/home' component={Home} />
    <Route path='/editUser' component={EditUser} />
  </Switch>
);
