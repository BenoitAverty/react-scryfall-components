import React from 'react';
import { render } from 'react-testing-library';

import LoadingIndicator from './LoadingIndicator';

test('basic snapshot', () => {
  const { container } = render(<LoadingIndicator />);

  expect(container.firstChild).toMatchSnapshot();
});

test('width / height snapshot', () => {
  const { container } = render(<LoadingIndicator width={120} height={40} />);

  expect(container.firstChild).toMatchSnapshot();
});
