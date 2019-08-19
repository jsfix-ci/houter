import { addParameters,configure } from '@storybook/react';


addParameters({
  options:{
    showPanel:false
  }
})
// automatically import all files ending in *.js

const req = require.context('../stories', true, /\.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
