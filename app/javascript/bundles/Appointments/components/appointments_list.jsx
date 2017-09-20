import React from 'react';

import {Appointment} from './appointment'

export const AppointmentsList = ({appointments}) =>
      <div className='appointment__list'>
        <h2>Appointmentsquit</h2>
        <div className='appointment__list__detail'>
          {appointments.map((appointment)=>{
            return (
              <Appointment appointment={appointment} key={appointment.id} />
          )})}
        </div>
      </div>
