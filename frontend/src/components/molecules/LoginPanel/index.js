import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
import Button from '../../../components/atoms/Button'

const Wrapper = styled.div`
  font-family: ${font('primary')};
  color: ${palette('grayscale', 0)};
`

const LoginPanel = ({ statefunction, onSignin, onCustomerSignup, onStoreSignup }) => {
  let input_username;
  let input_password;

  const onSigninPost = () => {
    onSignin(input_username.value, input_password.value);
  };
  const onStoreSignupPost = () => {
    onStoreSignup()
  };
  const onCustomerSignupPost = () => {
    onCustomerSignup()
  };

  return (
    //TODO: more beautiful
    <div>
      <li>account</li>
      <ul><input ref={node => {input_username = node;}} /></ul>
      <li>password</li>
      <ul><input ref={node => {input_password = node;}} /></ul>
      <Button onClick={onSigninPost}>Sign in</Button>
      <Button onClick={onCustomerSignupPost}>Sign up (Customer)</Button>
      <Button onClick={onStoreSignupPost}>Sign up (Store)</Button>
    </div>
  )
}

LoginPanel.propTypes = {
  reverse: PropTypes.bool,
  children: PropTypes.node,
}

export default LoginPanel
