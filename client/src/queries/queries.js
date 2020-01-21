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

const getFilmQuery = gql`
query($id: ID){
    film(id:$id){
        id
        name
        genre
        director{
            name
            id
            age
            films{
                name
                id
            }
        }
    }
}
`

export{
    getDirectorsQuery,getFilmsQuery, addFilmMutation, getFilmQuery
}