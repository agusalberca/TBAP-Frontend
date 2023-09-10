import { useEffect, useState } from 'react';
import { Form, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import useAppContext from '../../hooks/useAppContext';
import { signUp } from '../../api/auth';
import AuthCard from '../../components/AuthCard';
import LoadingDots from '../../components/LoadingDots';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button } from "@chakra-ui/react";


const SignUp = () => {
  const { token } = useAppContext();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    navigate('/login');
  };

  useEffect(() => {
    if (token) {
      navigate('');
    }
  }, [token]);

  const formik = useFormik({
    initialValues: {
      first_name: '',  // Añadido: Campo para el nombre
      last_name: '',   // Añadido: Campo para el apellido
      email: '',
      password: '',
      passwordConfirm: '',
    },
    validateOnChange: false,
    validationSchema: Yup.object().shape({
      first_name: Yup.string().required('Required'),
      last_name: Yup.string().required('Required'), 
      email: Yup.string().email('Invalid email').required('Required'),
      password: Yup.string().required('Required'),
      passwordConfirm: Yup.string().required('Required'),
    }),
    onSubmit: async values => {
      if (values.password !== values.passwordConfirm) {
        formik.setFieldError('password', 'Las contraseñas no coinciden');
        formik.setFieldError(
          'passwordConfirm',
          'Las contraseñas no coinciden'
        );
      } else {
        const body = {
          email: values.email,
          password1: values.password,
          password2: values.password,
          first_name: values.first_name,
          last_name: values.last_name,
        };

        const response = await signUp(body);

        if (response.email)
          formik.setFieldError('email', response.email)
        else if (response.password1)
          formik.setFieldError('password', response.password1)
        else if (response.password2) 
          formik.setFieldError('passwordConfirm', response.password2)
        else if (response.detail)
          openModal();
      }
    },
  });

  return (
    <>
      <Helmet>
        <title>TBAP: Sign Up</title>
      </Helmet>

      <section className="d-flex flex-column justify-content-center align-items-center gap-5">
        <AuthCard onSubmit={formik.handleSubmit}>
          <h1 className="text-1 fw-medium mb-2 ">Sign up</h1>

          <FormControl isInvalid={!!formik.errors.email}>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              type="email"
              placeholder="someone@email.com"
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

          <FormControl isInvalid={!!formik.errors.passwordConfirm}>
            <FormLabel>Password Confirm</FormLabel>
            <Input
              type="password"
              name="passwordConfirm"
              placeholder="********"
              value={formik.values.passwordConfirm}
              onChange={formik.handleChange}
              autoComplete="new-password"
            />
            <FormErrorMessage>{formik.errors.passwordConfirm}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!formik.errors.first_name}>
            <FormLabel>First Name</FormLabel>
            <Input
              name="first_name"
              type="text"
              placeholder="John"
              value={formik.values.first_name}
              onChange={formik.handleChange}
            />
            <FormErrorMessage>{formik.errors.first_name}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!formik.errors.last_name}>
            <FormLabel>Last Name</FormLabel>
            <Input
              name="last_name"
              type="text"
              placeholder="Doe"
              value={formik.values.last_name}
              onChange={formik.handleChange}
            />
            <FormErrorMessage>{formik.errors.last_name}</FormErrorMessage>
          </FormControl>

          <h5 className="text-5 m-1">
            Already have an account?{' '}
            <Link className="fw-bold" to="/login">
              Sign in
            </Link>
          </h5>

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
              <span>Sign up</span>
            )}
          </button>
        </AuthCard>
      </section>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Validación de correo electrónico</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Se te ha enviado un correo electrónico a {formik.values.email} para validarte.
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={closeModal}>
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SignUp;
