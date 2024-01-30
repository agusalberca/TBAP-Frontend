
import { faVenusMars, faLock, faPenToSquare, faUser  } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import propTypes from 'prop-types'
import ModalHeader from '../../../components/ModalHeader'
import { useContext, useState } from 'react'
import EditPasswordModal from './EditPasswordModal'
import { AppContext } from '../../../context/AppContext'
import Media from '../../../components/Media'
import Input from '../../../components/Input'
import { Badge, Select } from '@chakra-ui/react'
import { updateUserProfile } from '../../../api/auth';
import { useTranslation } from 'react-i18next';


const EditUserModal = ({ closeModal }) => {
  const { t } = useTranslation('UserProfile');
  const { token, user } = useContext(AppContext);
  const [userImg, setUserImg] = useState('');
  const [showEditPassword, setShowEditPassword] = useState(false);

  const sexOptions = [
    { value: 'Masculino', label: t('Male') },
    { value: 'Femenino', label: t('Female') },
    { value: 'Otro', label: t('Others') },
    { value: 'Prefiero no decirlo', label: t('Prefer not to say') },
  ];


  const handleInputImage = (e) => {
    const acceptedImageTypes = ['image/png', 'image/jpg', 'image/jpeg']
    const file = e.target.files[0]

    if(acceptedImageTypes.includes(file['type']) && file.size <= 3145728){
      // Save image in formik
      formik.setFieldValue('profile_image', file)

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
      birthdate: user.birthdate ? new Date(user.birthdate) : undefined,
      sex: user.sex || t('Male'),
      profile_image: '',
    },
    validateOnChange: false,
    validationSchema: Yup.object({
      first_name: Yup.string().required(t('Your name is required')).max(60, t('Maximum characters: 60')),
      last_name: Yup.string().required(t('Your last name is required')).max(60, t('Maximum characters: 60')),
      birthdate: Yup.date().required(t('Your birthdate is required')).max(new Date(), t('You cannot be born in the future')),
      profile_image: Yup.mixed().test('fileSize', t('The image cannot weigh more than 3MB'), (value) => {
        if(value) {
          return value.size <= 3145728
        }
        return true
      })
    }),
    onSubmit: async (data) => {
      const formdata = new FormData();
      Object.keys({ ...data }).forEach((value) => {
        if (value === 'profile_image' && { ...data }.profile_image) {
          const file = new Blob([{ ...data }.profile_image], { type: 'image/png' });
          formdata.append(value, file, 'profile-image.png');
          
        } else if (value === 'birthdate' && { ...data }.birthdate){
          formdata.append(value, { ...data }.birthdate.toISOString().split('T')[0]);
        } else {
          formdata.append(value, { ...data }[value] as string);
        }
      });

      const response = await updateUserProfile(token, formdata)

      if (response.error) {
        console.error(response.error)
        return
      }
      if( response.user ) {
        closeModal()
      }
    }
  })

  const toggleShowEditPassword = () => {
    setShowEditPassword(prev => !prev)
  }

  function getUserType() {
    if (user.user_type === 'user_admin') {
      return t('Admin')
    } else if (user.user_type === 'regular_user') {
      return t('Regular user')
    } else if (user.user_type === 'organization') {
      return t('Organization')
    }
  }

  return (
    <>
      <div className="PanelModal px-3" onClick={closeModal}>
        <form className="PanelModal__Card--Medium" onClick={(e) => e.stopPropagation()}>
          <ModalHeader title={t('Edit your information')} closeModal={closeModal} />
          <div className='d-flex flex-column gap-3 my-4'>
            <span className='text-4 fw-bold text-center'>
              {t('Your profile')}
            </span>

            <div className='d-flex flex-column justify-content-center align-items-center'>
              <div className="PanelMenu__User-Image-Container--Medium text-1" >
                {userImg.length !== 0
                  ? <img src={userImg} alt='New image' title='New image' className='PanelMenu__User-Image--Medium' />
                  : user?.profile_image && (
                    <Media type='image' className='PanelMenu__User-Image--Medium' src={user?.profile_image ?? ''} alt='user image' />
                  )
                }
                <FontAwesomeIcon icon={faUser}/>
                <div className="PanelMenu__User-Image-Edit" style={{ cursor: 'pointer' }}>
                  <label htmlFor='image' onChange={handleInputImage}>
                    <FontAwesomeIcon icon={faPenToSquare} style={{ cursor: 'pointer' }} />
                    <input
                      id='image'
                      name='profile_image'
                      type="file"
                      accept="image/png, image/jpg, image/jpeg"
                      className='d-none'
                    />
                  </label>
                </div>
              </div>
              <span className='text-5'>Max. 3MB</span>
            </div>
              
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Badge className="text-center d-inline-block">{getUserType()}</Badge>
            </div>
              

            <div className='PanelModal__Inputs-Container'>
              <Input
                label={t('First name')}
                name='first_name'
                type='text'
                value={formik.values.first_name}
                onChange={formik.handleChange}
                error={formik.errors.first_name}
                icon={faUser}
              />
              <Input
                label={t('Last name')}
                name='last_name'
                type='text'
                value={formik.values.last_name}
                onChange={formik.handleChange}
                error={formik.errors.last_name}
                icon={faUser}
              />
            </div>

            <div className='PanelModal__Input-Container'>
                <label htmlFor='Birthdate' className='Input__Label text-5 fw-medium'>
                  {t('Birthdate')}
                </label>
                
                <SingleDatepicker
                  name="date-input"
                  date={formik.values.birthdate}
                  onDateChange={(date) => formik.setFieldValue('birthdate', date)}
                  maxDate={new Date()}
                  propsConfigs={{
                    inputProps: {
                      size: "sm"
                    }
                  }}
                />

              <div className='PanelModal__Input-Container'>
                <label htmlFor='sex' className='Input__Label text-5 fw-medium'>
                  {t("Sex")}
                </label>
                <Select
                  id='sex'
                  name='sex'
                  value={formik.values.sex}
                  onChange={(e) => formik.setFieldValue('sex', e.target.value)}
                  size="sm"
                >
                  {sexOptions.map((option) => (
                    <option key={option.value} value={option.value}> 
                      <FontAwesomeIcon icon={faVenusMars} style={{ marginRight: '5px' }} />
                      {option.label}
                    </option>
                  ))}


                </Select>
              </div>
                
            </div>

            <div className="w-100 d-flex flex-column align-items-start position-relative">
              <label htmlFor='password' className="text-3 fw-normal">
                {t('Password')}
              </label>
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
                {t('Change password?')}
              </button>
            </div>
          </div>

          <div className="d-flex justify-content-center">
          <button
            type="button" 
            className='button-green-panel'
            onClick={() => {
              formik.submitForm() 
            }}
          >
            {t('Update data')}
          </button>
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
