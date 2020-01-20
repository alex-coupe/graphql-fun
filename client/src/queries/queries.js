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

export{
    getDirectorsQuery,getFilmsQuery
}