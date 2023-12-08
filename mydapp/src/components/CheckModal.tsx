import Modal from './Modal'
import CheckIcon from '../assets/icons/check.svg'

interface Props {
  title: string;
  message: string;
  info?: string;
  closeModal: () => void;
}

const CheckModal = ({ title, message, info, closeModal }: Props) => {
  return (
    <Modal
      title={title}
      closeModal={closeModal}
    >
      <div className="CheckModal text-center">
        <img src={CheckIcon} alt={title} title={title} />
        <h4 className='text-4 fw-medium'>{ message }</h4>
        {info ? <p className='text-5 fw-normal'>{info}</p> : <></>}
      </div>
    </Modal>
  )
}

export default CheckModal