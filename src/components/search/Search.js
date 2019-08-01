import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { ADD_CHARACTER } from '../../redux/actionTypes';
import SearchResult from '../searchResult/SearchResult';

// Declaring controller outside of render to prevent it to be reinitialized
let controller = new AbortController();
let signal = controller.signal;

const Search = () => {
    const [query, setQuery] = useState('');
    const [currentQuery, setCurrentQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const dispatch = useDispatch();

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

    const selectResult = (character) => {
        dispatch({ type: ADD_CHARACTER, payload: character });
        setCurrentQuery('');
        setQuery('');
        setSearchResults([]);
    };

    return (
        <div>
            <input type="text" style={styles.input}
                name="q" autoComplete="off" placeholder="Search"
                value={query}
                onChange={updateQuery} onKeyUp={updateQuery} />

            <div style={styles.resultsHolder}>
                {searchResults ?
                    searchResults.map((result, index) => {
                        return (
                            <SearchResult onClick={() => selectResult(result)}
                                result={result} delay={100 * index} key={result.id} />
                        )
                    })
                    : ''}
            </div>
        </div>
    );
};

let styles = {
    input: {
        width: 'calc(100% - 1em)',
        fontSize: '1.4em',
        padding: '0.2em 0.4em',
        border: '1px solid #ccc',
    },
    resultsHolder: {
        position: 'absolute',
        width: '100%',
        maxHeight: '50vh',
        overflowY: 'auto',
        backgroundColor: '#fff',
        zIndex: 1,
    }
};

export default Search;