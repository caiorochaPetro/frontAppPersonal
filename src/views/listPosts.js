//MUI MATERIALS
import {Box, Container, Grid, Paper, Card, Link, Select} from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
//Navigation
import { useParams } from 'react-router-dom';
//Personal Compoennts
import ButtonAppBar from '../comp/top'
//Data Handle from API
import { gql, useQuery, useMutation } from "@apollo/client";
//Hooks
import { useState, useEffect } from 'react';
//API REQUEST END POINTS
import {DELETE_POST, UPADATE_POST, GET_ONE} from '../queries/queries';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export default function ListPage(){
  let [isLogged, setIslogged] = useState(false);
    return(
        <Container>
            <ButtonAppBar></ButtonAppBar>
            {!isLogged?<Home></Home>:<div>Log In pordavor</div>}
            
        </Container>
    );
}

function Home(){
    const [DeleteInput] = useMutation(DELETE_POST);
    const [UpdateInput] = useMutation(UPADATE_POST);
    const {urlid} = useParams();
    let myid = urlid;
    const { loading, error, data } = useQuery(GET_ONE, {variables:{id: parseInt(myid)}});
    const [lid, setId] = useState(null);
    const [status, setStatus] = useState(null);
    const [title, setTitle] = useState(null);
    const [content, setContent] = useState(null);
    const [short, setShort] = useState("");
    const [link, setLink] = useState(null);

    const [loginData, setLoginData] = useState(null);

    //response elements

    const [delres, setDelres] = useState(undefined);
    const [updateres, setUpdateres] = useState(undefined);

    
    useEffect(() => {
        if (!loading && !error) {
            setId(data.getOnePost.id);
            setStatus(data.getOnePost.status);
            setTitle(data.getOnePost.title);
            setContent(data.getOnePost.content);
            setShort(data.getOnePost.short);
            setLink(data.getOnePost.link);
        }
        setLoginData(localStorage.getItem('token'));
      }, [loading, error, loginData]);

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>Erro: {error.message}</p>;

    

    function handleDelete(args){
        
        let idLoc = args;
        DeleteInput({
            variables: {
              id: idLoc
            },
          }).then((response)=>{
            const statusCode = response.status;
            setDelres(statusCode);
          })
        };

    function handleUpdade(){
        UpdateInput({
            variables:{
                input:{
                    id: lid,
                    content: content,
                    short: short,
                    title: title,
                    status: status,
                    link: link
                } 
            },
            }).then((response)=>{
                const statusCode = response.status;
                setUpdateres(statusCode);
            })
        };


    if (loginData !== null){
    if(!loading && !error && lid){    return(
    <div key={lid}>
        <Card style={status=="developing"?{backgroundColor:'burlywood'}:{backgroundColor:''}}>
            <CardContent>
                {status=="developing"?<Typography variant='h2'>Under Development</Typography>:<></>}
                <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell><input value={title} onChange={(event)=>{setTitle(event.target.value)}}></input></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Content</TableCell>
                        <TableCell> <textarea placeholder='Texto Principal do post' rows={40} cols={100} value={content} onChange={(event)=>{setContent(event.target.value)}}></textarea></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Short</TableCell>
                        <TableCell> <textarea placeholder='Texto Principal do post' rows={20} cols={100} value={short} onChange={(event)=>{setShort(event.target.value)}}></textarea></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Link</TableCell>
                        <TableCell><input value={link} onChange={(event)=>{setLink(event.target.value)}}></input></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Status</TableCell>
                        <TableCell>
                            <select value={status} onChange={(event)=>{setStatus(event.target.value)}}>
                                <option value={"developing"}>Developing</option>
                                <option value={"finished"}>Finished</option>
                            </select></TableCell>
                    </TableRow>
                    </Table>
                </TableContainer>
                <h2>PREVIEW</h2>
                     <div dangerouslySetInnerHTML={{ __html: content }}></div>
                        <Button onClick={()=>{handleDelete(lid)}} >DELETE</Button>
                        <Button onClick={()=>{handleUpdade()}} >Update</Button>
                        <div id="response zone">
                            {delres!=undefined?<div>deletado!</div>:<div></div>}
                            {updateres!=undefined?<div>atualizado!</div>:<div></div>}
                        </div>
                        </CardContent>
                </Card>
            </div>
        );
    }}
    else{
        return(
            <div>
                <p>
                    Página inacessível
                </p>
            </div>
        );
    }
}