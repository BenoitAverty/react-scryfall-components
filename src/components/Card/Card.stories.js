import React from 'react';

import { storiesOf } from '@storybook/react';

import Card from '.';

storiesOf('Card', module)
  .add('Card', () => <Card id="eb28b35c-28a5-4042-b21d-6d43658a16eb" />)
  .add('different sizes', () => (
    <div>
      <Card id="eb28b35c-28a5-4042-b21d-6d43658a16eb" size={Card.SIZE_SMALL} />
      <Card id="eb28b35c-28a5-4042-b21d-6d43658a16eb" size={Card.SIZE_NORMAL} />
      <Card id="eb28b35c-28a5-4042-b21d-6d43658a16eb" size={Card.SIZE_LARGE} />
    </div>
  ));
