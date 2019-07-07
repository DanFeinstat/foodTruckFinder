import React from "react";
import Main from "./pages/Main";
import AuthPage from "./pages/AuthPage";
import TruckDashboard from "./pages/TruckDashboard";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AppContextProvider } from "./components/store/store";

const App = () => (
  <Router>
    <div>
      <AppContextProvider>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/signup" component={AuthPage} />
          <Route exact path="/truckDashboard" component={TruckDashboard} />
          {/* <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signup-user" component={UserSignUP} />
        <Route exact path="/signup-truck" component={TruckSignUP} />
        <Route exact path="/dashboard/owner" component={OwnerPage} />
        <Route exact path="/login" component={Login} />
        <Route component={Error} /> */}
        </Switch>
      </AppContextProvider>
    </div>
  </Router>
);

export default App;
