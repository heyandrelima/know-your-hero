import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';

import { useDispatch } from 'react-redux';
import { ADD_STAT, REMOVE_STAT } from '../../redux/actionTypes';

const CircularStat = (props) => {
    const { title, min, max, color, target, duration, character } = props;
    const id = props.id || title + character.id;
    const delay = props.delay || 0;
    const rest = max - target;
    const backgroundColor = '#ccc';

    const data = [target, rest];
    const canvasWidth = 200;
    const canvasHeight = 200;
    const canvasMargin = 10;
    const pieWidth = 20;
    const radius = Math.min(canvasWidth, canvasHeight) / 2 - canvasMargin;
    const innerRadius = radius - pieWidth;

    const [active, setActive] = useState(false);

    const dispatch = useDispatch();

    const drawStat = () => {
        const canvas = d3.select(`#stats-${id}`);

        // Creating svg canvas
        const svgCanvas = canvas.select('svg').html('')
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

    const hightlightNumber = () => {
        const canvas = d3.select(`#stats-${id}`);

        // Creating svg canvas
        const svgCanvas = canvas.select('svg');
        svgCanvas.select('text').style('font-weight', 'bold');
    };

    const addStat = () => {
        const payload = {
            name: title,
            data: {
                character: character.name,
                "full-name": character.biography['full-name'],
                value: target,
                color,
                id: character.id
            }
        };

        dispatch({ type: ADD_STAT, payload });
        setActive(true);
    };

    const removeStat = () => {
        const canvas = d3.select(`#stats-${id}`);
        const svgCanvas = canvas.select('svg');
        svgCanvas.select('text').style('font-weight', 'normal');

        dispatch({
            type: REMOVE_STAT,
            payload: {
                key: title,
                id: character.id
            }
        });
        setActive(false);
    };

    const handleClick = () => {
        if (!active) addStat();
        else removeStat();
    };

    useEffect(() => {
        drawStat();
    }, []);

    if (active) hightlightNumber();

    return (
        <div id={`stats-${id}`} style={{ cursor: 'pointer' }}
            className="circular-stat" onClick={handleClick} >
            <h4 style={{ textAlign: 'center', textTransform: 'capitalize' }}>{title}</h4>
            <svg></svg>
        </div>
    );
};

export default CircularStat;