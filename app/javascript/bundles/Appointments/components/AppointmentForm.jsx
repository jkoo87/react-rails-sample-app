import React from "react";
import PropTypes from "prop-types";
import { FormErrors } from "./FormErrors";
import { formatDate } from "../utils/format";
import Datetime from "react-datetime";
import { validations } from "../utils/validations";
import "react-datetime/css/react-datetime.css";

export default class AppointmentForm extends React.Component {
  static propTypes = {
    title: PropTypes.shape({
      value: PropTypes.string.isRequired,
      valid: PropTypes.bool.isRequired
    }).isRequired,
    appt_time: PropTypes.shape({
      value: PropTypes.instanceOf(Date).isRequired,
      valid: PropTypes.bool.isRequired
    }),
    formValid: PropTypes.bool.isRequired,
    onUserInput: PropTypes.func.isRequired,
    onFormSubmit: PropTypes.func.isRequired
  };
  static formValidations = {
    title: [
      s => {
        return validations.checkMinLength(s, 3);
      }
    ],
    appt_time: [
      t => {
        return validations.timeShouldBeInTheFuture(t);
      }
    ]
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.onFormSubmit();
  };

  handleChange = e => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    this.props.onUserInput(
      fieldName,
      fieldValue,
      AppointmentForm.formValidations[fieldName]
    );
  };
  setAppTime = e => {
    const fieldName = "appt_time";
    const fieldValue = e.toDate();
    this.props.onUserInput(
      fieldName,
      fieldValue,
      AppointmentForm.formValidations[fieldName]
    );
  };
  render() {
    const inputProps = { name: "appt_time" };
    return (
      <div className="appointments__forms">
        <h2>Make a new Appointment</h2>
        <FormErrors formErrors={this.props.formErrors} />
        <form onSubmit={this.handleSubmit}>
          <div>
            <input
              name="title"
              placeholder="Appointment Title"
              value={this.props.title.value}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <input
              name="appt_time"
              placeholder="Time"
              value={formatDate(this.props.appt_time.value)}
              onChange={this.handleChange}
              disabled
            />
          </div>
          <Datetime
            open={true}
            input={false}
            inputProps={inputProps}
            value={this.props.appt_time.value}
            onChange={this.setAppTime}
          />
          <input
            type="submit"
            value="Make Appointment"
            className="submit-button"
            disabled={!this.props.formValid}
          />
        </form>
      </div>
    );
  }
}
