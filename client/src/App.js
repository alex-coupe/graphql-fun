import React from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import FilmList from './components/FilmList';
import AddFilm from './components/AddFilm';

const client = new ApolloClient({
  uri:'http://localhost:4000/graphql',
});


function App() {
  return (
    <ApolloProvider client={client}>
    <div className="App">
     <h1>My Film List</h1>
     <FilmList />
     <AddFilm />
    </div>
    </ApolloProvider>
  );
}

export default App;
