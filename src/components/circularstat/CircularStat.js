import React, { useEffect } from 'react';
import * as d3 from 'd3';

const CircularStat = (props) => {
    const { title, min, max, color, target, duration } = props;

    const drawStat = () => {
        const canvasWidth = 300;
        const canvasHeight = 300;
    };

    useEffect(() => {
        drawStat();
    }, []);

    return(
        <div className="stat-canvas"></div>
    );
};

export default CircularStat;