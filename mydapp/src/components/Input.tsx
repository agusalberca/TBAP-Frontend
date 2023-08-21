import { useState, memo, useEffect, useRef, isValidElement } from 'react'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import useAppContext from '../hooks/useAppContext'
import ShowPasswordIcon from '../assets/icons/show-password.svg'
import HidePasswordIcon from '../assets/icons/hide-password.svg'
import ErrorIcon from '../assets/icons/warning-red.svg'
import WarningIcon from '../assets/icons/warning-yellow.svg'
import ArrowDownIcon from '../assets/icons/arrow-down.svg'
import { IEdit } from '../iconComponents'

interface Props {
  label?: string;
  rightLabel?: string;
  name: string;
  type?: string;
  placeholder?: string;
  value?: any;
  list?: {
    label: string;
    value: string;
  }[];
  search?: any;
  onChange?: any;
  onMouseDown?: any;
  error?: string | any;
  warning?: string | any;
  tip?: string;
  icon?: JSX.Element | any;
  disabled?: boolean;
  required?: boolean;
  min?: number;
  maxLength?: number;
  small?: boolean;
  autoComplete?: string;
  inputMode?:
    | 'text'
    | 'search'
    | 'email'
    | 'tel'
    | 'url'
    | 'none'
    | 'numeric'
    | 'decimal';
  initialValue?: string;
  containerProps?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >;
}

