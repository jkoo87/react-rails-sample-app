import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Appointments from "./Appointments";
import Appointment from "./Appointment";
import { AppHeader } from "./AppHeader";
import AppointmentForm from "./AppointmentForm";

export default props => {
  return (
    <Router>
      <div>
        <Route path="/" component={AppHeader} />
        <Route exact path="/" component={Appointments} />
        <Route exact path="/appointments/:id" component={Appointment} />
        <Route
          exact
          path="/appointments/:id/edit"
          component={AppointmentForm}
        />
      </div>
    </Router>
  );
};
