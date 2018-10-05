import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { withHover } from 'libreact/lib/HoverSensor';
import { withFocus } from 'libreact/lib/FocusSensor';

import Get from '../internal/Get';
import Card from '../Card';
import enhanceComponent from '../../utils/enhanceComponent';

const css = {
  position: 'relative',
  display: 'inline-block',
  '& a': {
    'text-decoration': 'underline dotted',
  },
  '.tooltip': {
    'z-index': 10,
    'text-align': 'center',
    position: 'absolute',
    'background-color': '#ddd',
    bottom: '160%',
    left: '50%',
    'margin-left': '-146px',
    width: '292px',
    height: '408px',
    '& img': {
      width: '292px',
      height: '408px',
    },
    '&.hide': {
      display: 'none',
    },
  },
  '.tooltip::after': {
    content: '" "',
    position: 'absolute',
    top: '100%' /* At the bottom of the tooltip */,
    left: '50%',
    'margin-left': '-5px',
    'border-width': '5px',
    'border-style': 'solid',
    'border-color': 'black transparent transparent transparent',
  },
};
const CardLinkContainer = styled('div')(css);

/**
 * Renders a link to the scryfall page of a card. The link also features a tooltip showing the card's image.
 */
const CardLink = ({
  children: cardName,
  /* eslint-disable react/prop-types */
  /* We don't want to put these in prop-types because they're given by libreact's HOC. We don't want 
   * them in the docs. */
  hover: { isHover, bond: hoverBond },
  focus: { isFocused, bond: focusBond },
  /* eslint-enable */
}) => {
  // Tooltip generated in a function to avoid instanciating a Card component before we have an id.
  const tooltip = cardId => (
    <span className={isHover || isFocused ? 'tooltip' : 'tooltip hide'}>
      <Card id={cardId} size={Card.SIZE_NORMAL} />
    </span>
  );

  // Function that will render the component given the result of the Get Request
  const renderFunction = (result, status) =>
    status === Get.STATUS_SUCCESS ? (
      <CardLinkContainer {...hoverBond} {...focusBond}>
        {tooltip(result.id)}
        <a href={result.scryfall_uri}>{cardName}</a>
      </CardLinkContainer>
    ) : (
      cardName
    );

  return (
    <Get endpoint={`/cards/named?fuzzy=${cardName}`}>{renderFunction}</Get>
  );
};

CardLink.displayName = 'CardLink';
CardLink.propTypes = {
  /**
   * Name of the card. The link will be to the scryfall page of the card, or if it can't be found, to the search page with this string as the query.
   */
  children: PropTypes.string.isRequired,
};

export default enhanceComponent([withFocus, withHover], CardLink);
