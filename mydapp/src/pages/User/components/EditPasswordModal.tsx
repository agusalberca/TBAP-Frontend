import { faLock } from '@fortawesome/free-solid-svg-icons'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import propTypes from 'prop-types'
import ModalHeader from '../../../components/ModalHeader'
import { useContext, useEffect, useState } from 'react'
import FinishModal from './FinishModal'
import { AppContext } from '../../../context/AppContext';
import Input from '../../../components/Input'
import { changePassword } from '../../../api/auth'
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
      old_password: Yup.string().required('Your password is required').min(5, 'Minimum characters: 5').max(40, 'Maximum characters: 40'),
      new_password1: Yup.string().required('Your password is required').min(5, 'Minimum characters: 5').max(40, 'Maximum characters: 40'),
      new_password2: Yup.string().required('Repeating the password is required').min(5, 'Minimum characters: 5').max(40, 'Maximum characters: 40'),
    }),
    onSubmit: async ({ old_password, new_password1, new_password2 }) => {
      if (old_password === new_password1) {
        formik.setFieldError('old_password', 'Passwords must not match')
        formik.setFieldError('new_password1', 'Passwords must not match')
      } else if  (new_password1 !== new_password2) {
        formik.setFieldError('new_password1', 'Passwords do not match')
        formik.setFieldError('new_password2', 'Passwords do not match')
      } else {
        const response = await changePassword(token, {old_password, new_password1, new_password2 })

        if (response.error === 'Old password is incorrect')
          formik.setFieldError('old_password', 'Incorrect password')
        else if (response)
          setStep(prev => prev + 1)
      }
    }
  })

  if(step === 1) return (
    <div className="PanelModal px-3" onClick={closeModal}>
      <form className="PanelModal__Card" onClick={(e) => e.stopPropagation()}>
        <ModalHeader title={'Change password'} closeModal={closeModal} />

        <div className='d-flex flex-column gap-5 my-5'>
          <Input
            label='Current Password'
            name='old_password'
            type='password'
            value={formik.values.old_password}
            onChange={formik.handleChange}
            error={formik.errors.old_password}
            icon={faLock}
          />

          <Input
            label='New Password'
            name='new_password1'
            type='password'
            value={formik.values.new_password1}
            onChange={formik.handleChange}
            error={formik.errors.new_password1}
            tip={'<span>Must contain at least 5 characters<br />Must not be the same as the previous one</span>'}
            icon={faLock}
          />

          <Input
            label='Repeat Password'
            name='new_password2'
            type='password'
            value={formik.values.new_password2}
            onChange={formik.handleChange}
            error={formik.errors.new_password2}
            icon={faLock}
          />
        </div>
        <div className="d-flex justify-content-center">
          {/* <button className='button-green-panel' type="submit" onClick={formik.handleSubmit}>Change password</button> */}

          <button
            type="button"
            className='button-green-panel'
            onClick={() => formik.handleSubmit()}
          >
            Change password
          </button>
        </div>
      </form>
    </div>
  )

  if(step === 2) return (
    <FinishModal
      title='Change password'
      message='Password saved'
      description={'Your new password was successfully created'}
      buttonText={'Got it!'}
      closeModal={closeModal}
    />
  )
}

EditPasswordModal.propTypes = {
  closeModal: propTypes.func.isRequired
}

export default EditPasswordModal
