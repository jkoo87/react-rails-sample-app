class Appointments extends React.Component{
  constructor(props){
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
    const appointment ={
      title: this.state.title,
      appt_time: this.state.appt_time
    };
    $.post('/appointments',
            { appointment: appointment })
            .done((data)=>{
              this.addNewAppointment(data)
            })
  }

  addNewAppointment(appointment) {
    const appointments = React.addons.update(this.state.appointments, { $push: [appointment] });
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
        <AppointmentList appointments={this.state.appointments} />
      </div>
    )
  }
}
