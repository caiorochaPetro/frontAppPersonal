import React, { useEffect, useState, useContext } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_USER } from '../queries/queries';

import { useNavigate } from 'react-router-dom';

import {MyContext} from '../index';
import { Button, Typography } from '@mui/material';
import { Grid, TextField, Box } from '@mui/material';

import LoadComp from '../comp/load'


function Login() {
  const navigate = useNavigate()
  const [token, setToken] = useState(null);
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [getSomeData, { loading, error, data }] = useLazyQuery(GET_USER);

  const handleLogin = async () => {
    let nameArg = user;
    let passArg = pass;
    // Chame getSomeData com as variáveis atualizadas
    try{
    const response = await getSomeData({
      variables: {
        input: {
          name: nameArg,
          pass: passArg,
        },
      },
    });


      //;

  }
  catch(error){
    console.log(error)
  }
  };

  const logOut = () => {
    try{
      localStorage.clear();
      setToken(null);
      console.log(localStorage.getItem('token'));
    }
    catch{}
  }

  useEffect(() => {
    if(!error && !loading && data &&data.getOneUser){
      let Localtoken = data.getOneUser.token;

      console.log("test: "+Localtoken);
      setToken(Localtoken);
      localStorage.setItem('token', Localtoken);
    }
    
    if(localStorage.getItem('token') !== null){
      console.log(token);
      return navigate("/");
    }
    

  }, [token, data]);

  
  if(token !== null ){ return (<div><Button onClick={logOut}>Logout</Button></div>);}
  else {
  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
    <Box>
      <Typography align='center' variant='h1'>Welcome</Typography>
      <TextField
        label="Name"
        value={user}
        onChange={(event) => setUser(event.target.value)}
        margin="normal"
        style={{margin:20}}
      />
      <TextField
        label="Password"
        type="password"
        value={pass}
        onChange={(event) => setPass(event.target.value)}
        margin="normal"
        style={{margin:20}}
      />
      <Button variant="contained" color="primary" onClick={handleLogin}   style={{marginTop: 30}}>
        Log IN
      </Button>
      <div>
        {loading ? <div><LoadComp></LoadComp></div> : error ? <div>{error.message}</div> : console.log(data)}
      </div>
    </Box>
  </Grid>
);
}
}

export default Login;
