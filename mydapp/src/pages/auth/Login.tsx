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
  Card,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
} from '@chakra-ui/react';

const Login = () => {
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
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '75vh'}}>
        <section className="d-flex flex-row gap-5">
          <Card style={{display: 'flex', justifyContent: 'center', alignItems: 'center', padding: "1rem"}}>
            <div style={{ margin: '2rem' }} className="d-flex flex-row gap-5">
              <div className="d-flex flex-column gap-3">
                <AuthCard onSubmit={formik.handleSubmit}>
                  <div className='innerAuthCard'>
                    <h1 className="text-1 fw-medium mb-2 ">Log in</h1>

                    <h5 className="text-5 m-1">
                      If you are logging in for the first time, enter your email and the
                      password provided by us.
                    </h5>

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
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
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
                          <span>Log in</span>
                        )}
                      </button>

                      <span className="text-5 mt-3">
                        Forgot your password?{' '}
                        <Link className="fw-bold" to="/forgot-password">
                          Reset
                        </Link>
                      </span>
                    </div>

                    
                  </div>
                  
                </AuthCard>
              </div>

              <div style={{ borderLeft: '1px solid #ccc', height: '95%' }}></div>
              
              <div className="d-flex flex-column gap-3">
                <AuthCard onSubmit={formik.handleSubmit}>
                  <div style={{height:"400px"}} >
                    <div className="border-right border-dark p-3 d-flex flex-column justify-content-center">
                      <h3>SSO Options</h3>
                      <h5 className="text-5" style={{ margin:"10% 0 10% 0" }}>
                        You can also log in using your SSO credentials, if you have them.
                      </h5>
                      <Select className="mb-3" style={{ margin:"10% 0 10% 0" }}>
                          <option value="sso1">SSO Option 1</option>
                          <option value="sso2">SSO Option 2</option>
                          <option value="sso3">SSO Option 3</option>
                        </Select>
                        <button className="button-blue" style={{ margin:"14% 0 0 0" }}> Log in with SSO</button>
                    </div>
                  </div>
                </AuthCard>
              </div>
            </div>

          </Card>
        
        </section>
      </div>
      
    </>
  );
}

export default Login;
