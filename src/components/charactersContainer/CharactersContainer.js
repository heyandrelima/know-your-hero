import React from 'react';
import { useSelector } from 'react-redux';

import Character from '../character/Character';

const CharactersContainer = () => {
    const characters = useSelector(state => state.characters.characters);

    return (
        <div style={{ width: "100%" }}>
            <div style={{ width: "100%", overflowX: "auto" }}>
                {characters ? characters.map((character, index) => {
                    return(<Character key={character.id} character={character} />)
                }) : ''}
            </div>
        </div>
    );
};

export default CharactersContainer;