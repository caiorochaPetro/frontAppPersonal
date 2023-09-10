import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {App} from './App';
import reportWebVitals from './reportWebVitals';

import { useState } from 'react';

import {setContext} from '@apollo/client/link/context'

import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './views/login';
import EditPage from './views/editor';
import ListPage from './views/listPosts';
import Posts from './views/post';
import Projects from './views/projects/projects';
import Search from './views/search';

import NotFound from './views/notFound';

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token'); // Recupere o token do armazenamento local
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '', // Adicione o token aos cabeçalhos se estiver presente
    },
  };
});

const httpLink = createHttpLink({

  uri: 'http://apipersonalapp.azurewebsites.net/graphql',

});

const client = new ApolloClient({
  uri: "http://apipersonalapp.azurewebsites.net/graphql", // Substitua pelo seu URI GraphQL
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router>
        <Routes>
            <Route path="/"  element={<App/>} />
            <Route path="/:page"  element={<App/>} />
            <Route path='/login' element={<Login/>}/>
            <Route path="/Editor" element={<EditPage/>} />
            <Route path="/List/:urlid" element={<ListPage/>} />
            <Route path="/post/:postid" element={<Posts/>} />
            <Route path="/project" element={<Projects/>} />
            <Route path="/search/:key" element={<Search/>} />
            <Route element={<NotFound/>} />
        </Routes>
      </Router>
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
