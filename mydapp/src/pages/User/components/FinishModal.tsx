import propTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationCircle} from '@fortawesome/free-solid-svg-icons'
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons'
import ModalHeader from '../../../components/ModalHeader'


const FinishModal = ({ title, message, description, tips = [], buttonText, closeModal, type}) => {
  return (
    <div className="FinishModal px-3" onClick={closeModal}>
      <div className={`FinishModal__Card${type ?? ''}`} onClick={(e) => e.stopPropagation()}>
        <ModalHeader title={title} closeModal={closeModal} />

        <div className="FinishModal__Check title text-center">
          <FontAwesomeIcon icon={faCheckCircle}/>
          <span className="text-2 mt-2">{ message }</span>
        </div>

        {description &&
          <div className='d-flex justify-content-center mb-5'>
            <span className="text-4 ">{ description }</span>
          </div>
        }
        {tips.length !== 0 &&
          <div className='FinishModal__Tips gap-3 mb-5'>
            {tips.map((tip, index) => (
              <div className="FinishModal__Info" key={index}>
                <FontAwesomeIcon icon={faExclamationCircle} />
                <div className='text-5' dangerouslySetInnerHTML={{ __html: tip }} />
              </div>
            ))}
          </div>
        }

        <div className="d-flex justify-content-center">
          <button className='button-green-panel' onClick={closeModal}>{buttonText ?? 'Volver al panel'}</button>
        </div>
      </div>
    </div>
  )
}

FinishModal.propTypes = {
  title: propTypes.string.isRequired,
  message: propTypes.string.isRequired,
  description: propTypes.string,
  tips: propTypes.array,
  buttonText: propTypes.string,
  closeModal: propTypes.func.isRequired,
  type: propTypes.string,
  assignPlan: propTypes.bool
}

export default FinishModal