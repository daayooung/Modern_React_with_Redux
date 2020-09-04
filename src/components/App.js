import React from 'react';

import Translate from './Translate';

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
  return (
    <div>
      <Translate />
    </div>
  );
};
