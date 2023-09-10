import './App.css';
import { useRef, useState, useEffect, useContext } from 'react';
import {Box, Container, Grid, Paper, Card, Link, Select, Stack, Pagination} from '@mui/material';

import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import ButtonAppBar from './comp/top';
import LoadAnimated from './comp/load'

import { useQuery, useMutation } from "@apollo/client";

/*
frrom Api the end point that are used to get all posts from ET_ALL_POSTS end point.
*/

import {GET_ALL_POSTS} from './queries/queries';
import { useNavigate, useParams } from 'react-router-dom';

export function App() {

  return(
  <Container>
    <ButtonAppBar></ButtonAppBar>
    <Home></Home>
  </Container>
  );
}

//The componento used as interface to create a new post data and send to API

//The component to render the posts from api
function Home(){
    const localpage=1;
    const { page } = useParams();
    const [currentPage, setCurrentPage] = useState(page?page:localpage);
    const amount = 5;

    const navigate = useNavigate();
    const { loading, error, data } = useQuery(GET_ALL_POSTS,{variables:{page:parseInt(currentPage), amount:parseInt(amount)}});
    const [loginData, setLoginData] = useState(null);

    //page qtd


    const handlePageChange = (event, newPage) => {
      setCurrentPage(newPage);
      // Atualize o estado da página atual
      navigate("/"+newPage);
    };

    useEffect(() => {
      document.title = "IoEng";
      setLoginData(localStorage.getItem('token'));

    }, [loginData]);

    const logOut = () => {
      try{
        localStorage.clear();
        setLoginData(null);
      }
      catch{}
    }
    //setLoginData(localStorage.getItem('token'));
    if (loading) return <p><LoadAnimated></LoadAnimated></p>;
    if (error) return <p>Erro: {error.message}</p>;

  if (loginData !== null){

  return(
    <div>
      <Button onClick={logOut}>Logout</Button>
      {data.getAllPosts.posts.map((cont)=>{
        return(
            <Card key={cont.id} style={cont.status=="developing"?{backgroundColor:'burlywood'}:{backgroundColor:''}}>
              <CardContent>
                {cont.status=="developing"?<Typography variant='h2'>[Under Development]</Typography>:<div></div>}
                
              <Typography sx={{ fontSize: 30 }} color="text.secondary" gutterBottom><a href={"/post/" + cont.id}>{cont.title}</a></Typography>
              <div dangerouslySetInnerHTML={{ __html: cont.short }}></div>
              <Typography variant="body2"> {cont.createdAt}</Typography>
                <Button href={cont.link} variant='outlined'>SOURCE CODE</Button>
                <Button href={"/list/" + cont.id} variant='outlined'>Edit</Button>
                
              </CardContent>
            </Card>
        );
      })}
      <Stack>
      <Pagination count={Math.ceil(data.getAllPosts.total/amount)} page={currentPage} onChange={handlePageChange}></Pagination>
    </Stack>
    </div>
  );
  }
  else{
    return(
    <div>
    {data.getAllPosts.posts.map((cont)=>{
      return(
          <Card key={cont.id} style={cont.status=="developing"?{backgroundColor:'burlywood'}:{backgroundColor:''}}>
            <CardContent>
              {cont.status=="developing"?<Typography variant='h2'>[Under Development]</Typography>:<></>}
              
              <Typography sx={{ fontSize: 30 }} color="text.secondary" gutterBottom><a href={"/post/" + cont.id}>{cont.title}</a></Typography>
            <div dangerouslySetInnerHTML={{ __html: cont.short }}></div>
            <Typography variant="body2"> {cont.createdAt}</Typography>
              {cont.link?<Button href={cont.link} variant='outlined'>SOURCE CODE</Button>:<></>}
             
            </CardContent>
          </Card>
      );
    })}
    <Stack style={{alignItems:'center', marginTop:20}}>
      <Pagination count={Math.ceil(data.getAllPosts.total/amount)} page={currentPage} onChange={handlePageChange}></Pagination>
    </Stack>
  </div>
  )}};
