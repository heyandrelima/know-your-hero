import React, { useState, useEffect } from 'react';
import posed from 'react-pose';
import { useDispatch } from 'react-redux';

import { REMOVE_CHARACTER, ADD_STAT } from '../../redux/actionTypes';

import './styles.css';
import CircularStat from '../circularstat/CircularStat';

const AccordionContent = posed.div({
    closed: { height: 0 },
    open: { height: 'auto' }
});

const Character = (props) => {
    const { character, units } = props;
    const [open, setOpen] = useState('stats');
    const dispatch = useDispatch();
    const circularStats = Object.keys(character.powerstats).map((key) => [key, character.powerstats[key]]);

    const openAccordion = (id) => {
        if (open !== id) setOpen(id);
        else setOpen('');
    };

    const removeCharacter = (char) => {
        dispatch({ type: REMOVE_CHARACTER, payload: char });
    };

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    useEffect(() => {
        return () => {
            console.log('will unmonunt');
        };
    }, []);

    return (
        <div className="card">
            <div className="card-header">
                <span className="remove-card"
                    onClick={() => removeCharacter(character)}>&times;</span>
                <img src={character.image.url} alt={character.name} />

                <h1 className="card-name">{character.name}</h1>
                <h2 className="margin-0">{character.biography['full-name']}</h2>

                <i>{character.biography.publisher}</i>
            </div>

            <div className={`accordion ${open === 'biography' ? 'open' : ''}`}>
                <h2 onClick={() => openAccordion('biography')}>Biography</h2>

                <AccordionContent pose={open === 'biography' ? 'open' : 'closed'} className="accordion__content">
                    <div className="single-line">
                        <h4>Place of birth</h4>
                        <p>{character.biography['place-of-birth']}</p>
                    </div>

                    <div className="single-line">
                        <h4>Race</h4>
                        <p>{character.appearance.race}</p>
                    </div>

                    <div className="single-line">
                        <h4>Gender</h4>
                        <p>{character.appearance.gender}</p>
                    </div>

                    <div className="single-line">
                        <h4>Height</h4>
                        <p>
                            {units === "imperial" ? character.appearance.height[0] : character.appearance.height[1]}
                        </p>
                    </div>

                    <div className="single-line">
                        <h4>Weight</h4>
                        <p>
                            {units === "imperial" ? character.appearance.weight[0] : character.appearance.weight[1]}
                        </p>
                    </div>

                    <h4>Family</h4>
                    <p>{character.connections.relatives}</p>

                    <div className="single-line">
                        <h4>Work</h4>
                        <p>{character.work.occupation}</p>
                    </div>

                    <div className="single-line">
                        <h4>First appearance</h4>
                        <p>{character.biography['first-appearance']}</p>
                    </div>

                    <h4>Aliases</h4>
                    <ul className="aliases">
                        {character.biography.aliases.map((alias, key) => (
                            <li key={key}>{alias}</li>
                        ))}
                    </ul>

                    <h4>Alter egos</h4>
                    <p>{character.biography['alter-egos']}</p>
                </AccordionContent>
            </div>

            <div className={`accordion ${open === 'stats' ? 'open' : ''}`}>
                <h2 onClick={() => openAccordion('stats')}>Stats</h2>

                <AccordionContent pose={open === 'stats' ? 'open' : 'closed'} className="accordion__content">
                    {circularStats.map((stat, index) => {
                        const color = getRandomColor();
                        return (
                            <CircularStat key={index}
                                title={stat[0]} min={0} max={100}
                                color={color} target={stat[1]}
                                duration={1000} delay={index * 100} character={character} />
                        )
                    })}
                </AccordionContent>
            </div>
        </div>
    );
};

export default Character;