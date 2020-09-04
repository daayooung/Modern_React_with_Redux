import React, { useState } from 'react';
import Accordion from './Accordion';
import Search from './Search';
import Translate from './Translate';
import Dropdown from './Dropdown';
import Route from './Route';
import Header from './Header';

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
  return (
    <div>
      <Header />
      <Route path="/">
        <Accordion items={items} />
      </Route>
      <Route path="/list">
        <Search />
      </Route>
      <Route path="/dropdown">
        <Dropdown
          label="Select a Color"
          options={options}
          selected={selected}
          onSelectedChange={setSelected}
        />
      </Route>
      <Route path="/translate">
        <Translate />
      </Route>
    </div>
  );
};
