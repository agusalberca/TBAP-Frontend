import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import useAppContext from '../../hooks/useAppContext'
import { updateUser } from '../../api/auth'
import AuthCard from '../../components/AuthCard'
import Input from '../../components/Input'
import LoadingDots from '../../components/LoadingDots'
import 'react-phone-number-input/style.css'
import { isValidPhoneNumber } from 'react-phone-number-input'
import PhoneNumberInput from '../../components/PhoneNumberInput'
import { requireAuth } from '../../features/auth/hooks/authUtils'


export { requireAuth };
const AboutYou = () => {
  requireAuth()
  const { token, user, refreshUser } = useAppContext()
  const [serverError, setServerError] = useState(false)
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      phone: '',
      rol: '',
    },
    validateOnChange: false,
    validationSchema: Yup.object().shape({
      first_name: Yup.string().required('Required'),
      last_name: Yup.string().required('Required'),
      phone: Yup.string()
        .required('Required')
        .test((value) => isValidPhoneNumber(value)),
      rol: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      const response = await updateUser(token, values)

      if (response.error) setServerError(true)
      else if (response.user && response.user_profile) {
        refreshUser()
      }
    }
  })

  useEffect(() => {
    if(user?.first_name) {
      navigate('/')
    }
  }, [user])

  return (
    <>
      <Helmet>
        <title>Solarus: About You</title>
      </Helmet>

      <section className="Auth__Content d-flex flex-column justify-content-center align-items-center gap-5">
        <h1 className='text-1 fw-medium'>Set up your account</h1>

        <AuthCard currentStep={2} totalSteps={2} onSubmit={formik.handleSubmit}>
          <h1 className='text-3 fw-medium mb-2'>About you</h1>

          <Input
            label='Name'
            type='text'
            name='first_name'
            placeholder='Name'
            value={formik.values.first_name}
            onChange={formik.handleChange}
            error={formik.errors.first_name}
          />
          <Input
            label='Last name'
            type='text'
            name='last_name'
            placeholder='Last name'
            value={formik.values.last_name}
            onChange={formik.handleChange}
            error={formik.errors.last_name}
          />

          <PhoneNumberInput
            label="Phone number"
            name="phone"
            value={formik.values.phone}
            onChange={(value) => formik.setFieldValue('phone', value)}
            errors={formik.errors.phone}
          />

          <Input
            label='Role'
            type='text'
            name='rol'
            placeholder='Type role description'
            value={formik.values.rol}
            onChange={formik.handleChange}
            error={formik.errors.rol}
          />

          {serverError ? <p className='text-red'>Something went wrong</p> : <></>}

          <button
            className="button-blue gap-0 text-4 mt-2"
            type="submit"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? (
              <>
                <span>Loading</span>
                <LoadingDots className='enter-done' />
              </>
            ) : (
              <span>Complete set up</span>
            )}
          </button>
        </AuthCard>
      </section>
    </>
  )
}

export default AboutYou