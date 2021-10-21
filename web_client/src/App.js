import React from "react";
import Authentification from "./Views/Authentification/Authentification.js"
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import { Switch, Route, Redirect } from "react-router-dom";
import NotificationContainer from "./Components/Toast/NotificationContainer";
import MainPage from "./Views/MainPage/MainPage";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import NotFound from "./Components/NotFound/NotFound";

export default function App() {
    return (
        <div>
            <Switch>
                <Route exact path="/login" render={(props) => <Authentification {...props} name={"Login"} card={<Login/>}/>}/>
                <Route exact path="/register" render={(props) => <Authentification {...props} name={"Register"} card={<Register/>}/>}/>
                <Route exact path="/client.apk" component={Apk}/>
                <Route exact path="/" render={() => <Redirect to={"/login"} />}/>
                <PrivateRoute exact path="/home" component={(props) => <MainPage {...props} />}/>
                <PrivateRoute exact path="/home/services" component={(props) => <MainPage {...props} />}/>
                <PrivateRoute exact path="/home/applets" component={(props) => <MainPage {...props} />}/>
                <PrivateRoute exact path="/home/wall" component={(props) => <MainPage {...props} />}/>
                <Route component={(props) => <NotFound {...props} />}/>
            </Switch>
            <NotificationContainer/>
        </div>
    );
}

function Apk() {
    const link = document.createElement('a');
    link.href = './apk/app-release-unsigned.apk';
    document.body.appendChild(link);
    link.click();
  document.body.removeChild(link);
  return <div />;
}
