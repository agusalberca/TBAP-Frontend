import { SVGProps } from 'react'
import classNames from 'classnames'

const LoadingDots = ({ className, ...restProps }: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classNames('LoadingDots', className)}
      {...restProps}
    >
      <path
        className="LoadingDots__1"
        d="M6.25 10C6.25 9.30964 5.69036 8.75 5 8.75C4.30964 8.75 3.75 9.30964 3.75 10C3.75 10.6904 4.30964 11.25 5 11.25C5.69036 11.25 6.25 10.6904 6.25 10Z"
        fill="currentColor"
      />
      <path
        className="LoadingDots__2"
        d="M11.25 10C11.25 9.30964 10.6904 8.75 10 8.75C9.30964 8.75 8.75 9.30964 8.75 10C8.75 10.6904 9.30964 11.25 10 11.25C10.6904 11.25 11.25 10.6904 11.25 10Z"
        fill="currentColor"
      />
      <path
        className="LoadingDots__3"
        d="M16.25 10C16.25 9.30964 15.6904 8.75 15 8.75C14.3096 8.75 13.75 9.30964 13.75 10C13.75 10.6904 14.3096 11.25 15 11.25C15.6904 11.25 16.25 10.6904 16.25 10Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default LoadingDots
