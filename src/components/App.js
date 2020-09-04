import React, { useState } from 'react';
import Accordion from './Accordion';
import Search from './Search';
import Dropdown from './Dropdown';

const items = [
  {
    title: 'What is React?',
    content: 'React is a front end javascript framwork'
  },
  {
    title: 'Why use React?',
    content: 'React is a favorite JS library among engineers'
  },
  {
    title: 'How do you use React?',
    content: 'You use React by creating Components'
  }
];

const options = [
  {
    label: 'The Color Green',
    value: 'Green'
  },
  {
    label: 'The Color Blue',
    value: 'Blue'
  },
  {
    label: 'The Color Purple',
    value: 'Purple'
  }
];

export default () => {
  const [selected, setSelected] = useState(options[0]);
  const [showDropdown, setSowDropdown] = useState(true);

  return (
    <div>
      <button onClick={() => setSowDropdown(!showDropdown)}>
        Togle Dropdown
      </button>
      {showDropdown ? (
        <Dropdown
          options={options}
          selected={selected}
          onSelectedChange={setSelected}
        />
      ) : null}
    </div>
  );
};
