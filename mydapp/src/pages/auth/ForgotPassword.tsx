import { useState } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {
  checkPasswordRecoveryToken,
  passwordRecovery,
  passwordRecoveryConfirm,
} from '../../api/auth'
import AuthCard from '../../components/AuthCard'
import Input from '../../components/Input'
// import SolarusBanner from '../../components/SolarusBanner'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import LoadingDots from '../../components/LoadingDots'

const ForgotPassword = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [serverError, setServerError] = useState(false)
  const [serverError2, setServerError2] = useState(false)
  const [error, setError] = useState('')

  const formik1 = useFormik({
    initialValues: {
      email: '',
    },
    validateOnChange: false,
    validationSchema: Yup.object({
      email: Yup.string()
        .required('E-mail is required.')
        .max(60, 'Maximum characters: 60.'),
    }),
    onSubmit: async ({ email }) => {
      if (email.includes(' ')) {
        email = email.replace(/ /g, '')
      }

      const response = await passwordRecovery({ email })

      if (response.e === 'No User matches the given query.')
        formik1.setFieldError('email', 'E-mail not found.')
      else if (response.error) setServerError(true)
      else if (response.message === 'Email sent') setStep((prev) => prev + 1)
    },
  })

  const formik2 = useFormik({
    initialValues: {
      token: '',
    },
    validateOnChange: false,
    validationSchema: Yup.object({
      token: Yup.string()
        .required('Token is required.')
        .max(60, 'Maximum characters: 60.'),
    }),
    onSubmit: async ({ token }) => {
      const response = await checkPasswordRecoveryToken({
        email: formik1.values.email,
        token,
      })

      if (response.e === 'No User matches the given query.')
        formik2.setFieldError('token', 'Code is invalid')
      else if (response.error === 'Token is invalid')
        formik2.setFieldError('token', 'Code is invalid')
      else if (response.error) setServerError2(true)
      else if (response.message === 'Token is valid')
        setStep((prev) => prev + 1)
    },
  })

  const formik3 = useFormik({
    initialValues: {
      password: '',
      passwordConfirm: '',
    },
    validateOnChange: false,
    validationSchema: Yup.object({
      password: Yup.string()
        .required('Required')
        .min(8, 'Password must be at least 8 characters')
        .max(40, 'Maximum characters: 40'),
      passwordConfirm: Yup.string()
        .required('Required')
        .min(8, 'Password must be at least 8 characters')
        .max(40, 'Maximum characters: 40'),
    }),
    onSubmit: async ({ password, passwordConfirm }) => {
      if (error === 'Code expired') {
        const response = await passwordRecovery({
          email: formik1.values.email,
        })

        if (response.e === 'No User matches the given query.')
          setError('Server error')
        else if (response.message === 'Email sent') setStep((p) => p - 1)
        return
      }
      if (password !== passwordConfirm) {
        formik3.setFieldError('password', 'passwords don\'t matchn')
        formik3.setFieldError('passwordConfirm', 'passwords don\'t matchn')
        return null
      }

      const response = await passwordRecoveryConfirm({
        email: formik1.values.email,
        token: formik2.values.token,
        password,
      })

      if (response.error) {
        if (
          response.error.includes('This password is too common.') ||
          response.error.includes(
            'The password is too similar to the username.'
          ) ||
          response.error.includes(
            'The password is too similar to the first name.'
          ) ||
          response.error.includes(
            'The password is too similar to the last name.'
          )
        )
          formik3.setErrors({
            password: 'This password is very insecure',
            passwordConfirm: 'This password is very insecure',
          })
        else if (
          response.error.includes(
            'Password must contain at least one uppercase letter.'
          ) ||
          response.error.includes(
            'Password must contain at least one symbol: !"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~.'
          ) ||
          response.error.includes('Password must contain at least one number.')
        )
          formik3.setErrors({
            password:
              'Your password must contain a number, a symbol, and a capital letter',
            passwordConfirm:
              'Your password must contain a number, a symbol, and a capital letter',
          })
        else if (response.error === 'Token expired') {
          setError('Code expired')
        } else setError('Something went wrong')
      } else if (response) setStep((prev) => prev + 1)
    },
  })

  return (
    <>
      <Helmet>
        <title>Solarus: Forgot Password</title>
      </Helmet>

      <SwitchTransition>
        <CSSTransition key={step} timeout={300}>
          <section className="Auth__Content d-flex flex-column justify-content-center align-items-center gap-5">
            <h1 className="text-1 fw-medium">Reset your password</h1>
            {step === 0 && (
              <AuthCard
                currentStep={1}
                totalSteps={3}
                onSubmit={formik1.handleSubmit}
              >
                <p className="text-4 fw-medium">
                  Input your email & we will send you a code to reset your
                  password.
                </p>

                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={formik1.values.email}
                  onChange={formik1.handleChange}
                  error={formik1.errors.email}
                  autoComplete="email"
                />

                {serverError ? (
                  <p className="text-red">Something went wrong</p>
                ) : (
                  <></>
                )}

                <button
                  className="button-blue gap-0 text-4 mt-3"
                  type="submit"
                  disabled={formik1.isSubmitting}
                >
                  {formik1.isSubmitting ? (
                    <>
                      <span>Sending</span>
                      <LoadingDots className="enter-done" />
                    </>
                  ) : (
                    <span>Continue</span>
                  )}
                </button>
              </AuthCard>
            )}
            {step === 1 && (
              <AuthCard
                currentStep={2}
                totalSteps={3}
                onSubmit={formik2.handleSubmit}
              >
                <p className="text-4 fw-medium">
                  Please input the code we sent you to your email.
                </p>

                <Input
                  label="Code"
                  type="password"
                  name="token"
                  placeholder="******"
                  value={formik2.values.token}
                  onChange={formik2.handleChange}
                  error={formik2.errors.token}
                />

                {serverError2 ? (
                  <p className="text-red">Something went wrong</p>
                ) : (
                  <></>
                )}

                <button
                  className="button-blue gap-0 text-4 mt-3"
                  type="submit"
                  disabled={formik2.isSubmitting}
                >
                  {formik2.isSubmitting ? (
                    <>
                      <span>Loading</span>
                      <LoadingDots className="enter-done" />
                    </>
                  ) : (
                    <span>Continue</span>
                  )}
                </button>
              </AuthCard>
            )}
            {step === 2 && (
              <AuthCard
                currentStep={3}
                totalSteps={3}
                onSubmit={formik3.handleSubmit}
              >
                <p className="text-4 fw-medium">Input your new password.</p>

                <Input
                  label="New password"
                  type="password"
                  name="password"
                  placeholder="******"
                  value={formik3.values.password}
                  onChange={formik3.handleChange}
                  error={formik3.errors.password}
                  tip="Your password must contain a number, a symbol, and a capital letter"
                />

                <Input
                  label="Confirm new password"
                  type="password"
                  name="passwordConfirm"
                  placeholder="******"
                  value={formik3.values.passwordConfirm}
                  onChange={formik3.handleChange}
                  error={formik3.errors.passwordConfirm}
                />

                {error ? <p className="text-red">{error}</p> : <></>}

                <button
                  className="button-blue gap-0 text-4 mt-3"
                  type="submit"
                  disabled={formik3.isSubmitting || error === 'Server error'}
                >
                  {formik2.isSubmitting ? (
                    <>
                      <span>loading</span>
                      <LoadingDots className="enter-done" />
                    </>
                  ) : (
                    <span>
                      {error === 'Code expired' ? 'Resend code' : 'Continue'}
                    </span>
                  )}
                </button>
              </AuthCard>
            )}
            {step === 3 && (
              <AuthCard
                onSubmit={(e) => {
                  e.preventDefault()
                  navigate('/login')
                }}
              >
                <p className="text-4 fw-medium">Password changed!</p>

                <button className="button-blue text-4 mt-3" type="submit">
                  Go back to login
                </button>
              </AuthCard>
            )}
          </section>
        </CSSTransition>
      </SwitchTransition>
    </>
  )
}

export default ForgotPassword
