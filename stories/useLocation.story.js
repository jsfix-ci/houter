import React from 'react';
import { storiesOf } from '@storybook/react';
import CodeSandBox from './CodeSandBox';

storiesOf('Hook|useLocation', module).add(
  'usage',
  () => (
    <CodeSandBox
      src="https://codesandbox.io/embed/uselocation-dxkw2?fontsize=14"
      title="useLocation"
    />
  ),
  {
    notes:
      'You can get access to the location object’s properties and performing a navigation via the **useLocation** hook.'
  }
);
