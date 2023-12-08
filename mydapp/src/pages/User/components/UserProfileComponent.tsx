import { faAddressCard, faBriefcase, faCakeCandles, faLock, faPenToSquare, faPhone, faUser  } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import propTypes from 'prop-types'
import ModalHeader from '../../../components/ModalHeader'
import { useContext, useEffect, useState } from 'react'
import EditPasswordModal from './EditPasswordModal'
import { AppContext } from '../../../context/AppContext'
import Media from '../../../components/Media'
// import { patchUpdateUser } from '../../api/users'
// import useApi from '../../hooks/useApi'
import Input from '../../../components/Input'


const EditUserModal = ({ closeModal }) => {
  const { token, user } = useContext(AppContext)
  const [ userImg, setUserImg ] = useState('')
  const [ professionsNames, setProfessionsNames ] = useState([])
  const [showEditPassword, setShowEditPassword] = useState(false)


  const handleInputImage = (e) => {
    const acceptedImageTypes = ['image/png', 'image/jpg', 'image/jpeg']
    const file = e.target.files[0]

    if(acceptedImageTypes.includes(file['type']) && file.size <= 3145728){
      // Save image in formik
      formik.setFieldValue('image', file)

      // Save the image in the state to show it
      const imageReader = new FileReader()
      imageReader.onload = () => {
        if (imageReader.readyState == 2) {
          setUserImg(imageReader.result.toString())
        }
      }
      if (file) {
        imageReader.readAsDataURL(file)
      }
    }
  }

  const formik = useFormik({
    initialValues: {
      first_name: user.first_name,
      last_name: user.last_name,
      birthdate: user.profile.birthdate,
      profile_image: '',
    },
    validateOnChange: false,
    validationSchema: Yup.object({
      first_name: Yup.string().required('Su nombre es requerido').max(60, 'Máximo de caracteres: 60'),
      last_name: Yup.string().required('Su apellido es requerido').max(60, 'Máximo de caracteres: 60'),
      dni: Yup.number('Solo se permite números').required('Su DNI es requrido').positive('Ingrese un DNI valido').integer('Ingrese un DNI valido, sin puntos ni comas').min(1000000, 'DNI invalido').max(100000000, 'DNI invalido'),
      birthdate: Yup.date().required('Su fecha de cumpleaños es requerida').max(new Date(), 'La fecha de cumpleaños no puede ser mayor a la actual'),
      profession: Yup.string().min(3, 'Mínimo caracteres: 3').max(50, 'Máximo de caracteres: 50'),
      other_profession: Yup.string().min(3, 'Mínimo caracteres: 3').max(50, 'Máximo de caracteres: 50'),
    }),
    onSubmit: async (data) => {
      const fixedProfessionData = {...data}

      const formFiltered = Object.entries(fixedProfessionData).reduce((a,[k,v]) => (v ? (a[k]=v, a) : a), {})

      const formdata = new FormData()
      Object.keys(formFiltered).forEach(value => {
        formdata.append(value, formFiltered[value])
      })
      if(formFiltered.image) {
        formdata.append('image', formFiltered.image, 'profile-image.png')
      }

      // const response = await patchUpdateUser(token, formdata)

      // if (response.error) {
      //   // console.error(response.error)
      //   return
      // }
      // if( response.user ) {
      //   closeModal()
      // }
    }
  })

  const toggleShowEditPassword = () => {
    setShowEditPassword(prev => !prev)
  }

  return (
    <>
      <div className="PanelModal px-3" onClick={closeModal}>
        <form className="PanelModal__Card--Medium" onClick={(e) => e.stopPropagation()}>
          <ModalHeader title={'Editá tu información'} closeModal={closeModal} />
          <div className='d-flex flex-column gap-3 my-4'>
            <span className='text-4 fw-bold text-center'>
              Actualizá tus datos cuando sea necesario
            </span>

            <div className='d-flex flex-column justify-content-center align-items-center'>
              <div className="PanelMenu__User-Image-Container--Medium text-1" >
                {userImg.length !== 0
                  ? <img src={userImg} alt='Imagen nueva' title='Imagen nueva' className='PanelMenu__User-Image--Medium' />
                  : user?.profile?.image && (
                    <Media type='image' className='PanelMenu__User-Image--Medium' src={user?.profile?.image ?? ''} alt='imagen de usuario' />
                  )
                }
                <FontAwesomeIcon icon={faUser}/>
                <div className="PanelMenu__User-Image-Edit">
                  <label htmlFor='image' onChange={handleInputImage}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                    <input
                      id='image'
                      name='image'
                      type="file"
                      accept="image/png, image/jpg, image/jpeg"
                      className='d-none'
                    />
                  </label>
                </div>
              </div>
              <span className='text-5'>Max. 3MB</span>
            </div>

            <div className='PanelModal__Inputs-Container'>
              <Input
                label={'Nombre'}
                name='first_name'
                type='text'
                value={formik.values.first_name}
                onChange={formik.handleChange}
                error={formik.errors.first_name}
                icon={faUser}
              />
              <Input
                label={'Apellido'}
                name='last_name'
                type='text'
                value={formik.values.last_name}
                onChange={formik.handleChange}
                error={formik.errors.last_name}
                icon={faUser}
              />
            </div>

            <div className='PanelModal__Inputs-Container'>
              <Input
                label='DNI'
                name='dni'
                type='number'
                value={formik.values.dni}
                onChange={formik.handleChange}
                error={formik.errors.dni}
                icon={faAddressCard}
              />
            </div>

            <div className='PanelModal__Inputs-Container'>
              <Input
                label='Cumpleaños'
                name='birthdate'
                type='date'
                value={formik.values.birthdate}
                onChange={formik.handleChange}
                error={formik.errors.birthdate}
                icon={faCakeCandles}
              />
              <Input
                label='Profesión/Rubro'
                name='profession'
                type='select'
                value={formik.values.profession}
                list={professionsNames}
                onChange={formik.setFieldValue}
                error={formik.errors.profession}
                icon={faBriefcase}
              />
            </div>

            {formik.values.profession.toLowerCase() === 'otros' ? (
              <Input
                label="¿A qué te dedicás?"
                name="other_profession"
                type="text"
                value={formik.values.other_profession}
                onChange={formik.handleChange}
                error={formik.errors.other_profession}
                icon={faBriefcase}
              />
            ) : (
              <></>
            )}

            <div className="w-100 d-flex flex-column align-items-start position-relative">
              <label htmlFor='password' className="text-3 fw-normal">Contraseña</label>
              <div className="w-100 position-relative">
                <input
                  className={'Input--Disabled text-3'}
                  type='text'
                  value='**********'
                  disabled
                />
                <FontAwesomeIcon icon={ faLock } className="Input__Icon-Disabled" style={{ position: 'absolute', top: 'calc(50% - 10px)', left: '10px' }}/>
              </div>
            </div>

            <div className='d-flex justify-content-center'>
              <button
                type="button"
                className='text-5 text-center p-2'
                onClick={toggleShowEditPassword}
              >
              ¿Cambiar contraseña?
              </button>
            </div>
          </div>

          <div className="d-flex justify-content-center">
            <button className='button-green-panel' type="submit">Actualizar datos</button>
            {/* <button className='button-green-panel' type="submit" onClick={formik.handleSubmit}>Actualizar datos</button> */}
          </div>
        </form>
      </div>

      {showEditPassword &&
        <EditPasswordModal closeModal={toggleShowEditPassword} />
      }
    </>
  )
}

EditUserModal.propTypes = {
  closeModal: propTypes.func.isRequired
}

export default EditUserModal