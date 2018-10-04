import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { withHover } from 'libreact/lib/HoverSensor';
import { withFocus } from 'libreact/lib/FocusSensor';

import axios from '../../utils/axios';
import Card from '../Card';

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
 * */
@withHover
@withFocus
class CardLink extends React.Component {
  static displayName = 'CardLink';
  static propTypes = {
    /**
     * Name of the card. The link will be to the scryfall page of the card, or if it can't be found, to the search page with this string as the query.
     */
    children: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      scryfallUri: null,
      scryfallId: null,
    };
  }

  componentDidMount() {
    const { children: cardName } = this.props;

    axios
      .get(`/cards/named?fuzzy=${cardName}`)
      .then(resp => {
        this.setState({
          scryfallUri: resp.data.scryfall_uri,
          scryfallId: resp.data.id,
        });
      })
      .catch(error => {
        if (error.response) {
          console.error(
            `There was an error with the Card Link for text ${cardName}`,
            error.response.data,
          );
        }
      });
  }

  render() {
    const { scryfallUri, scryfallId } = this.state;
    const {
      children,
      hover: { isHover, bond: hoverBond },
      focus: { isFocused, bond: focusBond },
    } = this.props;

    // Tooltip generated in a function to avoid instanciating a Card component before we have an id.
    const tooltip = () => (
      <span className={isHover || isFocused ? 'tooltip' : 'tooltip hide'}>
        <Card id={scryfallId} size={Card.SIZE_NORMAL} />
      </span>
    );

    return scryfallId && scryfallUri ? (
      <CardLinkContainer {...hoverBond} {...focusBond}>
        {tooltip()}
        <a href={scryfallUri}>{children}</a>
      </CardLinkContainer>
    ) : (
      children
    );
  }
}

export default CardLink;
