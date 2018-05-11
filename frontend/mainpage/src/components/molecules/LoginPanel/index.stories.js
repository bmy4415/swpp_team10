import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { LoginPanel } from 'components'

storiesOf('LoginPanel', module)
  .add('default', () => (
    <LoginPanel>Hello</LoginPanel>
  ))
  .add('reverse', () => (
    <LoginPanel reverse>Hello</LoginPanel>
  ))
