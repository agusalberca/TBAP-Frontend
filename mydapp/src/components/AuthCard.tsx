import { useEffect, useState, ReactNode } from 'react'
import classNames from 'classnames'

interface Props {
  children: ReactNode;
  totalSteps?: number;
  currentStep?: number;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
}

const AuthCard = ({ children, totalSteps, currentStep, onSubmit }: Props) => {
  const [totalCountArray, setTotalCountArray] = useState([])

  useEffect(() => {
    const array = []
    for (let i = 0; i < totalSteps; i++) {
      array.push(i + 1)
    }
    setTotalCountArray(array)
  }, [totalSteps])

  if (onSubmit)
    return (
      <form onSubmit={onSubmit} className="AuthCard">
        {children}
        {totalSteps && currentStep && (
          <div className="AuthCard__Steps">
            {totalCountArray.map((number) => (
              <div
                key={number}
                className={classNames(
                  'Radio',
                  { Selected: number <= currentStep },
                  { Complete: currentStep > number }
                )}
              ></div>
            ))}
          </div>
        )}
      </form>
    )

  return (
    <div className="AuthCard">
      {children}
      {totalSteps && currentStep && (
        <div className="AuthCard__Steps">
          {totalCountArray.map((number) => (
            <div
              key={number}
              className={classNames(
                'Radio',
                { Selected: number <= currentStep },
                { Complete: currentStep > number }
              )}
            ></div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AuthCard
