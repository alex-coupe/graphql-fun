const graphql = require('graphql');
const Film = require('../models/Film');
const Director = require('../models/Director');

const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull} = graphql;


const FilmType = new GraphQLObjectType({
    name: 'Film',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        director: {
            type: DirectorType,
            resolve(parent, args){
                return Director.findById(parent.directorId);
            }
        }
    })
});

const DirectorType = new GraphQLObjectType({
    name: 'Director',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        films: {
            type: new GraphQLList(FilmType),
            resolve(parent, args){
                return Film.find({
                    directorId: parent.id
                });
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        film: {
            type: FilmType,
            args: {id: {type:GraphQLID}},
            resolve(parent,args){
               return Film.findById(args.id);
            }
        },
        director: {
            type: DirectorType,
            args: {id: {type:GraphQLID}},
            resolve(parent, args){
               return Director.findById(args.id)
            }
        },
        films: {
            type: new GraphQLList(FilmType),
            resolve(parent, args){
                return Film.find({});
            }
        },
        directors: {
            type: new GraphQLList(DirectorType),
            resolve(parent, args){
                return Director.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addDirector: {
            type:DirectorType,
            args:{
                name: {type:new GraphQLNonNull(GraphQLString)},
                age: {type:new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parents, args){
                let director = new Director({
                    name: args.name,
                    age: args.age
                });
                return director.save();
            }
        },
        addFilm: {
            type:FilmType,
            args:{
                name: {type: new GraphQLNonNull(GraphQLString)},
                genre: {type: new GraphQLNonNull(GraphQLString)},
                directorId: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parents, args){
                let film = new Film({
                    name: args.name,
                    genre: args.genre,
                    directorId: args.directorId
                });
                return film.save();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});