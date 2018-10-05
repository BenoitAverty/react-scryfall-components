import React from 'react';

import { storiesOf } from '@storybook/react';

import CardLink from '.';

storiesOf('CardLink', module)
  .addParameters({
    info: {
      // CardLink is a higher order component, but we want to generate the doc for the base component.
      propTables: [CardLink.BaseComponent],
      propTablesExclude: [CardLink],
    },
  })
  .add('CardLink', () => <CardLink>Urborg, tomb of yawgmoth</CardLink>)
  .add('fuzzy', () => <CardLink>Blac Lotus</CardLink>)
  .add('card not found', () => (
    <CardLink>This card doesn&apos;t exist</CardLink>
  ));
