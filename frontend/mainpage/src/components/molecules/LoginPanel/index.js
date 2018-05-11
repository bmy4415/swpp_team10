import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
import Button from '../../../components/atoms/Button'

const Wrapper = styled.div`
  font-family: ${font('primary')};
  color: ${palette('grayscale', 0)};
`

const LoginPanel = ({ statefunction, onSignin }) => {
  let input_username;
  let input_password;

  const onSigninPost = () => {
    onSignin(input_username.value, input_password.value);
    input_username.value = '';
    input_password.value = '';
  };

  return (
    //TODO: more beautiful
    <div>
      <li>account</li>
      <ul><input ref={node => {input_username = node;}} /></ul>
      <li>password</li>
      <ul><input ref={node => {input_password = node;}} /></ul>
      <button onClick={onSigninPost}>Sign in</button>
      <br/>
      <a href='http://www.hyperlinkcode.com/button-links.php'><button>Sign up (Customer)</button></a>
      <br/>
      <a href='http://www.hyperlinkcode.com/button-links.php'><button>Sign up (Store)</button></a>
    </div>
  )
}

LoginPanel.propTypes = {
  reverse: PropTypes.bool,
  children: PropTypes.node,
}

export default LoginPanel
