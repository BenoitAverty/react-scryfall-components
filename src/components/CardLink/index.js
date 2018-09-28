import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import axios from '../../axios';

import Card from '../Card';

const css = {
  position: 'relative',
  display: 'inline-block',
  '& a': {
    'text-decoration': 'underline dotted',
  },
  '.tooltip': {
    'text-align': 'center',
    width: '146px',
    height: '204px',
    position: 'absolute',
    'background-color': '#ddd',
    bottom: '160%',
    left: '50%',
    'margin-left': '-73px',
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

class CardLink extends React.Component {
  static propTypes = {
    /**
     * Name of the card. The link will be to the scryfall page of the card, or if
     * it can't be found, to the search page with this string as the query.
     */
    children: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.showTooltip = this.showTooltip.bind(this);
    this.hideTooltip = this.hideTooltip.bind(this);

    this.state = {
      scryfallUri: null,
      showTooltip: false,
    };
  }

  componentDidMount() {
    const { children: cardName } = this.props;

    axios.get(`/cards/named?exact=${cardName}`).then(resp => {
      this.setState({
        scryfallUri: resp.data.scryfall_uri,
        scryfallId: resp.data.id,
      });
    });
  }

  showTooltip() {
    this.setState({ showTooltip: true });
  }

  hideTooltip() {
    this.setState({ showTooltip: false });
  }

  render() {
    const { scryfallUri, scryfallId, showTooltip } = this.state;
    const { children } = this.props;

    const href = scryfallUri || `https://scryfall.com/search?q=${children}`;

    const tooltip =
      showTooltip && scryfallId ? (
        <span className="tooltip">
          <Card id={scryfallId} size={Card.SIZE_SMALL} />
        </span>
      ) : null;

    return (
      <CardLinkContainer
        onMouseOver={this.showTooltip}
        onFocus={this.showTooltip}
        onMouseLeave={this.hideTooltip}
        onBlur={this.hideTooltip}
      >
        {tooltip}
        <a href={href}>{children}</a>
      </CardLinkContainer>
    );
  }
}

export default CardLink;
