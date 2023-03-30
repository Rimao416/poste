import React, { useState,useContext } from "react";
import reactDom from "react-dom";
import "./styles/app.css";
import {
  BrowserRouter as Router,
  HashRouter,
  Switch,
  Route,
  withRouter,
  Redirect,
} from "react-router-dom";
import authApi from "./services/authApi";
import Login from "./pages/Login/Login";
import UserAdmin from "./pages/Admin/User/UserAdmin";
import Conge from "./pages/Admin/Conge/Conge";
import CongeUser from "./pages/User/Conge/Conge";
import AuthContext from "./contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./pages/Profile/Profile";
import Projet from "./pages/Admin/Projet/Projet";
const userInfo = authApi.getUserInfo();
authApi.setup();
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    authApi.isAuthenticated
  );
  const PrivateRoute = ({ path, component, permission }) => {
    const { isAuthenticated } = useContext(AuthContext);
    const role = authApi.getUserInfo();
    // console.log(role);
    return isAuthenticated ? (
      //VER
      role.includes(permission) ? (
        <Route path={path} component={component} exact />
      ) : (
        <p></p>
      )
    ) : (
      <Redirect to="/login" />
    );
  };
  const contextValue = {
    isAuthenticated,
    setIsAuthenticated,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      <HashRouter>
        <Switch>
          <Route path="/login" exact component={Login} />
          <PrivateRoute path="/admin/user" component={UserAdmin}  permission="ROLE_ADMIN"/>
          <PrivateRoute path="/admin/conge" component={Conge} permission="ROLE_ADMIN"/>
          <PrivateRoute path="/profile/:id" component={Profile} permission="ROLE_ADMIN"/>
          <PrivateRoute path="/profile" component={Profile} permission="ROLE_USER"/>
          <PrivateRoute path="/conge/list" component={Conge} permission="ROLE_USER"/>
          <PrivateRoute path="/conge" component={CongeUser} permission="ROLE_USER"/>
          <PrivateRoute path="/admin/projet" component={Projet} permission="ROLE_ADMIN"/>
        </Switch>
      </HashRouter>
      <ToastContainer position={toast.POSITION.TOP_RIGHT} />
    </AuthContext.Provider>
  );
};
const rootElement = document.querySelector("#root");
reactDom.render(<App />, rootElement);
