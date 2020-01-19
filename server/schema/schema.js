const graphql = require('graphql');
const _ = require('lodash');

const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt} = graphql;

/////DUMMY DATA
const films = [
    {name: 'A New Hope', genre: 'Sci-Fi', id:'1' },
    {name: 'The Two Towers', genre: 'Fantasy', id: '2'},
    {name: 'Avengers', genre: 'Superhero', id:'3'}
];

const directors = [
    {name: 'George Lucas', age: 75, id:'1' },
    {name: 'Peter Jackson', age: 58, id: '2'},
    {name: 'Joss Whedon', age: 55, id:'3'}
];
////////

const FilmType = new GraphQLObjectType({
    name: 'Film',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString}
    })
});

const DirectorType = new GraphQLObjectType({
    name: 'Director',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt}
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        film: {
            type: FilmType,
            args: {id: {type:GraphQLID}},
            resolve(parent,args){
                // get data from DB / other source
                return _.find(films, {id:args.id});
            }
        },
        director: {
            type: DirectorType,
            args: {id: {type:GraphQLID}},
            resolve(parent, args){
                return _.find(directors, {id:args.id});
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});