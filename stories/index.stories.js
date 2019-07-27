import React from 'react';

import { storiesOf } from '@storybook/react';

import Character from '../src/components/character/Character';
import CircularStat from '../src/components/circularstat/CircularStat';
import sampleData from '../src/sample-data.json';

storiesOf('Know your hero', module).add('Character', () => <Character character={sampleData.characters[0]} units={sampleData.units} />);
storiesOf('Know your hero', module).add('CircularStat', () => <CircularStat title="Combat" min={0} max={100} color="#3e98c7" target={parseInt(sampleData.characters[0].powerstats.intelligence)} duration={1} />);
