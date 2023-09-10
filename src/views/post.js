import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import { useQuery } from "@apollo/client";

import {GET_ONE} from '../queries/queries';

import ButtonAppBar from '../comp/top';


import { Button, Container } from "@mui/material";


export default function Posts(){
    const [lid, setId] = useState(null);
    const [status, setStatus] = useState(null);
    const [title, setTitle] = useState(null);
    const [content, setContent] = useState(null);
    const [short, setShort] = useState("");
    const [link, setLink] = useState(null);

    const {postid} = useParams();

    const {error, loading, data} = useQuery(GET_ONE, {variables:{
        id: parseInt(postid)
    }});

    loading? <div>Carregando</div>:<></>
    error? <div>{error}</div>:<></>


    useEffect(() => {
        if (!loading && !error && data.getOnePost) {
            setId(data.getOnePost.id);
            setStatus(data.getOnePost.status);
            setTitle(data.getOnePost.title);
            setContent(data.getOnePost.content);
            setShort(data.getOnePost.short);
            setLink(data.getOnePost.link);
        }
    }, [loading, error, data]);
      if(data && data.getOnePost){
    return(
    <Container>
        <ButtonAppBar></ButtonAppBar>
            <h1>{title}</h1>
            {link?<Button><a href={link}>Repositório</a></Button>:<></>}
            <div dangerouslySetInnerHTML={{ __html: content }}></div>
    </Container>
    );
}
else{
    return<Container><div>notFOund</div></Container>
}}