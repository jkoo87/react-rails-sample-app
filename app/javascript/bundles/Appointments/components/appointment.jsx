import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import axios from "axios";

import { formatDate } from "../utils/format.js";

export default class Appointment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appointment: props.appointment
    };
  }
  static propTypes = {
    appointment: PropTypes.object.isRequired
  };

  static defaultProps = {
    appointment: {}
  };

  componentDidMount() {
    if (this.props.match) {
      axios({
        method: "get",
        url: `/appointments/${this.props.match.params.id}.json`
      })
        .then(response => {
          this.setState({ appointment: response.data });
        })
        .catch(error => {
          console.log("Error");
          console.log(error);
        });
    }
  }

  render() {
    return (
      <div className="appointment">
        <Link to={`/appointments/${this.state.appointment.id}`}>
          <h3>{this.state.appointment.title}</h3>
        </Link>
        <p>{formatDate(this.state.appointment.appt_time)}</p>
        {this.props.match && (
          <Link to={`/appointments/${this.state.appointment.id}/edit`}>
            edit
          </Link>
        )}
      </div>
    );
  }
}
