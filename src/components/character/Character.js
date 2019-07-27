import React, { useEffect } from 'react';

import './styles.css';

const Character = (props) => {
    const { character, units } = props;

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

            <div>
                <h2>Biography</h2>

                <h4>Place of birth</h4>
                <p>{character.biography['place-of-birth']}</p>

                <h4>Race</h4>
                <p>{character.appearance.race}</p>

                <h4>Gender</h4>
                <p>{character.appearance.gender}</p>

                <h4>Height</h4>
                <p>
                    {units === "imperial" ? character.appearance.height[0] : character.appearance.height[1]}
                </p>

                <h4>Weight</h4>
                <p>
                    {units === "imperial" ? character.appearance.weight[0] : character.appearance.weight[1]}
                </p>

                <h4>Family</h4>
                <p>{character.connections.relatives}</p>

                <h4>Work</h4>
                <p>{character.work.occupation}</p>

                <h4>First appearance</h4>
                <p>{character.biography['first-appearance']}</p>

                <h4>Aliases</h4>
                <ul>
                    {character.biography.aliases.map((alias, key) => (
                        <li key={key}>{alias}</li>
                    ))}
                </ul>

                <h4>Alter egos</h4>
                <p>{character.biography['alter-egos']}</p>
            </div>

            <div>
                <h2>Stats</h2>

                <p>Combat: {character.powerstats.combat}</p>
                <p>Durability: {character.powerstats.durability}</p>
                <p>Intelligence: {character.powerstats.intelligence}</p>
                <p>Power: {character.powerstats.power}</p>
                <p>Speed: {character.powerstats.speed}</p>
                <p>Strength: {character.powerstats.strength}</p>
            </div>
        </div>
    );
};

const styles = {
};

export default Character;