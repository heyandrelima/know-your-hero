import { ADD_CHARACTER } from './actionTypes';

export const addCharacter = content => ({
    type: ADD_CHARACTER,
    payload: { content }
});