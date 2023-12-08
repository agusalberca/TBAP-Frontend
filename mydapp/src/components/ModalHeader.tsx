import propTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faXmark } from '@fortawesome/free-solid-svg-icons'


const ModalHeader = ({ title, closeModal, goBack }) => {
  return (
    <header>
      {goBack && (
        <button className='PanelModal__Button-GoBack' onClick={goBack}>
          <FontAwesomeIcon icon={faChevronLeft}/>
        </button>
      )}
      <button className='PanelModal__Button-Close' onClick={closeModal}>
        <FontAwesomeIcon icon={faXmark}/>
      </button>
      <h2 className="PanelModal__Title text-1 text-center">{title}</h2>
    </header>
  )
}

ModalHeader.propTypes = {
  title: propTypes.string.isRequired,
  closeModal: propTypes.func.isRequired,
  goBack: propTypes.func,
}

export default ModalHeader