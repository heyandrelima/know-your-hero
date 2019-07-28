import React, { useEffect, useState } from 'react';
import posed from 'react-pose';

import './styles.css';
import CircularStat from '../circularstat/CircularStat';

const AccordionContent = posed.div({
    closed: { height: 0 },
    open: { height: 'auto' }
});

const Character = (props) => {
    const { character, units } = props;
    const [open, setOpen] = useState('stats');

    const openAccordion = (id) => {
        if (open !== id) setOpen(id);
        else setOpen('');
    };

    useEffect(() => {
        // const options = {
        //     method: 'GET',
        //     mode: 'cors'
        // };

        // const urlToFetch = `https://superheroapi.com/api.php/${process.env.REACT_ACCESS_TOKEN}/search/spider-man`;

        // fetch(urlToFetch, options).then((response) => {
        //     response.json().then((json) => console.log(json));
        // });

    }, []);

    return (
        <div className="card">
            <div className="card-header">
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
                    <CircularStat
                        title="Combat" min={0} max={100}
                        color="#9C27B0" target={parseInt(character.powerstats.combat)}
                        duration={1000} />
                    <CircularStat
                        title="Durability" min={0} max={100}
                        color="#3F51B5" target={parseInt(character.powerstats.durability)}
                        duration={1000} />
                    <CircularStat
                        title="Intelligence" min={0} max={100}
                        color="#009688" target={parseInt(character.powerstats.intelligence)}
                        duration={1000} />
                    <CircularStat
                        title="Power" min={0} max={100}
                        color="#607D8B" target={parseInt(character.powerstats.power)}
                        duration={1000} />
                    <CircularStat
                        title="Speed" min={0} max={100}
                        color="#CDDC39" target={parseInt(character.powerstats.speed)}
                        duration={1000} />
                    <CircularStat
                        title="Strength" min={0} max={100}
                        color="#F44336" target={parseInt(character.powerstats.strength)}
                        duration={1000} />
                </AccordionContent>
            </div>
        </div>
    );
};

export default Character;