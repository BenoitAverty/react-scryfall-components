import React from 'react';
import PropTypes from 'prop-types';

import Get from '../internal/Get';
import LoadingIndicator from '../internal/LoadingIndicator';

const imageSizes = {
  small: { w: 146, h: 204 },
  normal: { w: 488, h: 680 },
  large: { w: 672, h: 936 },
};

/**
 * Renders a card image from scryfall.
 */
const Card = ({ id, size }) => (
  <Get endpoint={`/cards/${id}`}>
    {(result, status) =>
      status === Get.STATUS_SUCCESS ? (
        <img
          style={{ display: 'block' }}
          src={result.image_uris[size]}
          alt={result.name}
          width={imageSizes[size].w}
          height={imageSizes[size].h}
        />
      ) : (
        <LoadingIndicator
          width={imageSizes[size].w}
          height={imageSizes[size].h}
        />
      )
    }
  </Get>
);
Card.SIZE_SMALL = 'small';
Card.SIZE_NORMAL = 'normal';
Card.SIZE_LARGE = 'large';

Card.displayName = 'Card';

Card.propTypes = {
  /**
   * Scryfall ID of the card to render. This is a uuid that should look like this : eb28b35c-28a5-4042-b21d-6d43658a16eb
   */
  id: PropTypes.string.isRequired,
  /**
   * Size of the image to render
   */
  size: PropTypes.oneOf([Card.SIZE_SMALL, Card.SIZE_NORMAL, Card.SIZE_LARGE]),
};
Card.defaultProps = {
  size: Card.SIZE_NORMAL,
};

export default Card;
