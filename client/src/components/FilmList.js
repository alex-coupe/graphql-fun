import React, {useState} from 'react';
import {graphql} from 'react-apollo';
import {getFilmsQuery} from '../queries/queries';
import FilmDetails from './FilmDetails';


function displayFilms(props, setSelected) {
    const data = props.data;
    if (data.loading) 
        return (<div>Loading Films...</div>);

    return data.films.map(film => {
        return(<li key={film.id} onClick={(e) => setSelected(film.id)}>{film.name}</li>)
    });
    
}

function FilmList(props) {
  const [selected, setSelected] = useState("");
  return (
    <div >
     <ul id="film-list" >
         {displayFilms(props, setSelected)}
     </ul>
     <FilmDetails filmId={selected}/>
    </div>
  );
}

export default graphql(getFilmsQuery)(FilmList);
