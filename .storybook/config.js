import { addParameters,configure } from '@storybook/react';

// automatically import all files ending in *.stories.js

addParameters({
  options:{
    showPanel:false
  }
})
const req = require.context('../stories', true, /\.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
