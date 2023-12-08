import classNames from 'classnames'
import { faChevronLeft, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface Props {
  id?: string;
  children: React.ReactNode;
  title: string;
  closeModal?: () => void;
  prevStep?: () => void;
  isBig?: boolean;
  notCloseOnBlur?: boolean;
}

const Modal = ({ id, children, title, closeModal, prevStep, isBig, notCloseOnBlur = false }: Props) => {

  return (
    <div id={id} className="Modal__Container" onClick={notCloseOnBlur ? undefined : closeModal}>
      <div
        className={classNames(
          'Modal__Card',
          { 'Modal__Card--Big': isBig },
        )}
        onClick={e => e.stopPropagation()}
      >
        <header className="Modal__Header">
          <button className={classNames({ 'Modal__Button': prevStep })} onClick={prevStep}>
            {prevStep && (
              <FontAwesomeIcon icon={faChevronLeft}/>
            )}
          </button>

          <h3 className="text-3 fw-semibold text-center self-center">{ title }</h3>

          <button className={classNames({ 'Modal__Button': closeModal })} onClick={closeModal}>
            {closeModal && (
              <FontAwesomeIcon icon={faTimes}/>
            )}
          </button>
        </header>

        { children }
      </div>
    </div>
  )
}

export default Modal