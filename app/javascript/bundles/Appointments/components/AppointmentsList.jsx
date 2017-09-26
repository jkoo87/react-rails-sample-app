import React from "react";
import PropTypes from "prop-types";

import Appointment from "./Appointment";

export const AppointmentsList = ({ appointments }) => (
  <div className="appointments__list">
    <h2>Appointments</h2>
    <div className="appointments__list__detail">
      {appointments.map(appointment => {
        return <Appointment appointment={appointment} key={appointment.id} />;
      })}
    </div>
  </div>
);

AppointmentsList.propTypes = {
  appointments: PropTypes.array.isRequired
};

AppointmentsList.defaultProps = {
  appointments: []
};
