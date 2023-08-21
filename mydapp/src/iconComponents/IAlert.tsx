import { SVGProps } from 'react'
const SvgIAlert = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g
      clipPath="url(#I-ALERT_svg__a)"
      fillRule="evenodd"
      clipRule="evenodd"
      fill="currentColor"
    >
      <path d="M24 15.408c1.095 0 1.983.888 1.983 1.983v11.015a1.983 1.983 0 0 1-3.966 0V17.391c0-1.095.888-1.983 1.983-1.983Zm0 18.726c1.095 0 1.983.888 1.983 1.983v1.101a1.983 1.983 0 0 1-3.966 0v-1.101c0-1.095.888-1.983 1.983-1.983Z" />
      <path d="M25.871 5.185c-.833-1.643-2.902-1.645-3.738 0L4.289 40.276a2.072 2.072 0 0 1-.039.08c-.94 1.847.428 3.692 1.868 3.692H41.88c1.44 0 2.81-1.844 1.873-3.694L25.871 5.185ZM.668 38.653a1.98 1.98 0 0 1 .046-.096L18.597 3.39c2.305-4.535 8.506-4.538 10.81 0m0 0L47.29 38.56c2.063 4.072-.56 9.453-5.41 9.453H6.118c-4.81 0-7.434-5.297-5.45-9.36" />
    </g>
    <defs>
      <clipPath id="I-ALERT_svg__a">
        <path fill="#fff" d="M0 0h48v48H0z" />
      </clipPath>
    </defs>
  </svg>
)
export default SvgIAlert
