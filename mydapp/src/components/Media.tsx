import PropTypes from 'prop-types'
import { URL } from '../constants/index'

const Media = ({type, src, alt, ...restProps}) => {

  if (type === 'image') return (
    <img
      src={src ? `${URL}${src}` : ''}
      alt={alt}
      title={alt}
      loading='lazy'
      {...restProps}
    />
  )

  if (type === 'video') return (
    <video
      src={src ? `${URL}${src}` : ''}
      title={alt}
      {...restProps}
    />
  )
}

Media.propTypes = {
  type: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired
}

export default Media