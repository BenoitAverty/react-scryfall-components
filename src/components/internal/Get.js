import React from 'react';
import PropTypes from 'prop-types';

import axios from '../../utils/axios';

class Get extends React.Component {
  static displayName = 'Get';

  static STATUS_IDLE = 'idle';
  static STATUS_FETCHING = 'fetching';
  static STATUS_SUCCESS = 'success';
  static STATUS_ERROR = 'error';

  static propTypes = {
    /** endpoint of the scryfall api to fetch. */
    endpoint: PropTypes.string.isRequired,
    /**
     * render function. Will be called with the result of the call, and a status.
     * Status can be IDLE, FETCHING, SUCCESS or ERROR
     * result is null when status is IDLE or FETCHING
     * result contains the data if status is SUCCESS, or the error if status is ERROR
     */
    children: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      status: Get.STATUS_IDLE,
      result: null,
    };
  }

  componentDidMount() {
    const { endpoint } = this.props;
    this.setState({
      status: Get.STATUS_FETCHING,
    });
    axios
      .get(endpoint)
      .then(resp => {
        this.setState({
          result: resp.data,
          status: Get.STATUS_SUCCESS,
        });
      })
      .catch(error => {
        console.error(
          `There was an error while performing request to endpoint ${endpoint}.`,
          error.response.data,
        );
        this.setState({
          result: error.response.data,
          status: Get.STATUS_ERROR,
        });
      });
  }

  render() {
    const { result, status } = this.state;
    const { children: renderChildren } = this.props;

    return renderChildren(result, status);
  }
}

export default Get;
