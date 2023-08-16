import { SVGProps } from 'react'
const SvgITick = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M42.75 26.25c-1.5 7.5-7.155 14.562-15.09 16.14a18.75 18.75 0 0 1-17.541-30.996C15.561 5.4 24.75 3.75 32.25 6.75"
      stroke="currentColor"
      strokeWidth={2.813}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="m17.25 23.25 7.5 7.5 18-19.5"
      stroke="currentColor"
      strokeWidth={2.813}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
export default SvgITick
