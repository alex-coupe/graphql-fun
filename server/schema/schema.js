const graphql = require('graphql');

const {GraphQLObjectType, GraphQLString} = graphql;

const FilmType = new GraphQLObjectType({
    name: 'Film',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        genre: {type: GraphQLString}
    })
});