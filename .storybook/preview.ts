import type { Preview } from '@storybook/react';
import '../src/index.css';
import '../src/assets/styles/_themes.scss';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;