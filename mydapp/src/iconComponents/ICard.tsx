import { SVGProps } from 'react'
const SvgICard = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#I-CARD_svg__a)" fill="currentColor">
      <path d="M33 16.5a1.5 1.5 0 0 1 1.5-1.5h6a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5v-3Z" />
      <path d="M6 6a6 6 0 0 0-6 6v24a6 6 0 0 0 6 6h36a6 6 0 0 0 6-6V12a6 6 0 0 0-6-6H6Zm39 6v15H3V12a3 3 0 0 1 3-3h36a3 3 0 0 1 3 3Zm-3 27H6a3 3 0 0 1-3-3v-3h42v3a3 3 0 0 1-3 3Z" />
    </g>
    <defs>
      <clipPath id="I-CARD_svg__a">
        <path fill="#fff" d="M0 0h48v48H0z" />
      </clipPath>
    </defs>
  </svg>
)
export default SvgICard
