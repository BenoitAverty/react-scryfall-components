import { useState, useEffect } from 'react';
import axios from '../../utils/axios';

export default function useCardAutoComplete() {
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState([]);
  useEffect(() => {
    if (inputValue != null) {
      if (inputValue !== '') {
        axios.get(`/cards/autocomplete?q=${inputValue}`).then(resp => {
          setResult(resp.data.data);
        });
      } else {
        setResult([]);
      }
    }
  }, [inputValue]);

  return {
    result,
    setInputValue,
  };
}
