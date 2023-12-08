import { faLock } from '@fortawesome/free-solid-svg-icons'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import propTypes from 'prop-types'
import ModalHeader from '../../../components/ModalHeader'
import { useContext, useState } from 'react'
import FinishModal from './FinishModal'
import { AppContext } from '../../../context/AppContext';
import Input from '../../../components/Input'
// import { postPasswordChange } from '../../api/auth'


const EditPasswordModal = ({ closeModal }) => {
  const { token } = useContext(AppContext)
  const [step, setStep] = useState(1)

  const formik = useFormik({
    initialValues: {
      old_password: '',
      new_password1: '',
      new_password2: '',
    },
    validateOnChange: false,
    validationSchema: Yup.object({
      old_password: Yup.string().required('Su contraseña es requerida').min(5, 'Mínimo de caracteres: 5').max(40, 'Máximo de caracteres: 40'),
      new_password1: Yup.string().required('Su contraseña es requerida').min(5, 'Mínimo de caracteres: 5').max(40, 'Máximo de caracteres: 40'),
      new_password2: Yup.string().required('Repetir la contraseña es requerido').min(5, 'Mínimo de caracteres: 5').max(40, 'Máximo de caracteres: 40'),
    }),
    onSubmit: async ({ old_password, new_password1, new_password2 }) => {
      if (old_password === new_password1) {
        formik.setFieldError('old_password', 'Las contraseñas no deben coincidir')
        formik.setFieldError('new_password1', 'Las contraseñas no deben coincidir')
      } else if  (new_password1 !== new_password2) {
        formik.setFieldError('new_password1', 'Las contraseñas no coinciden')
        formik.setFieldError('new_password2', 'Las contraseñas no coinciden')
      } else {
        // const response = await postPasswordChange(token, {old_password, new_password1, new_password2 })

    //     if (response.error === 'Old password is incorrect')
    //       formik.setFieldError('old_password', 'Contraseña incorrecta')
    //     else if (response)
    //       setStep(prev => prev + 1)
      }
    }
  })

  if(step === 1) return (
    <div className="PanelModal px-3" onClick={closeModal}>
      <form className="PanelModal__Card" onClick={(e) => e.stopPropagation()}>
        <ModalHeader title={'Cambiar contraseña'} closeModal={closeModal} />

        <div className='d-flex flex-column gap-5 my-5'>
          <Input
            label='Contraseña actual'
            name='old_password'
            type='password'
            value={formik.values.old_password}
            onChange={formik.handleChange}
            error={formik.errors.old_password}
            icon={faLock}
          />

          <Input
            label='Contraseña nueva'
            name='new_password1'
            type='password'
            value={formik.values.new_password1}
            onChange={formik.handleChange}
            error={formik.errors.new_password1}
            tip={'<span>Debe contener al menos 5 caracteres<br />No debe ser igual a la anterior</span>'}
            icon={faLock}
          />

          <Input
            label='Repetir contraseña'
            name='new_password2'
            type='password'
            value={formik.values.new_password2}
            onChange={formik.handleChange}
            error={formik.errors.new_password2}
            icon={faLock}
          />
        </div>
        <div className="d-flex justify-content-center">
          {/* <button className='button-green-panel' type="submit" onClick={formik.handleSubmit}>Cambiar contraseña</button> */}
          <button className='button-green-panel' type="submit">Cambiar contraseña</button>
        </div>
      </form>
    </div>
  )

  if(step === 2) return (
    <FinishModal
      title='Cambiar contraseña'
      message='Contraseña guardada'
      description={'Tu nueva contraseña fue creada con éxito'}
      buttonText={'¡Entendido!'}
      closeModal={closeModal}
    />
  )
}

EditPasswordModal.propTypes = {
  closeModal: propTypes.func.isRequired
}

export default EditPasswordModal