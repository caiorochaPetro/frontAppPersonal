import {gql} from "@apollo/client";

export const GET_ONE = gql`
  query getOnePost($id: Int) {
    getOnePost(id:$id) {
      id
      status
      title
      content
      short
      createdAt
      updatedAt
      link
    }
  }
`;

export const UPADATE_POST = gql`
  mutation updatePost($input: inOnePost!) {
    updatePost(input:$input) {
      id
      status
      title
      content
      short
      createdAt
      updatedAt
      link
    }
  }
`;

export const DELETE_POST = gql`
  mutation deleteOnePost($id: Int) {
    deleteOnePost(id: $id) {
      status
      title
      content
      link
    }
  }
`;


export const GET_ALL_POSTS = gql`
  query {
    getAllPosts {
      id
      status
      title
      short
      content
      createdAt
      updatedAt
      link
    }
  }
`;

/*
from api the end pint that is used to set a new post content
*/

export const SET_POST = gql`
  mutation setPost($input: inPost!) {
    setPost(input: $input) {
      status
      title
      short
      content
      link
    }
  }
`;

export const GET_USER = gql`
  query getOneUser($input: passName){
    getOneUser(input: $input){
      token
    }
  }
`;
