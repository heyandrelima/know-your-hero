import React, { useEffect } from 'react';
import * as d3 from 'd3';

const CircularStat = (props) => {
    const { title, min, max, color, target, duration } = props;
    const id = props.id || Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
    const rest = max - target;
    const backgroundColor = '#ccc';

    const drawStat = () => {
        const data = [target, rest];
        const canvasWidth = 200;
        const canvasHeight = 200;
        const canvasMargin = 10;
        const pieWidth = 20;
        const radius = Math.min(canvasWidth, canvasHeight) / 2 - canvasMargin;
        const innerRadius = radius - pieWidth;
        const canvas = d3.select(`#stats-${id}`);

        // Creating svg canvas
        const svgCanvas = canvas.append('svg')
            .attr('preserveAspectRatio', 'xMinYMin meet')
            .attr('viewBox', `0 0 ${canvasWidth} ${canvasHeight}`);
        const gBackground = svgCanvas.append('g').attr('transform', `translate(${canvasWidth / 2}, ${canvasHeight / 2})`);
        const gData = svgCanvas.append('g').attr('transform', `translate(${canvasWidth / 2}, ${canvasHeight / 2})`);

        // Getting data ready
        const pie = d3.pie().value((datapoint) => datapoint.value);
        const entries = pie(d3.entries(data));
        const dataReady = entries.filter((item, index) => index === 0);
        const arc = d3.arc().innerRadius(innerRadius).outerRadius(radius);

        // Drawing background
        const backgroundData = pie(d3.entries([100]));
        gBackground.selectAll('path').data(backgroundData).enter()
            .append('path').attr('d', arc)
            .attr('fill', backgroundColor)

        // Drawing chart
        gData.selectAll('path').data(dataReady).enter()
            .append('path')
            .attr('d', arc.cornerRadius(radius))
            .attr('fill', color)
            //Animation
            .transition()
            .duration(duration)
            .attrTween('d', (datapoint) => {
                const newData = { ...datapoint };
                const interpolateEndAngle = d3.interpolate(newData.startAngle, newData.endAngle);

                return (progress) => {
                    newData.endAngle = interpolateEndAngle(progress);
                    return arc(newData);
                };
            });
    };

    useEffect(() => {
        drawStat();
    }, []);

    return (
        <div id={`stats-${id}`} class="circular-stat" ></div>
    );
};

export default CircularStat;