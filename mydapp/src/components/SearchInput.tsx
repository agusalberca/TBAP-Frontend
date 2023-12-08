import { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ArrowDownIcon from '../assets/icons/arrow-down.svg'
import CrossIcon from '../assets/icons/cross.svg'
import ErrorIcon from '../assets/icons/warning-red.svg'
import WarningIcon from '../assets/icons/warning-yellow.svg'
import { FormikErrors } from 'formik'

interface Props {
  label?: string;
  name: string;
  type?: string;
  placeholder?: string;
  value?: number | null;
  search: {
    value: number;
    label: string;
  }[];
  onChange?: (value: string) => void;
  error?: string | string[] | FormikErrors<any> | FormikErrors<any>[];
  warning?: string | string[];
  icon?: any;
  reset?: boolean | string;
  required?: boolean;
  disabled?: boolean;
  disabledPlaceholder?: string;
  buttonLabel?: string;
  buttonIcon?: any;
  buttonOnClick?: () => void;
  button?: JSX.Element;
}

const SearchInput = ({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  search,
  onChange,
  error,
  warning,
  icon,
  reset = false,
  required = false,
  disabled = false,
  disabledPlaceholder = 'No data',
  buttonLabel = '',
  buttonIcon = '',
  buttonOnClick,
  button,
}: Props) => {
  const [firstCharge, setFirstCharge] = useState<boolean>(true)
  const [labelSearched, setLabelSearched] = useState<string>('')
  const [searchList, setSearchList] =
    useState<{ value: number; label: string }[]>(search)
  const [showList, setShowList] = useState<boolean>(false)
  const inputRef = useRef(null)

  // Filter search list
  useEffect(() => {
    if (search) {
      if (labelSearched) {
        const filteredList = search.filter((item) =>
          item.label.toLowerCase().includes(labelSearched.toLowerCase())
        )
        const sortList = filteredList.sort((a, b) =>
          a.label.localeCompare(b.label)
        )

        setSearchList(sortList || [])

        // if(searchList?.length == 0) {
        //   onChange('')
        // }
      } else {
        setSearchList(search)
      }
    }
  }, [labelSearched, search])

  // Set default value
  useEffect(() => {
    if (typeof value === 'number' && searchList?.length > 0 && firstCharge) {
      const item = searchList.find((item) => item.value == value)
      item && setLabelSearched(item.label)
      setFirstCharge(false)
    }
  }, [value, searchList])

  // Handle reset
  useEffect(() => {
    if (reset) {
      setShowList(false)
      setLabelSearched('')
      onChange('')
    }
  }, [reset])

  const handleBlur = (e) => {
    const needClose = inputRef.current.contains(e.relatedTarget) ? false : true

    if (needClose) {
      setTimeout(() => {
        setShowList(false)
      }, 150)
    }
  }

  // Reset on disabled
  // useEffect(() => {
  //   if(disabled) {
  //     setShowList(false)
  //     setSearchList([])
  //     setLabelSearched('')
  //     onChange('')
  //   }
  // }, [disabled])

  const selectSearchValue = (item) => {
    setShowList(false)
    setLabelSearched(`${item.label}`)
    onChange(item.value)
  }

  return (
    <div
      className="w-100 d-flex flex-column align-items-start position-relative gap-1"
      onBlur={handleBlur}
      tabIndex={0}
      ref={inputRef}
    >
      {buttonLabel ? (
        <div className="w-100 d-flex justify-content-between align-items-start gap-2">
          <div className="d-flex align-items-center gap-1">
            {error && (
              <div className="Input__Error-Icon-Container">
                <img className="Input__Error-Icon" src={ErrorIcon} />
              </div>
            )}
            {warning && !error && (
              <div className="Input__Warning-Icon-Container">
                <img className="Input__Warning-Icon" src={WarningIcon} />
              </div>
            )}
            <label htmlFor={name} className="Input__Label text-5 fw-medium">
              {label}
            </label>
          </div>
          <button
            className="Input__Button text-6 fw-light"
            onClick={buttonOnClick}
          >
            <img
              src={buttonIcon}
              alt={buttonLabel}
              title={buttonLabel}
              className="Input__Button-Icon me-1"
            />
            {buttonLabel}
          </button>
        </div>
      ) : (
        <div className="d-flex align-items-center gap-1 w-100">
          {error && (
            <div className="Input__Error-Icon-Container">
              <img className="Input__Error-Icon" src={ErrorIcon} />
            </div>
          )}
          {warning && !error && (
            <div className="Input__Warning-Icon-Container">
              <img className="Input__Warning-Icon" src={WarningIcon} />
            </div>
          )}
          <label htmlFor={name} className="SearchInput__Label text-5 fw-medium">
            {label}
          </label>
          {button ? button : <></>}
        </div>
      )}
      <div className="w-100 position-relative">
        <input
          className={classNames('SearchInput text-6', {
            Selected: showList,
            'SearchInput--Disabled': disabled,
            'SearchInput--With-Icon': icon,
          })}
          type={type}
          name={name}
          placeholder={
            disabled
              ? disabledPlaceholder
              : placeholder
                ? placeholder
                : undefined
          }
          title={
            disabled
              ? disabledPlaceholder
              : placeholder
                ? placeholder
                : undefined
          }
          id={name}
          value={labelSearched}
          onChange={(e) => {
            setLabelSearched(e.target.value)
          }}
          onFocus={() => setShowList(true)}
          required={required}
          disabled={disabled}
          readOnly={disabled}
          autoComplete="nope"
        />

        {icon && <FontAwesomeIcon icon={icon} className="SearchInput__Icon" />}

        {searchList?.length > 0 && !labelSearched && !disabled ? (
          <button
            className={
              showList
                ? 'SearchInput__List-Button--Active'
                : 'SearchInput__List-Button'
            }
            onMouseDown={() => setShowList(!showList)}
          >
            <img
              src={ArrowDownIcon}
              alt="Select an option"
              title="Select an option"
            />
          </button>
        ) : (
          !disabled && (
            <button
              className="SearchInput__List-Button"
              onMouseDown={() => {
                setLabelSearched('')
                onChange('')
              }}
            >
              <img src={CrossIcon} alt="Delete option" title="Delete option" />
            </button>
          )
        )}

        {showList && searchList?.length > 0 && (
          <div className="SearchInput__List">
            {searchList.map((item, index) => (
              <span
                key={`SearchInput__List-${item}-${index}`}
                className={
                  item.label === labelSearched
                    ? 'SearchInput__List-Item--Active'
                    : 'SearchInput__List-Item'
                }
                onClick={() => selectSearchValue(item)}
                tabIndex={0}
              >
                {item.label}
              </span>
            ))}
          </div>
        )}
      </div>

      {error && (
        <span className="Input__Error text-6">
          {/* <FontAwesomeIcon
            icon={faCircleExclamation}
            className="Input__Error-Icon"
          /> */}
          {error as string}
        </span>
      )}

      {warning && !error && (
        <span className="Input__Warning text-6">
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

export default SearchInput
