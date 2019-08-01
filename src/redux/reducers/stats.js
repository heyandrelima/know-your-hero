import { ADD_STAT } from '../actionTypes';

const initialState = {
    stats: []
};

const stats = (state = initialState, action) => {
    switch (action.type) {
        case ADD_STAT: {
            const newStat = action.payload;
            let newStats = state.stats;

            newStats[newStat.name] ? newStats[newStat.name].push(newStat.data)
                : newStats[newStat.name] = [newStat.data];

            return {
                stats: newStats
            };
        }
        default: return state;
    }
};

export default stats;