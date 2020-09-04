import React from 'react';
import Accordion from './Accordion';
import Search from './Search';
import Translate from './Translate';
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

const showAccordion = () => {
  if (window.location.pathname === '/') {
    return <Accordion items={items} />;
  }
};

const showList = () => {
  if (window.location.pathname === '/list') {
    return <Search />;
  }
};

const showDropdown = () => {
  if (window.location.pathname === '/dropdown') {
    return <Dropdown />;
  }
};

const showTranslate = () => {
  if (window.location.pathname === '/translate') {
    return <Translate />;
  }
};

export default () => {
  return (
    <div>
      {showAccordion()}
      {showList()}
      {showDropdown()}
      {showTranslate()}
    </div>
  );
};
