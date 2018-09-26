// Import all that is needed for testing
import React from 'react';
import { render, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';

// Import the component under test
import CardAutocomplete from '.';

describe('CardAutocomplete component', () => {
  beforeEach(() => {
    cleanup();
  });

  test('snapshot', async () => {
    const { container } = render(<CardAutocomplete />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
