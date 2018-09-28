// Import all that is needed for testing
import React from 'react';
import {
  render,
  cleanup,
  wait,
  fireEvent,
  waitForElement,
} from 'react-testing-library';
import 'jest-dom/extend-expect';

import {
  loadAndApplyFixtures,
  saveFixtures,
} from '../../../tests/axiosMocking';

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
      const { container } = render(<CardLink>Black Lotus</CardLink>);

      expect(container.querySelectorAll('a')).toHaveLength(1);
      expect(container.querySelector('a')).toHaveAttribute(
        'href',
        'https://scryfall.com/search?q=Black Lotus',
      );
    });

    it('renders a link to the scryfall page after the search is resolved', async () => {
      const { container } = render(<CardLink>Black Lotus</CardLink>);

      await wait(() => {
        expect(container.querySelector('a')).toHaveAttribute(
          'href',
          'https://scryfall.com/card/vma/4/black-lotus?utm_source=api',
        );
      });
    });
  });

  describe('Card Tooltip', () => {
    test('snapshot', async () => {
      const { container, getByText, getByAltText } = render(
        <CardLink>crucible of worlds</CardLink>,
      );

      fireEvent.mouseOver(getByText('crucible of worlds'));
      await waitForElement(() => getByAltText('Crucible of Worlds'));
      expect(container.firstChild).toMatchSnapshot();
    });
    it('shows a card on mouse over', async () => {
      const { container, getByText } = render(
        <CardLink>crucible of worlds</CardLink>,
      );

      fireEvent.mouseOver(getByText('crucible of worlds'));
      await wait(() => {
        expect(container.querySelector('img')).toHaveAttribute(
          'alt',
          'Crucible of Worlds',
        );
      });
    });

    it('hides the card on mouse out', async () => {
      const { container, getByText, getByAltText } = render(
        <CardLink>crucible of worlds</CardLink>,
      );

      // mouse enter, Wait for the image to appear then mouse leave
      fireEvent.mouseOver(getByText('crucible of worlds'));
      await waitForElement(() => getByAltText('Crucible of Worlds'));
      fireEvent.mouseOut(getByText('crucible of worlds'));

      await wait(() => {
        expect(container.querySelector('img')).toBeNull();
      });
    });
  });
});
