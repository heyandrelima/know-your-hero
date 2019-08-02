import React, { useEffect } from 'react';
import * as d3 from 'd3';
import { format } from 'util';

const Chart = (props) => {
    const { name, data, duration, id } = props;

    const drawBarChart = () => {
        let allValues = [];
        data.forEach((item, index) => {
            allValues.push(parseFloat(item.value));
        });

        // Defining values
        const barsWidth = 10;
        const barsMargin = 5;
        const barsScale = 0.5;
        const canvasWidth = allValues.length * (barsWidth + barsMargin) + barsMargin;
        const canvasHeight = parseInt(d3.max(allValues) * barsScale) * 1.3;
        const canvas = d3.select(`#stats-${id}`);
        canvas.html('');

        // Title of the chart
        canvas.append('h4').text(() => name)
            .style('text-transform', 'capitalize').style('font-size', '1.4em')
            .style('text-align', 'center');

        // Creating canvas
        const svgCanvas = canvas.append('svg')
            .attr('preserveAspectRatio', 'xMaxYMin meet')
            .attr('viewBox', `0 0 ${canvasWidth} ${canvasHeight}`)
            .style('overflow', 'visible').attr('stroke', 1);

        // Group for the bars
        svgCanvas.append('g').attr('class', 'inside-rect')
            .style('transform', 'translate(0, -5%)');

        // Labels for the bars
        svgCanvas.append('g').attr('class', 'labels-group').style('transform', 'translate(0, 100%)')
            .selectAll('text').data(data).enter()
            .append('text').text(datapoint => datapoint.character)
            .style('font-size', '10%')
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

    // Redraw on every render in case there's new data
    drawBarChart();

    return (
        <div id={`stats-${id}`} style={{ width: "300px", marginBottom: "1em", marginTop: "1em" }} ></div>
    );
};

export default Chart;