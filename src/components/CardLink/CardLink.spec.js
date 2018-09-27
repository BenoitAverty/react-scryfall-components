// Import all that is needed for testing
import React from 'react';
import { render, cleanup, wait } from 'react-testing-library';
import 'jest-dom/extend-expect';

import { loadAndApplyFixtures, saveFixtures } from '../../../tests/axiosMocking';

// Import the component under test
import CardLink from '.';

describe('CardLink component', () => {
  // Setup mocking of axios requests.
  let fixtures;
  beforeAll(async () => {
    fixtures = await loadAndApplyFixtures('./src/components/CardLink');
  });
  afterAll(() => {
    saveFixtures('./src/components/CardLink', fixtures);
  });

  beforeEach(() => {
    cleanup();
  });

  describe('With card name', () => {
    test('snapshot', () => {
      const { container } = render(<CardLink>Reveillark</CardLink>);

      expect(container.firstChild).toMatchSnapshot();
    });

    it('renders a link to the scryfall search', () => {
      // Crucible of worlds
      const { container } = render(<CardLink>Black Lotus</CardLink>);

      expect(container.querySelectorAll('a')).toHaveLength(1);
      expect(container.querySelector('a')).toHaveAttribute('href', 'https://scryfall.com/search?q=Black Lotus');
    });

    it('renders a link to the scryfall page after the search is resolved', async () => {
      // Crucible of worlds
      const { container } = render(<CardLink>Black Lotus</CardLink>);

      await wait(() => {
        expect(container.querySelector('a')).toHaveAttribute('href', 'https://scryfall.com/card/vma/4/black-lotus?utm_source=api');
      });
    });
  });
});
