import React from 'react';
import './styles.css';

const SearchResult = (props) => {
    const { result } = props;
    const delay = props.delay || 0;

    return (
        <div onClick={props.onClick}
            className="search-result"
            style={{ animationDelay: delay }}>
            <img src={result.image.url} alt={result.name} style={{ animationDelay: delay + 200 }} />

            <div className="search-result__info">
                <h4>{result.name}</h4>
                <p>{result.biography['full-name']}</p>
                <i>{result.biography.publisher}</i>
            </div>
        </div>
    );
};

export default SearchResult;