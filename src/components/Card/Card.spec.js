// Import all that is needed for testing
import React from 'react';
import { render, cleanup, waitForElement, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import {
  loadAndApplyFixtures,
  saveFixtures,
} from '../../../tests/axiosMocking';

// Import the component under test
import Card from '.';

// Mock the loading indicator
jest.mock('../internal/LoadingIndicator');

describe('Card component', () => {
  // Setup mocking of axios requests.
  let fixtures;
  beforeAll(async () => {
    fixtures = await loadAndApplyFixtures('./src/components/Card');
  });
  afterAll(() => {
    saveFixtures('./src/components/Card', fixtures);
  });

  beforeEach(() => {
    cleanup();
  });

  describe('Rendering a card image', () => {
    test('snapshot', async () => {
      const { container } = render(
        <Card id="eb28b35c-28a5-4042-b21d-6d43658a16eb" />,
      );

      // Wait for an img to appear
      await waitForElement(() => document.querySelector('img'), { container });

      expect(container.firstChild).toMatchSnapshot();
    });

    it('renders a loading indicator while waiting for the api to reply', async () => {
      // Crucible of worlds
      const { queryByTestId } = render(
        <Card id="eb28b35c-28a5-4042-b21d-6d43658a16eb" />,
      );

      // Test that there  is a loading indicator
      expect(queryByTestId('LoadingIndicatorStub')).not.toBeNull();
      // test that it eventually disappears
      await wait(() => {
        expect(queryByTestId('LoadingIndicatorStub')).toBeNull();
      });
    });

    it('renders an image if given a scryfall id', async () => {
      // Crucible of worlds
      const { container } = render(
        <Card id="eb28b35c-28a5-4042-b21d-6d43658a16eb" />,
      );

      // Wait for an img to appear
      await waitForElement(() => container.querySelector('img'), { container });

      expect(container.querySelectorAll('img')).toHaveLength(1);
      expect(container.querySelector('img')).toHaveAttribute(
        'src',
        'https://img.scryfall.com/cards/normal/front/e/b/eb28b35c-28a5-4042-b21d-6d43658a16eb.jpg?1562304863',
      );
      expect(container.querySelector('img')).toHaveAttribute(
        'alt',
        'Crucible of Worlds',
      );
    });

    it('renders the small image with the size property at small', async () => {
      // Momentary blink
      const { container } = render(
        <Card
          id="4206d5f8-edeb-4e0b-8e98-736f6ccdcf99"
          size={Card.SIZE_SMALL}
        />,
      );

      // Wait for an img to appear
      await waitForElement(() => container.querySelector('img'), { container });

      expect(container.querySelectorAll('img')).toHaveLength(1);
      expect(container.querySelector('img')).toHaveAttribute(
        'src',
        'https://img.scryfall.com/cards/small/front/4/2/4206d5f8-edeb-4e0b-8e98-736f6ccdcf99.jpg?1561762721',
      );
      expect(container.querySelector('img')).toHaveAttribute(
        'alt',
        'Momentary Blink',
      );
    });
  });
});
