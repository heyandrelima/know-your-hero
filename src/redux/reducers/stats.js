import { ADD_STAT, REMOVE_STAT, REMOVE_CHAR_STATS } from '../actionTypes';

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
        case REMOVE_STAT: {
            const key = action.payload.key;
            const id = action.payload.id;
            const currentStats = state.stats;
            let index = 0;

            currentStats[key].forEach((stat, index) => {
                if (stat.id == id) index = index;
            });
            currentStats[key].splice(index, 1);

            const newStats = currentStats;

            return {
                stats: newStats
            };
        }
        case REMOVE_CHAR_STATS: {
            const id = action.payload.id;
            const currentStats = state.stats;
            const allKeys = Object.keys(currentStats);
            let newStats = {};

            allKeys.forEach(currentKey => {
                currentStats[currentKey].forEach(stat => {
                    if (stat.id !== id) {
                        newStats[currentKey] ? newStats[currentKey].push(stat)
                            : newStats[currentKey] = [stat];
                    }
                });
            });

            console.log(newStats);

            return { stats: newStats };
        }
        default: return state;
    }
};

export default stats;