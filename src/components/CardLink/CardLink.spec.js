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

// Mock the loading indicator
jest.mock('../internal/LoadingIndicator');

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
    test('snapshot', async () => {
      const { container } = render(<CardLink>Reveillark</CardLink>);

      // A link should show up
      await waitForElement(() => container.querySelector('a'));
      expect(container.firstChild).toMatchSnapshot();
    });

    test.each([
      [
        'Black Lotus',
        'https://scryfall.com/card/vma/4/black-lotus?utm_source=api',
      ],
      [
        'Blac Lotus',
        'https://scryfall.com/card/vma/4/black-lotus?utm_source=api',
      ],
    ])(
      'renders a link to the scryfall page after the search is resolved',
      async (cardName, expectedUrl) => {
        const { container } = render(<CardLink>{cardName}</CardLink>);

        // A link should show up
        const link = await waitForElement(() => container.querySelector('a'));
        expect(link).toHaveAttribute('href', expectedUrl);
      },
    );
  });

  describe('Card Tooltip', () => {
    test('snapshot', async () => {
      const { container, getByText, getByAltText } = render(
        <CardLink>crucible of worlds</CardLink>,
      );

      // A link should show up
      await waitForElement(() => container.querySelector('a'));

      fireEvent.mouseOver(getByText('crucible of worlds'));
      await waitForElement(() => getByAltText('Crucible of Worlds'));
      expect(container.firstChild).toMatchSnapshot();
    });
    it('shows a card on mouse over', async () => {
      const { container } = render(<CardLink>crucible of worlds</CardLink>);

      // A link should show up
      const link = await waitForElement(() => container.querySelector('a'));

      fireEvent.mouseOver(link);
      await wait(() => {
        expect(container.querySelector('img')).toHaveAttribute(
          'alt',
          'Crucible of Worlds',
        );
        expect(container.querySelector('img')).toBeVisible();
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
        expect(container.querySelector('img')).not.toBeVisible();
      });
    });
  });

  describe('When card is not found', () => {
    // Mock console.error for this case
    beforeEach(() => {
      jest.spyOn(global.console, 'error').mockImplementation(() => {});
    });
    afterEach(() => {
      console.error.mockRestore();
    });

    it("doesn't show a link", async () => {
      const { container } = render(
        <CardLink>This card doesn&apos;t exist</CardLink>,
      );

      await wait(() => {
        expect(container.querySelector('a')).toBeNull();
      });
    });

    test.each([["This card doesn't exist"], ['jace']])(
      'prints an error to the console',
      async cardName => {
        render(<CardLink>{cardName}</CardLink>);

        await wait(() => {
          expect(console.error).toHaveBeenCalled();
        });
      },
    );
  });

  describe('Fuzzy matching', () => {});
});
