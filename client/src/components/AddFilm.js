import React from 'react';
import {gql} from 'apollo-boost';
import {graphql} from 'react-apollo';

const getDirectorsQuery = gql`
{
    directors{
        name
        id
    }
}
`

function displayDirectors(props){
    const data = props.data;
    if (data.loading)
        return(<option disabled>Loading Directors</option>);
    
    return data.directors.map(director => {
        return(<option key={director.id} value={director.id}>{director.name}</option>)
    });
}

function AddFilm(props){
    return(
        <form id="add-film">

            <div className="field">
                <label>Film Name:</label>
                <input type="text" />
            </div>

            <div className="field">
                <label>Genre:</label>
                <input type="text" />
            </div>

            <div className="field">
                <label>Author:</label>
                <select>
                    <option>Select Director...</option>
                    {displayDirectors(props)}
                </select>
            </div>

            <button>+</button>
        </form>
    );
}

export default graphql(getDirectorsQuery)(AddFilm);