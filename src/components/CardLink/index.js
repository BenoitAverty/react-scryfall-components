import React from 'react';
import PropTypes from 'prop-types';
import axios from '../../axios';

class CardLink extends React.Component {
  static propTypes = {
    /**
     * Name of the card. The link will be to the scryfall page of the card, or if
     * it can't be found, to the search page with this string as the query.
     */
    children: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      scryfallUri: null,
    };
  }

  componentDidMount() {
    const { children: cardName } = this.props;

    axios.get(`https://api.scryfall.com/cards/named?exact=${cardName}`)
      .then((resp) => {
        this.setState({ scryfallUri: resp.data.scryfall_uri });
      });
  }

  render() {
    const { scryfallUri } = this.state;
    const { children } = this.props;

    const href = scryfallUri || `https://scryfall.com/search?q=${children}`;

    return <a href={href}>{children}</a>;
  }
}

export default CardLink;
