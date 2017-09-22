import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { formatDate } from "../utils/format.js";

export default class Appointment extends React.Component {
  constructor(props) {
    super(props);
  }
  static propTypes = {
    appointment: PropTypes.object.isRequired
  };

  static defaultProps = {
    appointment: {}
  };

  render() {
    return (
      <div className="appointment">
        <Link to={`/appointments/${this.props.appointment.id}`}>
          <h3>{this.props.appointment.title}</h3>
        </Link>
        <p>{formatDate(this.props.appointment.appt_time)}</p>
      </div>
    );
  }
}
