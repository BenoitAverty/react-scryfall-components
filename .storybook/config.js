import { configure, addDecorator } from '@storybook/react';

import { withInfo } from '@storybook/addon-info';

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /.stories.js$/);

const infoAddonOptions = {
  inline: true,
  styles: {
    infoBody: {
      border: '0px',
    },
    infoStory: {
      textAlign: 'center',
      background: "#eee",
      margin: "0px 40px 40px",
      padding: "20px 0"
    }
  }
}
addDecorator((storyFn, context) => withInfo(infoAddonOptions)(storyFn)(context))

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
