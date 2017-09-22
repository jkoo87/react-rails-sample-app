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
  constructor(props, _railsContext) {
    super(props);
    this.state = {
      appointments: this.props.appointments,
      title: { value: "", valid: false },
      appt_time: { value: new Date(), valid: false },
      formErrors: {},
      formValid: false
    };
  }

  handleUserInput = (fieldName, fieldValue, validations) => {
    const newFieldState = update(this.state[fieldName], {
      value: { $set: fieldValue }
    });
    this.setState({ [fieldName]: newFieldState }, () =>
      this.validateField(fieldName, fieldValue, validations)
    );
  };

  validateField(fieldName, fieldValue, validations) {
    let fieldValid;
    let fieldErrors = validations.reduce((errors, v) => {
      let e = v(fieldValue);
      if (e !== "") {
        errors.push(e);
      }
      return errors;
    }, []);

    fieldValid = fieldErrors.length === 0;

    const newFieldState = update(this.state[fieldName], {
      valid: { $set: fieldValid }
    });
    const newFormErrors = update(this.state.formErrors, {
      $merge: { [fieldName]: fieldErrors }
    });

    this.setState(
      {
        [fieldName]: newFieldState,
        formErrors: newFormErrors
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({
      formValid: this.state.title.valid && this.state.appt_time.valid
    });
  }

  handleFormSubmit = () => {
    const time_avail = this.state.appt_time ? this.state.appt_time : new Date();
    const appointment = {
      title: this.state.title.value,
      appt_time: time_avail.value
    };
    axios
      .post("/appointments", {
        authenticity_token: ReactOnRails.authenticityToken(),
        appointment: appointment
      })
      .then(response => {
        this.addNewAppointment(response.data);
        this.resetFormErrors();
      })
      .catch(error => {
        this.setState({ formErrors: error.response.data });
      });
  };

  resetFormErrors() {
    this.setState({ formErrors: {} });
  }

  addNewAppointment(appointment) {
    const appointments = update(this.state.appointments, {
      $push: [appointment]
    });
    this.setState({
      appointments: appointments.sort(function(a, b) {
        return new Date(a.appt_time) - new Date(b.appt_time);
      }),
      title: { value: "", valid: false },
      appt_time: { value: "", valid: false }
    });
  }

  render() {
    return (
      <div className="appointments">
        <AppointmentForm
          title={this.state.title}
          appt_time={this.state.appt_time}
          formValid={this.state.formValid}
          formErrors={this.state.formErrors}
          onUserInput={this.handleUserInput}
          onFormSubmit={this.handleFormSubmit}
        />
        <AppointmentsList appointments={this.state.appointments} />
      </div>
    );
  }
}
