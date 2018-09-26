// Import all that is needed for testing
import React from 'react';
import { render, cleanup, waitForElement } from 'react-testing-library';
import 'jest-dom/extend-expect';

// Import the component under test
import Card from '.';

describe('Card component', () => {
  beforeEach(() => {
    cleanup();
  });

  describe('Rendering a card image', () => {
    test('snapshot', async () => {
      const { container } = render(<Card id="eb28b35c-28a5-4042-b21d-6d43658a16eb" />);

      // Wait for an img to appear
      await waitForElement(() => document.querySelector('img'), { container });

      expect(container.firstChild).toMatchSnapshot();
    });

    it('renders an image if given a scryfall id', async () => {
      // Crucible of worlds
      const { container } = render(<Card id="eb28b35c-28a5-4042-b21d-6d43658a16eb" />);

      // Wait for an img to appear
      await waitForElement(() => container.querySelector('img'), { container });

      expect(container.querySelectorAll('img')).toHaveLength(1);
      expect(container.querySelector('img')).toHaveAttribute('src', 'https://img.scryfall.com/cards/normal/en/m19/229.jpg?1531451273');
      expect(container.querySelector('img')).toHaveAttribute('alt', 'Crucible of Worlds');
    });

    it('renders the small image with the size property at small', async () => {
      // Momentary blink
      const { container } = render(<Card id="4206d5f8-edeb-4e0b-8e98-736f6ccdcf99" size={Card.SIZE_SMALL} />);

      // Wait for an img to appear
      await waitForElement(() => container.querySelector('img'), { container });

      expect(container.querySelectorAll('img')).toHaveLength(1);
      expect(container.querySelector('img')).toHaveAttribute('src', 'https://img.scryfall.com/cards/small/en/mm3/16.jpg?1517813031');
      expect(container.querySelector('img')).toHaveAttribute('alt', 'Momentary Blink');
    });
  });
});
