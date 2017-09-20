import React from 'react';
import {formatDate} from '../utils/format'
import Datetime from 'react-datetime'
export default class AppointmentForm extends React.Component {
  handleSubmit(e) {
    e.preventDefault()
    this.props.onFormSubmit()
  }

  handleChange(e) {
    const name = e.target.name;
    const obj = {};
    obj[name] = e.target.value;
    this.props.onUserInput(obj)
  }
  setAppTime(e){
    const name = 'appt_time';
    const obj = {};
    obj[name] = e.toDate();
    this.props.onUserInput(obj);
  }
  render(){
    const inputProps ={name: 'appt_time'}
    const showCurrentDate = this.props.appt_time?
                            this.props.appt_time : new Date()
    return(
      <div className='appointment__forms'>
        <h2>Make a new Appointment</h2>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div>
            <input name='title'
              placeholder='Appointment Title'
              value={this.props.title}
              onChange={this.handleChange.bind(this)}
            />
          </div>
          <div>
            <input name='appt_time'
              placeholder='Time'
              value={formatDate(showCurrentDate)}
              onChange={this.handleChange.bind(this)}
            />
          </div>
          <Datetime
            open={true}
            input={false}
            inputProps={inputProps}
            value={this.props.appt_time}
            onChange={this.setAppTime.bind(this)}
          />
        <input type='submit' value='Make Appointment' className='submit-button' />
        </form>
      </div>
    )
  }
}
