import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

class Card extends React.Component {
  static SIZE_SMALL = 'small'
  static SIZE_NORMAL = 'normal'
  static SIZE_LARGE = 'large'

  static propTypes = {
    /** 
     * Scryfall ID of the card to render. This is a uuid that should look like
     * this : eb28b35c-28a5-4042-b21d-6d43658a16eb 
     */
    id: PropTypes.string,
    /** 
     * Size of the image to render
     */
    size: PropTypes.oneOf([Card.SIZE_SMALL, Card.SIZE_NORMAL, Card.SIZE_LARGE])
  }
  static defaultProps = {
    size: Card.SIZE_NORMAL
  }

  constructor(props) {
    super(props)

    this.state = {
      imgUrl: null
    }
  }

  componentDidMount() {
    axios.get(`https://api.scryfall.com/cards/${this.props.id}`)
      .then(resp => {
        this.setState({ imgUrl: resp.data.image_uris[this.props.size] })
      })
  }

  render() {
    return this.state.imgUrl ? <img src={this.state.imgUrl} /> : null
  }
}

export default Card