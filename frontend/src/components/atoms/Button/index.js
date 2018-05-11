import { PropTypes } from 'react'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'

const Button = styled.span`
  font-family: ${font('primary')};
  color: ${palette({ grayscale: 0 }, 1)};
`

Button.propTypes = {
  palette: PropTypes.string,
  reverse: PropTypes.bool,
}

Button.defaultProps = {
  palette: 'grayscale',
}

export default Button
