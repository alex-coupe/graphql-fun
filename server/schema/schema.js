const graphql = require('graphql');
const _ = require('lodash');
const Film = require('../models/Film');
const Director = require('../models/Director');

const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList} = graphql;


const FilmType = new GraphQLObjectType({
    name: 'Film',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        director: {
            type: DirectorType,
            resolve(parent, args){
                
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
               
            }
        },
        director: {
            type: DirectorType,
            args: {id: {type:GraphQLID}},
            resolve(parent, args){
               
            }
        },
        films: {
            type: new GraphQLList(FilmType),
            resolve(parent, args){
                
            }
        },
        directors: {
            type: new GraphQLList(DirectorType),
            resolve(parent, args){
                
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
                name: {type:GraphQLString},
                age: {type:GraphQLInt}
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
                name: {type:GraphQLString},
                genre: {type:GraphQLString},
                directorId: {type: GraphQLID }
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