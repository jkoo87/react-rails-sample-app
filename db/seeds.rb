# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


Appointment.create!(
  title:         "Example Admin",
  appt_time:      "September 29 2017, 12:00 am",
)


Appointment.create!(
  title:         "Second Appointment",
  appt_time:      "September 29 2018, 12:00 am",
)
