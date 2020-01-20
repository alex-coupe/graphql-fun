import React, { useState } from 'react';
import {getDirectorsQuery, addFilmMutation, getFilmsQuery} from '../queries/queries';
import {graphql} from 'react-apollo';
import {flowRight as compose} from 'lodash';


function displayDirectors(props){
    const data = props.getDirectorsQuery;
    if (data.loading)
        return(<option disabled>Loading Directors</option>);
    
    return data.directors.map(director => {
        return(<option key={director.id} value={director.id}>{director.name}</option>)
    });
}

function submitForm(e, props, data){
    e.preventDefault();
    props.addFilmMutation({
        variables: {
            name: data.filmName,
            genre: data.genre,
            directorId: data.directorId
        },
        refetchQueries: [{query: getFilmsQuery}]
    });
}

function AddFilm(props){

    const [filmName, setFilmName] = useState("");
    const [genre, setGenre] = useState("");
    const [directorId, setDirectorId] = useState("");

    return(
        <form id="add-film" onSubmit={(e) => submitForm(e, props, {filmName,genre,directorId})}>

            <div className="field">
                <label>Film Name:</label>
                <input type="text" onChange={(e) => setFilmName(e.target.value)} />
            </div>

            <div className="field">
                <label>Genre:</label>
                <input type="text" onChange={(e) => setGenre(e.target.value)}/>
            </div>

            <div className="field">
                <label>Author:</label>
                <select onChange={(e) => setDirectorId(e.target.value)}>
                    <option>Select Director...</option>
                    {displayDirectors(props)}
                </select>
            </div>

            <button>+</button>
        </form>
    );
}

export default compose(
    graphql(getDirectorsQuery, {name: "getDirectorsQuery"}),
    graphql(addFilmMutation, {name: "addFilmMutation"})
    )(AddFilm);