const Input = ({
  label,
  rightLabel,
  name,
  type = 'text',
  placeholder,
  value,
  list,
  onChange,
  onMouseDown,
  error,
  warning,
  tip,
  icon,
  disabled,
  required = false,
  min,
  maxLength,
  small,
  autoComplete = 'off',
  inputMode = 'text',
  initialValue = '',
  containerProps: { className: containerClassName, ...containerRestProps } = {},
}: Props) => {
  const listRef = useRef(null)
  const inputRef = useRef(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showList, setShowList] = useState(false)
  const [selectedValue, setSelectedValue] = useState<{
    label: string;
    value: string;
  }>(value)
  const [editDisabled, setEditDisabled] = useState(!!initialValue)

  useEffect(() => {
    if (typeof value === 'string') return
    setSelectedValue(value)
  }, [value])

  useEffect(() => {
    if (disabled) {
      setShowList(false)
      // setSelectedValue({
      //   label: '',
      //   value: ''
      // })
    }
  }, [disabled])

  useEffect(() => {
    if (inputRef.current) {
      if (showList) {
        setTimeout(() => {
          inputRef.current.focus()
        }, 200)
      }
    }
  }, [showList])

  const handleBlur = (e) => {
    // const isMobile = window.matchMedia('(max-width: 768px)').matches
    const needClose = inputRef.current?.contains(e.relatedTarget)
      ? false
      : true

    if (needClose) {
      setTimeout(() => {
        setShowList(false)
      }, 150)
    }
  }

  const toogleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const selectValue = (value) => {
    setShowList(false)
    setSelectedValue(value)
    onChange(name, value)
  }

  const normalizeNumber = (value) => {
    if (value && type === 'number') {
      const parts = value?.toString()?.split('.')
      parts[0] = parts[0]?.replaceAll(',', '')
      parts[0] = parts[0]?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      return parts?.join('.')
    } else {
      return value
    }
  }

  const handleEdit = () => setEditDisabled(false)

  const handleTypeText: React.ChangeEventHandler<HTMLInputElement> = (e) => { 
    if(!list && type === 'text')
      e.target.value = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)

    onChange(e)
  }

  if (list)
    return (
      <div className="w-100 d-flex flex-column align-items-start gap-1 position-relative">
        <div className="w-100 d-flex flex-column align-items-start gap-1 position-relative">
          <div
            className={classNames('d-flex align-items-center gap-1', {
              'w-100 justify-content-center position-relative': small,
            })}
          >
            {error && (
              <div
                className={classNames('Input__Error-Icon-Container', {
                  'Input__Error-Icon-Container--Small': small,
                })}
              >
                <img
                  className={classNames('Input__Error-Icon', {
                    'Input__Error-Icon--Small': small,
                  })}
                  src={ErrorIcon}
                />
              </div>
            )}
            {warning && !error && (
              <div
                className={classNames('Input__Warning-Icon-Container', {
                  'Input__Warning-Icon-Container--Small': small,
                })}
              >
                <img
                  className={classNames('Input__Warning-Icon', {
                    'Input__Warning-Icon--Small': small,
                  })}
                  src={WarningIcon}
                />
              </div>
            )}
            <label
              htmlFor={name}
              className={classNames('Input__Label text-5 fw-medium', {
                'text-6': small,
              })}
            >
              {label}
            </label>
          </div>
          <div
            className={classNames('Input__List-Container text-6', {
              'Input__List-Container--Disabled': disabled,
              Selected: showList,
            })}
            ref={listRef}
            onClick={() => !disabled && setShowList(!showList)}
            onBlur={handleBlur}
            tabIndex={0}
          >
            {selectedValue?.label || (
              <span className="Input__Placeholder">{placeholder}</span>
            )}
          </div>
          {icon ? (
            isValidElement(icon) ? (
              icon
            ) : (
              <FontAwesomeIcon icon={icon} className="Input__Icon" />
            )
          ) : (
            <></>
          )}

          {!disabled && (
            <button
              className={classNames('Input__List-Button', {
                'Input__List-Button--Active': showList,
              })}
              type="button"
              onClick={() => setShowList(!showList)}
            >
              <img
                src={ArrowDownIcon}
                alt="Select an option"
                title="Select an option"
              />
            </button>
          )}

          {showList && (
            <div className="Input__List">
              {list.map((item, index) => (
                <span
                  key={`Input__List-${item}-${index}`}
                  className={
                    item?.label === selectedValue?.label
                      ? 'Input__List-Item--Active'
                      : 'Input__List-Item'
                  }
                  onClick={() => selectValue(item)}
                >
                  {item.label}
                </span>
              ))}
            </div>
          )}
        </div>

        {error && (
          <span
            className={classNames('Input__Error text-6', {
              'Input__Error--Small': small,
            })}
          >
            {/* <FontAwesomeIcon
          icon={faCircleExclamation}
          className="Input__Error-Icon"
        /> */}
            {error}
          </span>
        )}

        {warning && !error && !small && (
          <span
            className={classNames('Input__Warning text-6', {
              'Input__Warning--Small': small,
            })}
          >
            {/* <FontAwesomeIcon
            icon={faCircleExclamation}
            className="Input__Warning-Icon"
          /> */}
            {warning}
          </span>
        )}
      </div>
    )

  return (
    <div
      className={classNames(
        'w-100 d-flex flex-column align-items-start position-relative gap-1',
        { 'align-items-center': small },
        containerClassName
      )}
      {...containerRestProps}
    >
      {name == 'client' ? (
        <div className="w-100 d-flex justify-content-between align-items-center">
          <label htmlFor={name} className="Input__Label text-5 fw-medium">
            {label}
          </label>
          <button
            className="Input__Client-Button text-6"
            type="button"
          >
            <FontAwesomeIcon
              icon={faPlus}
              className="Input__Client-Icon me-1"
              size="xs"
            />
            Add new
          </button>
        </div>
      ) : (
        <div
          className={classNames('d-flex align-items-center gap-1', {
            'w-100 justify-content-center position-relative': small,
          })}
        >
          {error && (
            <div
              className={classNames('Input__Error-Icon-Container', {
                'Input__Error-Icon-Container--Small': small,
              })}
            >
              <img
                className={classNames('Input__Error-Icon', {
                  'Input__Error-Icon--Small': small,
                })}
                src={ErrorIcon}
              />
            </div>
          )}
          {warning && !error && (
            <div
              className={classNames('Input__Warning-Icon-Container', {
                'Input__Warning-Icon-Container--Small': small,
              })}
            >
              <img
                className={classNames('Input__Warning-Icon', {
                  'Input__Warning-Icon--Small': small,
                })}
                src={WarningIcon}
              />
            </div>
          )}
          <label
            htmlFor={name}
            className={classNames('Input__Label text-5 fw-medium', {
              'text-6': small,
            })}
            dangerouslySetInnerHTML={{ __html: label }}
          />
        </div>
      )}
      <div className="w-100 d-flex align-items-center gap-1 position-relative">
        <div className="w-100 position-relative">
          <input
            className={classNames(
              'Input text-6',
              { 'Input--With-Icon': icon },
              { 'Input--Small': small },
              { 'Input--Disabled': (disabled && !small) || editDisabled },
              { 'Input--Disabled-Small': disabled && small }
            )}
            ref={inputRef}
            type={type == 'password' ? (showPassword ? 'text' : type) : 'text'}
            name={name}
            placeholder={placeholder}
            id={name}
            value={
              normalizeNumber(value) === 0 ? 0 : normalizeNumber(value) || ''
            }
            min={min}
            onChange={(e) => handleTypeText(e)}
            onMouseDown={onMouseDown}
            onFocus={() => {
              if (value === 0 || value === '0') {
                inputRef.current.value = ''
              }
            }}
            onBlur={() => {
              if (inputRef.current.value === '' && type === 'number') {
                inputRef.current.value = 0
              }
            }}
            required={required}
            disabled={disabled || editDisabled}
            readOnly={disabled}
            maxLength={maxLength}
            autoComplete={autoComplete}
            inputMode={inputMode}
            autoCapitalize={type === 'text' ? 'on' : null}
          />
          <div className="Input__Detail"></div>
        </div>
        {rightLabel ? (
          <span className="text-6 text-secondary">{rightLabel}</span>
        ) : (
          <></>
        )}

        {icon ? (
          isValidElement(icon) ? (
            icon
          ) : (
            <FontAwesomeIcon icon={icon} className="Input__Icon" />
          )
        ) : (
          <></>
        )}

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

        {type === 'password' ? (
          <button
            className="Input__Password-Icon"
            type="button"
            onClick={toogleShowPassword}
          >
            {showPassword ? (
              <img
                src={HidePasswordIcon}
                alt="Hide password"
                title="Hide password"
              />
            ) : (
              <img
                src={ShowPasswordIcon}
                alt="Show password"
                title="Show password"
              />
            )}
          </button>
        ) : (
          <></>
        )}
      </div>

      {tip && !error && (
        <div className="Input__Tip" dangerouslySetInnerHTML={{ __html: tip }} />
      )}

      {error && !small && (
        <span
          className={classNames('Input__Error text-6', {
            'Input__Error--Small': small,
          })}
        >
          {/* <FontAwesomeIcon
            icon={faCircleExclamation}
            className="Input__Error-Icon"
          /> */}
          {error}
        </span>
      )}

      {warning && !error && !small && (
        <span
          className={classNames('Input__Warning text-6', {
            'Input__Warning--Small': small,
          })}
        >
          {/* <FontAwesomeIcon
            icon={faCircleExclamation}
            className="Input__Warning-Icon"
          /> */}
          {warning}
        </span>
      )}
    </div>
  )
}

export default memo(Input)
