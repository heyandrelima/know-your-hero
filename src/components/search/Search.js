import React, { useState, useEffect } from 'react';

import SearchResult from '../searchResult/SearchResult';

// Declaring controller outside of render to prevent it to be reinitialized
let controller = new AbortController();
let signal = controller.signal;

const Search = (props) => {
    const [query, setQuery] = useState('');
    const [currentQuery, setCurrentQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const updateQuery = (event) => {
        controller.abort();
        const { value } = event.target;

        setQuery(value);

        if (query.length >= 3 && query !== currentQuery) callSearch();
        else if (query.length === 0) setSearchResults([]);
    };

    const callSearch = () => {
        controller = new AbortController();
        signal = controller.signal;

        const baseUrl = `https://superheroapi.com/api.php/${process.env.REACT_APP_ACCESS_TOKEN}/search/`;
        const urlToFetch = baseUrl + query;
        let options = {
            method: 'GET',
            mode: 'cors',
            signal
        };

        setTimeout(() => {
            fetch(urlToFetch, options).then((response) => {
                response.json().then((json) => setSearchResults(json.results));
            }).catch(error => console.log('Error!', error));

            setCurrentQuery(query);
        }, 200);
    };

    const selectResult = (index) => {
        let newSearchResults = searchResults;
        newSearchResults.splice(index, 1);

        setSearchResults([...newSearchResults]);
    };

    useEffect(() => console.log(process.env), []);

    return (
        <div>
            <input type="text" style={styles.input}
                name="q" autoComplete="off" placeholder="Search"
                value={query}
                onChange={updateQuery} onKeyUp={updateQuery} />

            {searchResults ?
                searchResults.map((result, index) => {
                    return (
                        <SearchResult onClick={() => selectResult(index)}
                            result={result} delay={100 * index} key={result.id} />
                    )
                })
                : ''}
        </div>
    );
};

let styles = {
    input: {
        width: "calc(100% - 1em)",
        fontSize: "1.4em",
        padding: "0.2em 0.4em",
        border: "1px solid #ccc"
    }
};

export default Search;