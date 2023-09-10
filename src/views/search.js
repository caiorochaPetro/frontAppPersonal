import { Container } from '@mui/material';
import * as React from 'react';

import { useQuery, gql } from '@apollo/client';

import { GET_RESEARCH } from '../queries/queries';
import { useParams } from 'react-router-dom';

import LoadComp from '../comp/load';

import ButtonAppB from '../comp/top';
import LoadAnimated from '../comp/top';

function Search(){
    let {key} = useParams();
    const {data, loading, error} = useQuery(GET_RESEARCH, {variables:{
        key: key
    }});

    if (loading) {return(<LoadComp></LoadComp>)} 
    if (error) {return(<>error</>)} 
    return(
        <Container>
            <ButtonAppB></ButtonAppB>
            {data.getResearch.map((result)=>{
                return(
                    <div key={result.id}>
                        {result.title}
                    </div>
                );
            })}
        </Container>
    );
}

export default Search;