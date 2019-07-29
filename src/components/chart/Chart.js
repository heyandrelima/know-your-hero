import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import { svg } from 'popmotion';
import { format } from 'util';

const Chart = (props) => {
    const { duration } = props;
    const { value, data } = props.data;

    const drawBarChart = () => {
        let allValues = [];
        data.forEach((item, index) => {
            allValues.push(item.value);
        });

        // Defining values
        const barsWidth = 10;
        const barsMargin = 10;
        const barsScale = 0.5;
        const canvasWidth = allValues.length * (barsWidth + barsMargin) + barsMargin;
        const canvasHeight = parseInt(d3.max(allValues) * barsScale) * 1.25;
        const canvas = d3.select('.canvas');

        // Title of the chart
        canvas.append('h4').text(() => value)
            .style('text-transform', 'capitalize').style('text-align', 'center');

        // Creating canvas
        const svgCanvas = canvas.append('svg')
            .attr('preserveAspectRatio', 'xMinYMin meet')
            .attr('viewBox', `0 0 ${canvasWidth} ${canvasHeight}`)
            .style('overflow', 'visible');

        // Group for the bars
        svgCanvas.append('g').attr('class', 'inside-rect')
            .style('transform', 'translate(0, -5%)');

        // Labels for the bars
        svgCanvas.append('g').attr('class', 'labels-group').style('transform', 'translate(0, 100%)')
            .selectAll('text').data(data).enter()
            .append('text').text(datapoint => datapoint.character)
            .style('font-size', '15%')
            .style('font-weight', (datapoint, iteration) => {
                if (datapoint.value === d3.max(allValues)) return 'bold';
            })
            .attr('x', (datapoint, iteration, groups) => {
                const { width } = groups[iteration].getBBox();
                const x = barsMargin + iteration * (barsWidth + barsMargin);
                const newPosition = x + (barsWidth - width) / 2;

                return newPosition;
            });

        // Creating bars
        svgCanvas.select('.inside-rect')
            .selectAll('rect').data(allValues).enter().append('rect')
            .attr('width', barsWidth).attr('height', 0)
            .attr('fill', (datapoint, iteration) => data[iteration].color)
            .attr('x', (datapoint, iteration) => iteration * (barsWidth + barsMargin) + barsMargin)
            .attr('y', canvasHeight)
            // Animation
            .transition()
            .duration(duration)
            .attr('height', (datapoint) => datapoint * barsScale)
            .attr('y', (datapoint) => canvasHeight - (datapoint * barsScale))
            .delay((datapoint, iteration) => iteration * 200);

        // Showing values above each bar
        svgCanvas.select('.inside-rect').selectAll('text').data(allValues).enter().append('text')
            .style('font-size', '25%')
            .style('font-weight', (datapoint, iteration) => {
                if (datapoint === d3.max(allValues)) return 'bold';
            })
            .text(datapoint => datapoint)
            .attr('x', (datapoint, iteration, groups) => {
                const { width } = groups[iteration].getBBox();
                const x = barsMargin + iteration * (barsWidth + barsMargin);
                const newPosition = x + (barsWidth - width) / 2;

                return newPosition;
            }).attr('y', canvasHeight - 1)
            .text(0)
            // Animation
            .transition()
            .duration(duration)
            .tween('text', (datapoint, iteration, groups) => {
                const element = groups[iteration];
                const newNumber = d3.interpolateNumber(element.textContent, datapoint);

                 return (progress) => {
                     const newText = parseInt(format(newNumber(progress)));
                     return d3.select(element).text(newText);
                }
            })
            .attr('y', datapoint => canvasHeight - (datapoint * barsScale) - 1)
            .delay((datapoint, iteration) => iteration * 200);
    };

    useEffect(() => {
        drawBarChart();
    }, []);

    return (
        <div className="canvas"></div>
    );
};

export default Chart;