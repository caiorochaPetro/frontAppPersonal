import {useState, useRef, useEffect} from 'react';

import ButtonAppBar from '../comp/top';

import {useQuery, useMutation, gql} from '@apollo/client';

import {Button, Container} from '@mui/material';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const SET_POST = gql`
  mutation setPost($input: inPost!) {
    setPost(input: $input) {
      status
      title
      content
      link
    }
  }
`;


export default function EditPage(){
    return(
        <Container>
            <ButtonAppBar></ButtonAppBar>
            <Edit></Edit>
        </Container>
    );
}

function Edit(){

    const [PostInput] = useMutation(SET_POST);
    let [title, setTitle] = useState("");
    let [content, setContent] = useState("");
    let [link, setLink] = useState("");
    let [short, setShort] = useState("");
    let [status, setStatus] = useState("developing");

    const [loginData, setLoginData] = useState(null);

    useEffect(()=>{
      
      setLoginData(localStorage.getItem('token'));
    },[loginData]);
    
    function handleCreatePost() {
      PostInput({
        variables: {
          input: {
            title: title,
            content: content,
            short:short,
            link: link,
            status: status,
          },
        },
      });     
    }
    if (loginData !== null){
    return(
      <div>
         <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell><input placeholder='Entre com o título' value={title} onChange={(event)=>{setTitle(event.target.value)}}></input></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Content</TableCell>
                <TableCell><textarea placeholder='Texto Principal do post' rows={40} cols={100} onChange={(event)=>{setContent(event.target.value)}}>{content}</textarea></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Short</TableCell>
                <TableCell> <textarea placeholder='Texto curto de chamada' rows={20} cols={100} onChange={(event)=>{setShort(event.target.value)}}>{short}</textarea></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Link</TableCell>
                <TableCell><input placeholder='Link para o repositório' value={link}  onChange={(event)=>{setLink(event.target.value)}}></input></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Status</TableCell>
                <TableCell>      
                  <select onChange={(event)=>{setStatus(event.target.value)}}>
                    <option value={"developing"}>Under Dev</option>
                    <option value={"finished"}>Finished</option>
                  </select>
                </TableCell>
              </TableRow>
              </Table>
          </TableContainer>
      <Button onClick={()=>handleCreatePost()} type="button">SEND</Button>
      <h2>Preview</h2>
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
      </div>
    );
  }
else{
  return(
    <div>Página inacessivel</div>
  );
}}