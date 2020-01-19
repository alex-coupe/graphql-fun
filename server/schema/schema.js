const graphql = require('graphql');
const _ = require('lodash');

const {GraphQLObjectType, GraphQLString, GraphQLSchema} = graphql;


const films = [
    {name: 'A New Hope', genre: 'Sci-Fi', id:'1' },
    {name: 'The Two Towers', genre: 'Fantasy', id: 2},
    {name: 'Avengers', genre: 'Superhero', id:'3'}
];

const FilmType = new GraphQLObjectType({
    name: 'Film',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        genre: {type: GraphQLString}
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        film: {
            type: FilmType,
            args: {id: {type:GraphQLString}},
            resolve(parent,args){
                // get data from DB / other source
                return _.find(films, {id:args.id});
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});