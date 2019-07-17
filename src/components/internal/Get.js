import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import axios from '../../utils/axios';

const STATUS_IDLE = 'idle';
const STATUS_FETCHING = 'fetching';
const STATUS_SUCCESS = 'success';
const STATUS_ERROR = 'error';

const Get = ({ endpoint, children }) => {
  const [status, setStatus] = useState(STATUS_IDLE);
  const [result, setResult] = useState(null);

  useEffect(() => {
    setStatus(STATUS_FETCHING);
    axios
      .get(endpoint)
      .then(resp => {
        setResult(resp.data);
        setStatus(STATUS_SUCCESS);
      })
      .catch(error => {
        console.error(
          `There was an error while performing request to endpoint ${endpoint}.`,
          error.response.data,
        );
        setResult(error.response.data);
        setStatus(STATUS_ERROR);
      });
  }, [endpoint]);

  return children(result, status);
};
Get.displayName = 'Get';
Get.propTypes = {
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
Object.assign(Get, {
  STATUS_SUCCESS,
  STATUS_ERROR,
  STATUS_IDLE,
  STATUS_FETCHING,
});

export default Get;
