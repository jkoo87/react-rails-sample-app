import React from "react";
import PropTypes from "prop-types";
import { FormErrors } from "./FormErrors";
import { formatDate } from "../utils/format";
import Datetime from "react-datetime";
import { validations } from "../utils/validations";
import "react-datetime/css/react-datetime.css";
import update from "immutability-helper";
import axios from "axios";
import moment from "moment";

export default class AppointmentForm extends React.Component {
  static propTypes = {
    handleNewAppointment: PropTypes.func.isRequired
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
  constructor(props, _railsContext) {
    super(props);
    this.state = {
      title: { value: "", valid: false },
      appt_time: { value: new Date(), valid: false },
      formErrors: {},
      formValid: false,
      isEditing: false
    };
  }
  componentDidMount() {
    if (this.props.match) {
      axios({
        method: "get",
        url: `/appointments/${this.props.match.params.id}.json`
      })
        .then(response => {
          const data = response.data;
          this.setState({
            title: { value: data.title, valid: true },
            appt_time: { value: data.appt_time, valid: true },
            isEditing: this.props.match.path === "/appointments/:id/edit"
          });
        })
        .catch(error => {
          console.log("Error");
          console.log(error);
        });
    }
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

  handleFormSubmit = e => {
    e.preventDefault();
    this.state.isEditing ? this.updateAppointment() : this.addAppointment();
  };

  addAppointment = () => {
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
        this.props.handleNewAppointment(response.data);
        this.resetFormErrors();
        this.setState({
          title: { value: "", valid: false },
          appt_time: { value: this.state.appt_time.value, valid: false }
        });
      })
      .catch(error => {
        console.log("not created");
      });
  };

  updateAppointment = () => {
    const time_avail = this.state.appt_time ? this.state.appt_time : new Date();
    const appointment = {
      title: this.state.title.value,
      appt_time: time_avail.value
    };
    axios
      .put(`/appointments/${this.props.match.params.id}`, {
        authenticity_token: ReactOnRails.authenticityToken(),
        appointment: appointment
      })
      .then(response => {
        console.log("updated");
        this.resetFormErrors();
        this.props.history.push("/");
      })
      .catch(error => {
        console.log("not updated");
      });
  };

  deleteAppointment = () => {
    if (confirm("Are you sure you want to delete this appointment?")) {
      axios
        .delete(`/appointments/${this.props.match.params.id}`, {
          headers: {
            "X-CSRF-Token": ReactOnRails.authenticityToken(),
            Accept: "application/vnd.api+json",
            "Content-Type": "application/vnd.api+json"
          }
        })
        .then(response => {
          this.resetFormErrors();
          this.props.history.push("/");
        })
        .catch(error => {
          console.log("not deleted");
          console.log(error.message);
        });
    }
  };

  resetFormErrors() {
    this.setState({ formErrors: {} });
  }

  handleChange = e => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    this.handleUserInput(
      fieldName,
      fieldValue,
      AppointmentForm.formValidations[fieldName]
    );
  };
  setAppTime = e => {
    const fieldName = "appt_time";
    const fieldValue = e.toDate();
    this.handleUserInput(
      fieldName,
      fieldValue,
      AppointmentForm.formValidations[fieldName]
    );
  };
  render() {
    const inputProps = { name: "appt_time" };
    return (
      <div className="appointments__forms">
        <h2>
          {this.state.isEditing
            ? "Update appointment"
            : "  Make a new Appointment"}
        </h2>
        <FormErrors formErrors={this.state.formErrors} />
        <form onSubmit={this.handleFormSubmit}>
          <div>
            <input
              name="title"
              placeholder="Appointment Title"
              value={this.state.title.value}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <input
              name="appt_time"
              placeholder="Time"
              value={formatDate(this.state.appt_time.value)}
              onChange={this.handleChange}
              disabled
            />
          </div>
          <Datetime
            open={true}
            input={false}
            inputProps={inputProps}
            value={moment(this.state.appt_time.value)}
            onChange={this.setAppTime}
          />
          <input
            type="submit"
            value={
              this.state.isEditing ? "Update Appointment" : "Make Appointment"
            }
            className="submit-button"
            disabled={!this.state.formValid}
          />
        </form>
        {this.state.isEditing && (
          <p>
            <button onClick={this.deleteAppointment}>Delete Appointment</button>
          </p>
        )}
      </div>
    );
  }
}
