import { useState, useEffect } from 'react'
import Input from 'react-phone-number-input/input'
import {
  getCountries,
  getCountryCallingCode,
} from 'react-phone-number-input/input'
import en from 'react-phone-number-input/locale/en.json'
import { CountryCode, E164Number } from 'libphonenumber-js'
import { IAngleUp, IEdit } from '../iconComponents'
import { parsePhoneNumber } from 'react-phone-number-input'
import classNames from 'classnames'


interface Props {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  errors: string;
  disabled?: boolean;
  initialValue?: string;
}

const PhoneNumberInput = ({
  name,
  label,
  value,
  onChange,
  errors,
  disabled,
  initialValue,
  ...restProps
}: Props) => {
  const [countrySelected, setCountrySelected] = useState<CountryCode>('US')
  const [showCountrys, setShowCountrys] = useState(false)
  const [editDisabled, setEditDisabled] = useState(!!initialValue)

  useEffect(() => {
    const phoneNumber = parsePhoneNumber(value)

    if (phoneNumber?.country) setCountrySelected(phoneNumber.country)
  }, [])

  const openShowCountry = () => setShowCountrys(true)
  const closeShowCountry = () => setShowCountrys(false)

  const handleSelectCountry = (country: CountryCode) => {
    setCountrySelected(country)
    onChange('+' + getCountryCallingCode(country))
    closeShowCountry()
  }

  const handlePhoneInput = (value: E164Number) => {
    if (!value) return onChange(value)

    const phoneNumber = parsePhoneNumber(value)

    if (phoneNumber?.country) setCountrySelected(phoneNumber.country)
    else setCountrySelected('US')

    onChange(value)
  }

  const handleEdit = () => setEditDisabled(false)

  return (
    <div className="w-100 d-flex flex-column align-items-start position-relative gap-1">
      <div className="d-flex align-items-center gap-1">
        <label
          htmlFor={name}
          className="Input__Label text-5 fw-medium"
          dangerouslySetInnerHTML={{ __html: label }}
        />
      </div>
      <div className="w-100 d-flex align-items-center gap-1 position-relative">
        <div className="w-100 position-relative">
          {
            <button
              className="PhoneNumberInput__Selector_Container"
              onBlur={closeShowCountry}
            >
              <div
                className="PhoneNumberInput__Selector"
                onClick={openShowCountry}
              >
                <img
                  width={18}
                  height={12}
                  className=""
                  src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${countrySelected}.svg`}
                  alt={en[countrySelected]}
                />
                <IAngleUp className="text-6 rotate_180" />
              </div>
              {showCountrys ? (
                <div className="PhoneNumberInput__Options_Container Scroll">
                  {getCountries()
                    .map((country) => ({
                      country,
                      name: en[country],
                      callingCode: getCountryCallingCode(country),
                    }))
                    .sort((a, b) => {
                      const nameA = a.name.toUpperCase()
                      const nameB = b.name.toUpperCase()
                      if (nameA < nameB) {
                        return -1
                      }
                      if (nameA > nameB) {
                        return 1
                      }
                      return 0
                    })
                    .map(({ country, name, callingCode }) => (
                      <div
                        key={country}
                        className="PhoneNumberInput__Option text-6"
                        onClick={() => handleSelectCountry(country)}
                      >
                        <span>{name}</span>{' '}
                        <span className="text-secondary">+{callingCode}</span>
                      </div>
                    ))}
                  {/* {getCountries().map((country) => (
                    <div
                      key={country}
                      className="PhoneNumberInput__Option"
                      onClick={() => handleSelectCountry(country)}
                    >
                      <span>{en[country]}</span>{' '}
                      <span className="text-secondary">
                        +{getCountryCallingCode(country)}
                      </span>
                    </div>
                  ))} */}
                </div>
              ) : (
                <></>
              )}
            </button>
          }
          <Input
            className={classNames('Input text-6 PhoneNumberInput', { 'Input--Disabled': disabled || editDisabled })}
            placeholder="Enter phone number"
            type="tel"
            value={value}
            onChange={(value) => handlePhoneInput(value)}
            disabled={disabled || editDisabled}
            {...restProps}
          />
        </div>
        {editDisabled ? (
          <button
            className="Input__Edi_Icon"
            type="button"
            onClick={handleEdit}
          >
            <IEdit />
          </button>
        ) : (
          <></>
        )}
      </div>
      {errors ? <span className="Input__Error text-6">{errors}</span> : <></>}
    </div>
  )
}

export default PhoneNumberInput
