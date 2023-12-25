import './index.css'

const AppoinetmentItem = props => {
  console.log(props)
  const {propData, toggleFavourite} = props
  const {title, date, id, isStarred} = propData

  const markFavourite = () => {
    toggleFavourite(id)
  }
  return (
    <li className="item-card">
      <div className="title-date">
        <p className="appointment-title">{title}</p>
        <p className="appointment-date">{date}</p>
      </div>
      <div className="starred-btn-section">
        <button
          type="button"
          aria-label="pin"
          onClick={markFavourite}
          className="starred-btn-in-card"
          data-testid="star"
        >
          <img
            src={
              isStarred
                ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
                : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
            }
            alt="star"
          />
        </button>
      </div>
    </li>
  )
}

export default AppoinetmentItem
