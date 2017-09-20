import React from 'react';

import {formatDate} from '../utils/format.js'

export const Appointment = ({appointment}) =>
  <div className='appointment__list__detail__div'>
    <h3>{appointment.title}</h3>
    <p>{formatDate(appointment.appt_time)}</p>
  </div>
