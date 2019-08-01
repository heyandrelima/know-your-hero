import React from 'react';
import Search from './components/search/Search';
import CharactersContainer from './components/charactersContainer/CharactersContainer';
import StatsContainer from './components/statsContainer/StatsContainer';

function App() {
  console.log();
  return (
    <div>
      <h1>Know Your Hero</h1>
      <Search />
      <CharactersContainer />
      <StatsContainer />
    </div>
  );
}

export default App;
