class AppointmentList extends React.Component{
  render(){
    return(
      <div className='appointment__list'>
        <h2>Appointments</h2>
        <div className='appointment__list__detail'>
          {this.props.appointments.map((a)=>{
            return (
              <Appointment key={a.id} appointment={a} />
          )})}
        </div>
      </div>
    )
  }
}
