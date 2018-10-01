import React from 'react';
import { render } from 'react-testing-library';

import LoadingIndicator from './LoadingIndicator';

test('snapshot', () => {
  const { container } = render(<LoadingIndicator />);

  expect(container.firstChild).toMatchSnapshot();
});
