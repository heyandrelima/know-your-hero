import { ADD_CHARACTER } from '../actionTypes';

const initialState = {
    characters: []
};

const characters = (state = initialState, action) => {
    switch(action.type) {
        case ADD_CHARACTER: {
            const character = action.payload;

            return {
                characters: [...state.characters, character]
            };
        }
        default: return state;
    }
};

export default characters;