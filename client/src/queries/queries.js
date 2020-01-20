import {gql} from 'apollo-boost';

const getDirectorsQuery = gql`
{
    directors{
        name
        id
    }
}
`

const getFilmsQuery = gql`
{
    films{
        name
        genre
        id
    }
}
`

const addFilmMutation = gql`
mutation($name: String!, $genre: String!, $directorId: ID!){
    addFilm(name: $name, genre: $genre, directorId: $directorId){
        name
        id
    }
}

`

export{
    getDirectorsQuery,getFilmsQuery, addFilmMutation
}