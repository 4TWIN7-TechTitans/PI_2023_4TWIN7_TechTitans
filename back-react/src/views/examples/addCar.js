import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MyComponent() {
  const [selectedOption, setSelectedOption] = useState('');
  const [options, setOptions] = useState([]);

  useEffect(() => {
    async function fetchOptions() {
      const response = await axios.get('https://example.com/api/foreignkeys');
      setOptions(response.data);
    }
    fetchOptions();
  }, []);

  function handleSelectChange(event) {
    setSelectedOption(event.target.value);
  }

  return (
    <div>
      <h1>Dropdown List Example</h1>
      <select value={selectedOption} onChange={handleSelectChange}>
        <option value="">--Select an option--</option>
        {options.map(option => (
          <option key={option.id} value={option.id}>{option.name}</option>
        ))}
      </select>
      <p>You selected: {selectedOption}</p>
    </div>
  );
}

export default MyComponent;