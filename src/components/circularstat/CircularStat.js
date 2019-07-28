import React, { useState, useEffect } from 'react';

import '../../index.css';
import Circle from './circle';

const CircularStat = (props) => {
    const { min, max, target, duration, color, title } = props;

    const minPercentage = min / max * 100;
    const targetPercentage = target / max * 100;
    const [currentPercentage, setCurrentPercentage] = useState(minPercentage);

    const [currentText, setCurrentText] = useState(min);

    const animatePercentage = () => {
        setCurrentPercentage(minPercentage);

        setTimeout(() => {
            setCurrentPercentage(targetPercentage);
        }, 100);
    };

    const animateText = () => {
        const tick = (target - min) / (duration * 1000 / 40);
        let currentNumber = min;

        const animInterval = setInterval(() => {
            currentNumber = parseInt(currentNumber + tick);
            setCurrentText(currentNumber)

            if (currentNumber >= target) {
                setCurrentText(target);
                clearInterval(animInterval);
            }
        }, 40);
    };

    const resetAnimation = () => {
        setCurrentPercentage(minPercentage);
        setCurrentText(min);

        setTimeout(() => {
            setCurrentPercentage(targetPercentage);
            animateText();
        }, duration * 1000);
    };

    useEffect(() => {
        animatePercentage();
        animateText();
    }, []);

    return (
        <div onMouseEnter={() => resetAnimation()}
            className="circular-stat"
            style={{ width: '80px', textAlign: 'center', display: 'inline-block', marginRight: '12px' }}>
            
            <h4 style={{ marginBottom: '6px', marginLeft: '-4px' }}>{title}</h4>
            <Circle stroke={color} percentage={currentPercentage} text={currentText} duration={duration} />
        </div>
    );
};

export default CircularStat;