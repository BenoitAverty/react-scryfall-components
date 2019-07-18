import React from 'react';
import useCardAutocomplete from '../../hooks/useCardAutocomplete';

const CardAutocomplete = () => {
  const { result, setInputValue } = useCardAutocomplete();

  return (
    <div>
      <input
        type="text"
        onInput={event => setInputValue(event.target.value)}
      />
      <ul>
        {result.map(item => (
          <li>{item}</li>
        ))}
      </ul>
    </div>
  );
};
CardAutocomplete.displayName = 'CardAutoComplete';

export default CardAutocomplete;