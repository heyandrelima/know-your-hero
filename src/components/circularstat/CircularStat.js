import React, { useEffect } from 'react';
import * as d3 from 'd3';

const CircularStat = (props) => {
    const { title, min, max, color, target, duration } = props;
    const id = props.id || Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
    const delay = props.delay || 0;
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

        // Creating title
        canvas.append('h4').text(title).style('text-align', 'center');

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
        const arc = d3.arc().innerRadius(innerRadius).outerRadius(radius).cornerRadius(radius);

        // Drawing background
        const backgroundData = pie(d3.entries([100]));
        gBackground
            .append('path').attr('d', arc(backgroundData[0]))
            .attr('fill', backgroundColor)

        // Drawing chart
        gData.selectAll('path').data(dataReady).enter()
            .append('path')
            .attr('d', '')
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
            })
            .delay(delay);

        // Draw centerd number
        gData.append('text')
            .text(target).style('font-size', '2em')
            .attr('x', (datapoint, iteration, groups) => {
                const element = groups[iteration];
                const width = element.getBBox().width;

                return 0 - width / 2;
            }).text(min)
            .attr('y', (datapoint, iteration, groups) => {
                const element = groups[iteration];
                const height = element.getBBox().height;

                return 0 + height / 2;
            })
            .transition()
            .duration(duration)
            .tween('text', (datapoint, iteration, groups) => {
                const element = groups[iteration];
                const interpolateText = d3.interpolateNumber(min, target);

                return (progress) => {
                    const newText = parseInt(interpolateText(progress));
                    return d3.select(element).text(newText);
                };
            })
            .delay(delay);
    };

    useEffect(() => {
        drawStat();
    }, []);

    return (
        <div id={`stats-${id}`} class="circular-stat" ></div>
    );
};

export default CircularStat;