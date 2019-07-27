import React from 'react';

export default (props) => {
    const { stroke, percentage, text, duration } = props;
    const strokeDashoffset = `${289.027 - 289.027 * (percentage / 100)}px`;

    const styles = {
        container: {
            strokeDasharray: '289.027px, 289.027px',
            strokeDashoffset: '0px',
            stroke: '#ccc'
        },
        fill: {
            strokeDasharray: '289.027px, 289.027px',
            strokeLinecap: 'round',
            strokeDashoffset,
            stroke,
            transition: `stroke-dashoffset ${duration}s`
        },
        text: {
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            textAlign: 'center',
            height: '1em',
            margin: 'auto'
        }
    };

    return(
        <div style={{ position: 'relative' }}>
            <svg viewBox="0 0 100 100">
                <path d="M 50,50
                m 0,-46
                a 46,46 0 1 1 0,92
                a 46,46 0 1 1 0,-92"
                strokeWidth="8" fillOpacity="0" style={styles.container}>
                </path>
                <path d="M 50,50
                m 0,-46
                a 46,46 0 1 1 0,92
                a 46,46 0 1 1 0,-92"
                strokeWidth="8" fillOpacity="0" style={styles.fill}>
                </path>
            </svg>

            <span style={styles.text}>{text}</span>
        </div>
    );
};