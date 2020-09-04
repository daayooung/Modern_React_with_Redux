import React from 'react';
import Search from './Search';

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

const App = () => {
  return (
    <div>
      <Search />
    </div>
  );
};

export default App;
