import React from "react";
import PropTypes from "prop-types";
import AppointmentForm from "./AppointmentForm";
import { AppointmentsList } from "./AppointmentsList";
import axios from "axios";
import update from "immutability-helper";
import moment from "moment";

import "../stylesheet/test.scss";

export default class Appointments extends React.Component {
  static propTypes = {
    appointments: PropTypes.array.isRequired
  };
  static defaultProps = {
    appointments: []
  };
  constructor(props, _railsContext) {
    super(props);
    this.state = {
      appointments: this.props.appointments
    };
  }

  componentDidMount() {
    axios({
      method: "get",
      url: `/appointments.json`
    })
      .then(response => {
        this.setState({ appointments: response.data });
      })
      .catch(error => {
        console.log("Error");
        console.log(error);
      });
  }

  addNewAppointment = appointment => {
    const appointments = update(this.state.appointments, {
      $push: [appointment]
    });
    this.setState({
      appointments: appointments.sort(function(a, b) {
        return new Date(a.appt_time) - new Date(b.appt_time);
      }),
      title: { value: "", valid: false }
    });
  };

  render() {
    return (
      <div className="appointments">
        <AppointmentForm handleNewAppointment={this.addNewAppointment} />
        <AppointmentsList
          appointments={this.state.appointments}
          props={this.props}
          appointmentOpened={this.appointmentOpened}
        />
      </div>
    );
  }
}
