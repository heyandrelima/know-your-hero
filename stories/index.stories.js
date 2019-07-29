import React from 'react';

import { storiesOf } from '@storybook/react';

import Character from '../src/components/character/Character';
import CircularStat from '../src/components/circularstat/CircularStat';
import Chart from '../src/components/chart/Chart';
import Search from '../src/components/search/Search';
import SearchResult from '../src/components/searchResult/SearchResult'
import sampleData from '../src/sample-data.json';

storiesOf('Know your hero', module).add('Character', () => <Character character={sampleData.characters[0]} units={sampleData.units} />);
storiesOf('Know your hero', module).add('CircularStat', () =>
    <CircularStat title="Combat" min={0} max={100}
        color="#3e98c7" target={parseInt(sampleData.characters[0].powerstats.intelligence)}
        duration={1000} delay={1000} />);
storiesOf('Know your hero', module).add('Chart', () => <Chart data={sampleData.comparison[0]} duration={1000} />);
storiesOf('Know your hero', module).add('Search', () => <Search />);
storiesOf('Know your hero', module).add('SearchResult', () => <SearchResult result={sampleData.characters[0]} />);