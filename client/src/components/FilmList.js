import React from 'react';
import {gql} from 'apollo-boost';
import {graphql} from 'react-apollo';

const getFilmsQuery = gql`
{
    films{
        name
        genre
        id
    }
}
`

function displayFilms(props) {
    const data = props.data;
    if (data.loading) 
        return (<div>Loading Films...</div>);

    return data.films.map(film => {
        return(<li key={film.id}>{film.name}</li>)
    });
    
}

function FilmList(props) {
  return (
    <div >
     <ul id="film-list" >
         {displayFilms(props)}
     </ul>
    </div>
  );
}

export default graphql(getFilmsQuery)(FilmList);
