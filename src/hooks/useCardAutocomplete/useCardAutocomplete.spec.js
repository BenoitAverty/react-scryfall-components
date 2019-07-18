// Import all that is needed for testing
import React from 'react';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import {
  loadAndApplyFixtures,
  saveFixtures,
} from '../../../tests/axiosMocking';
// Import the hook under test

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
});
