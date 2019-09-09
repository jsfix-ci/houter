import React from 'react';

import { storiesOf } from '@storybook/react';
import CodeSandBox from './CodeSandBox';

storiesOf('Router|BrowserRouter', module).add(
  'usage',
  () => (
    <CodeSandBox
      src="https://codesandbox.io/embed/browserrouter-0diom?fontsize=14"
      title="BrowserRouter"
    />
  ),
  {
    notes:
      'A `<Router>` that uses the HTML5 history  API (pushState, replaceState and the popstate event) to keep your UI in sync with the URL.'
  }
);
