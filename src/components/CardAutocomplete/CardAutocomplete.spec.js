// Import all that is needed for testing
import React from 'react';
import { render, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';

import { loadAndApplyFixtures, saveFixtures } from '../../../tests/axiosMocking';

// Import the component under test
import CardAutocomplete from '.';

describe('CardAutocomplete component', () => {
  // Setup mocking of axios requests.
  let fixtures;
  beforeAll(async () => {
    fixtures = await loadAndApplyFixtures('./src/components/CardAutocomplete');
  });
  afterAll(() => {
    saveFixtures('./src/components/CardAutocomplete', fixtures);
  });

  beforeEach(() => {
    cleanup();
  });

  test('snapshot', async () => {
    const { container } = render(<CardAutocomplete />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
