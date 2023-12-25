import {Component} from 'react'
import {format} from 'date-fns'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

const initial = []

class Appointment extends Component {
  state = {
    date: '',
    title: '',
    appointmentsList: initial,
    isStarredOnly: false,
  }

  saveTitle = event => {
    this.setState({
      title: event.target.value,
    })
  }

  saveDate = event => {
    const formattedDate = format(
      new Date(event.target.value),
      'yyyy MM dd EEEE',
    )

    this.setState({
      date: formattedDate,
    })
  }

  addAppointment = () => {
    const {date, title} = this.state
    const newData = {
      id: uuidv4(),
      title,
      date,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newData],
    }))

    const titleEl = document.getElementById('inputTitle')
    const dateEl = document.getElementById('inputDate')

    titleEl.value = ''
    dateEl.value = ''
  }

  toggleStarred = () => {
    console.log('clicked', this.state)
    this.setState(prevState => ({
      isStarredOnly: !prevState.isStarredOnly,
    }))
  }

  toggleFavourite = id => {
    this.setState(prevState => {
      const updatedAppointmentsList = prevState.appointmentsList.map(each => {
        if (each.id === id) {
          return {...each, isStarred: !each.isStarred}
        }
        return each
      })

      return {appointmentsList: updatedAppointmentsList}
    })
  }

  checkLists = () => {
    const {appointmentsList, isStarredOnly} = this.state
    if (isStarredOnly === true) {
      const filteredData = appointmentsList.filter(each => each.isStarred)
      return filteredData
    }
    return appointmentsList
  }

  render() {
    const {isStarredOnly, date, title} = this.state
    const finalAppointmentsList = this.checkLists()
    return (
      <div className="bg-container">
        <div className="app-container">
          <div className="add-app-section">
            <form className="schedule-section">
              <h1>Add Appointment</h1>
              <div className="input-field">
                <label htmlFor="appointment-title">TITLE</label>
                <input
                  type="text"
                  className="appointment-field"
                  name="appointment-title"
                  placeholder="Title"
                  onChange={this.saveTitle}
                  id="inputTitle"
                  value={title}
                />
              </div>
              <div className="input-field">
                <label htmlFor="appointment-date">Date</label>
                <input
                  type="date"
                  className="appointment-field"
                  name="appointment-date"
                  id="inputDate"
                  onChange={this.saveDate}
                  value={date}
                />
              </div>
              <button
                type="button"
                className="add-btn"
                onClick={this.addAppointment}
              >
                Add
              </button>
            </form>
            <div className="image-section">
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
              />
            </div>
          </div>
          <hr className="seperator" />

          <div className="appointments-section">
            <div className="title-and-btn">
              <h1>Appointments</h1>
              <button
                className={
                  isStarredOnly ? 'starred-btn-clicked' : 'starred-btn'
                }
                type="button"
                onClick={this.toggleStarred}
              >
                Starred
              </button>
            </div>
            <ul className="appointments-container">
              {finalAppointmentsList.map(data => (
                <AppointmentItem
                  propData={data}
                  key={data.id}
                  toggleFavourite={this.toggleFavourite}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointment
