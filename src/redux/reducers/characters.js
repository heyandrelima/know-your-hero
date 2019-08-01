import { ADD_CHARACTER, REMOVE_CHARACTER } from '../actionTypes';

const initialState = {
    characters: []
};

const characters = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CHARACTER: {
            const character = action.payload;

            return {
                characters: [...state.characters, character]
            };
        }
        case REMOVE_CHARACTER: {
            const { characters } = state;
            const character = action.payload;
            let index;

            state.characters.forEach((char, ind) => {
                if(char.id === character.id) index = ind;
            });

            characters.splice(index, 1)

            return {
                characters: [...characters]
            };
        }
        default: return state;
    }
};

export default characters;