import React from 'react';
import AppointmentForm from './appointment_form';
import { AppointmentsList } from './appointments_list';
import axios from 'axios'
import update from 'immutability-helper';

export default class Appointments extends React.Component {
  constructor(props, _railsContext){
    super(props);
    this.state = {
      appointments: this.props.appointments,
      title: '',
      appt_time: ''
    };
    this.addNewAppointment = this.addNewAppointment.bind(this)
  }

  handleUserInput(obj){
    this.setState(obj)
  }

  handleFormSubmit() {
    const time_avail = this.state.appt_time? this.state.appt_time : new Date()
    const appointment ={
      title: this.state.title,
      appt_time: time_avail
    };
    console.log(appointment)
    axios.post('/appointments',
                {
                  authenticity_token: ReactOnRails.authenticityToken(),
                  appointment: appointment
                }
              ).then((response) => {
                this.addNewAppointment(response.data)
              }).catch(error => {
                console.log(error);
              })
  }

  addNewAppointment(appointment) {
    const appointments = update(this.state.appointments, { $push: [appointment] });
    console.log(appointments)
    this.setState({
      appointments: appointments.sort(function(a,b){
                      return new Date(a.appt_time) - new Date(b.appt_time);
                    }),
      title: '',
      appt_time: ''
    })
  }

  render(){
    return (
      <div className='appointment'>
        <AppointmentForm
          title={this.state.title}
          appt_time={this.state.appt_time}
          onUserInput={this.handleUserInput.bind(this)}
          onFormSubmit={this.handleFormSubmit.bind(this)}
        />
        <AppointmentsList
          appointments={this.state.appointments}
        />
      </div>
    )
  }
}
