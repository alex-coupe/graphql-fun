import React from 'react';
import {graphql} from 'react-apollo';
import {getFilmQuery} from '../queries/queries';

function FilmDetails(props){
    const {film} = props.data;
    if (film){
        return (
            <div id="film-details">
                <h2>{film.name}</h2>
                <p>{film.genre}</p>
                <p>{film.director.name}</p>
                <p>All films by this director:</p>
                <ul className="other-films">
                    {film.director.films.map(item => {
                        return (<li key={item.id}>{item.name}</li>)
                    })}
                </ul>
            </div>
        )
    }
    else {
        return <div id="film-details">
            No film selected....
        </div>
    }
}

export default graphql(getFilmQuery, {
    options: (props) => {
        return {
            variables: {
                id: props.filmId
            }
        }
    }
})(FilmDetails);