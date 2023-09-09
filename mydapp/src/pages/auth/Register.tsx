import { useEffect } from 'react';
import { Form, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import useAppContext from '../../hooks/useAppContext';
import { login } from '../../api/auth';
import AuthCard from '../../components/AuthCard';
import LoadingDots from '../../components/LoadingDots';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';

const Register = () => {
  const { token, setToken } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate('');
    }
  }, [token]);

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
    onSubmit: async values => {
      const response = await login(values)

      if (response.non_field_errors)
        formik.setErrors({
          email: response.non_field_errors[0],
          password: response.non_field_errors[0],
        });
      else if (response.key) {
        setToken(response.key);
        if (response.error == 'You must change your password first.') {
          localStorage.setItem('must-change-password', values.password);
          navigate('/change-password');
        } else {
          navigate('/');
        }
      }
    },
  });

  return (
    <>
      <Helmet>
        <title>TBAP: Login</title>
      </Helmet>

      <section className="d-flex flex-column justify-content-center align-items-center gap-5">
        <AuthCard onSubmit={formik.handleSubmit}>
          <h1 className="text-1 fw-medium mb-2 ">Log in</h1>

          <p className="text-5 m-1" style={{ color: '#FFFFFF' }}>
            If you are logging in for the first time, enter your email and the
            password provided by us.
          </p>

          <FormControl isInvalid={!!formik.errors.email}>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              type="email"
              placeholder="someone@gmail.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              autoComplete="email"
            />
            <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!formik.errors.password}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              placeholder="********"
              value={formik.values.password}
              onChange={formik.handleChange}
              autoComplete="current-password"
            />
            <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
          </FormControl>

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
  );
};

export default Register;