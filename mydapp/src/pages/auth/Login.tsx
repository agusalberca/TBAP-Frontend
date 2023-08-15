import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import useAppContext from '../../hooks/useAppContext'
import { login } from '../../api/auth'
import AuthCard from '../../components/AuthCard'
import Input from '../../components/Input'
import LoadingDots from '../../components/LoadingDots'
// import SolarusBanner from '../../components/SolarusBanner'

const Login = () => {
  const { token, setToken } = useAppContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (token) {
      navigate('')
    }
  }, [token])

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validateOnChange: false,
    validationSchema: Yup.object().shape({
      email: Yup.string().email('Invalid email').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      const response = await login(values)

      if (response.non_field_errors)
        formik.setErrors({
          email: response.non_field_errors[0],
          password: response.non_field_errors[0],
        })
      else if (response.key) {
        setToken(response.key)
        if (response.error == 'You must change your password first.') {
          localStorage.setItem('must-change-password', values.password)
          navigate('/change-password')
        } else {
          navigate('/')
        }
      }
    },
  })

  return (
    <>
      <Helmet>
        <title>Solarus: Login</title>
      </Helmet>

      <section className="d-flex flex-column justify-content-center align-items-center gap-5">
        <AuthCard onSubmit={formik.handleSubmit}>
          <h1 className="text-3 fw-medium mb-2">Log in</h1>

          <p className="text-5 m-0">
            If you are logging in for the first time, enter your email and the
            password provided by us.
          </p>

          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="someone@gmail.com"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.errors.email}
            autoComplete="email"
          />
          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="********"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.errors.password}
            autoComplete="current-password"
          />

          <span className="text-5 mt-3">
            Forgot your password?{' '}
            <Link className="fw-bold" to="/forgot-password">
              Reset
            </Link>
          </span>

          <button
            className="button-blue gap-0 text-4"
            type="submit"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? (
              <>
                <span>Loading</span>
                <LoadingDots className="enter-done" />
              </>
            ) : (
              <span>Sign in</span>
            )}
          </button>
        </AuthCard>
      </section>
    </>
  )
}

export default Login
