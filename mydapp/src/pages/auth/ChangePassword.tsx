import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import useAppContext from '../../hooks/useAppContext'
import { changePassword } from '../../api/auth'
import AuthCard from '../../components/AuthCard'
import Input from '../../components/Input'
import LoadingDots from '../../components/LoadingDots'
import { useState } from 'react'
import { requireAuth } from './AboutYou'

const ChangePassword = () => {
  requireAuth()
  const { token } = useAppContext()
  const [serverError, setServerError] = useState(false)
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      new_password1: '',
      new_password2: '',
    },
    validateOnChange: false,
    validationSchema: Yup.object().shape({
      new_password1: Yup.string()
        .required('Required')
        .min(8, 'Password must be at least 8 characters'),
      new_password2: Yup.string()
        .required('Required')
        .min(8, 'Password must be at least 8 characters'),
    }),
    onSubmit: async ({ new_password1, new_password2 }) => {
      if (new_password1 !== new_password2) {
        formik.setErrors({
          new_password1: 'Passwords do not match',
          new_password2: 'Passwords do not match',
        })

        return
      }

      const old_password = localStorage.getItem('must-change-password')
      const response = await changePassword(token, {
        old_password,
        new_password1,
        new_password2,
      })

      if (response.error || response.new_password2 || response.new_password1 || response.old_password) {
        if (
          response.new_password1 &&
          response.new_password1.includes(
            'New password must be different from old password.'
          )
        ) {
          formik.setErrors({
            new_password1: 'New password must be different from old password.',
            new_password2: 'New password must be different from old password.',
          })
        } else if (
          response.new_password2 &&
          (response.new_password2.includes('This password is too common.') ||
            response.new_password2.includes(
              'The password is too similar to the username.'
            ) ||
            response.new_password2.includes(
              'The password is too similar to the first name.'
            ) ||
            response.new_password2.includes(
              'The password is too similar to the last name.'
            ))
        ) {
          formik.setErrors({
            new_password1: 'This password is very insecure',
            new_password2: 'This password is very insecure',
          })
        } else if (
          response.new_password2 &&
          (response.new_password2?.includes(
            'Password must contain at least one uppercase letter.'
          ) ||
          response.new_password2?.includes(
            'Password must contain at least one symbol: !"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~.'
          ) ||
          response.new_password2?.includes(
            'Password must contain at least one number.'
          ))
        ) {
          formik.setErrors({
            new_password1:
              'Your password must contain a number, a symbol, and a capital letter',
            new_password2:
              'Your password must contain a number, a symbol, and a capital letter',
          })
        } else setServerError(true)
      } else if (response.detail) {
        localStorage.removeItem('must-change-password')
        navigate('/about-you')
      }
    },
  })

  return (
    <>
      <Helmet>
        <title>Solarus: Change Password</title>
      </Helmet>

      <section className="Auth__Content d-flex flex-column justify-content-center align-items-center gap-5">
        <h1 className="text-1 fw-medium">Set up your account</h1>

        <AuthCard currentStep={1} totalSteps={2} onSubmit={formik.handleSubmit}>
          <h2 className="text-3 fw-medium">Change your password</h2>

          <Input
            label="New password"
            type="password"
            name="new_password1"
            placeholder="******"
            value={formik.values.new_password1}
            onChange={formik.handleChange}
            error={formik.errors.new_password1}
            tip="Your password must contain a number, a symbol, and a capital letter"
          />
          <Input
            label="Confirm new password"
            type="password"
            name="new_password2"
            placeholder="******"
            value={formik.values.new_password2}
            onChange={formik.handleChange}
            error={formik.errors.new_password2}
          />

          {serverError ? (
            <p className="text-red">Something went wrong</p>
          ) : (
            <></>
          )}

          <button
            className="button-blue gap-0 text-4 mt-3"
            type="submit"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? (
              <>
                <span>Loading</span>
                <LoadingDots className="enter-done" />
              </>
            ) : (
              <span>Continue</span>
            )}
          </button>
        </AuthCard>
      </section>
    </>
  )
}

export default ChangePassword
