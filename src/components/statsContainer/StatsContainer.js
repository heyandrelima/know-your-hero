import React, { useState } from 'react';
import { useSelector, useStore } from 'react-redux';

import Chart from '../chart/Chart';

const StatsContainer = () => {
    const store = useStore();
    const state = useSelector(state => state);
    const [statsState, setStatsState] = useState([]);

    store.subscribe(() => {
        const stats = state.stats.stats;
        console.log(state);
        const statsArray = Object.keys(stats).map((key) => [key, stats[key]]);

        setStatsState([...statsArray]);
    });

    return (
        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            {statsState.length > 0 ?
                statsState.map((stat, index) => {
                    return stat[1].length > 0 ? (
                        <Chart key={index} id={index}
                            duration={1000} name={stat[0]} data={stat[1]} />
                    ) : null;
                }) : ''
            }
        </div>
    );
};

export default StatsContainer;