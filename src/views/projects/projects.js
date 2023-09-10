import * as React from 'react';
import { Container } from '@mui/material';
import { useParams } from 'react-router-dom';

import ButtonAppBar from '../../comp/top';
import LoadAnimated from '../../comp/top';

import { useQuery, gql } from '@apollo/client';

//query all prjets
import { GET_PROJECTS } from '../../queries/queries';

export default function Projects(){
    //const {projectid} = useParams();

    const {loading, error, data} = useQuery(GET_PROJECTS);

    if (error) return <div> {error}</div>;
    if (loading) return <LoadAnimated/>


    return(
        <Container>
            <ButtonAppBar></ButtonAppBar>
            {data.getAllProjects.map((pj)=>{
                return(
                    <div id={pj.id} dangerouslySetInnerHTML={{__html: pj.content}}>
                    </div>
                );
            })}
        </Container>
    );
}