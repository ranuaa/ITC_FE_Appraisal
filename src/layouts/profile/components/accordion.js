import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from "react";

export default function SimpleAccordion({user}) {
  return (
    <div>
        <h1>Appraisal Data</h1>
        <br/>
        {user?.map((dat,index) => {
            return(          
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          style={{display:'flex', justifyContent:'center'}}
        >
          <Typography>Date : {dat.date}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Score : <span style={{fontWeight:'bold'}} >{dat.score}</span>
          </Typography>
          <br/>
          <Typography>
            Points :
          </Typography>
            <ol style={{marginLeft: '2%'}} >
                {dat.points?.map((point) => {
                    return( 
                        <li>{point}</li>
                    )
                })}
            </ol>
        </AccordionDetails>
      </Accordion>
            )
        })}
    </div>
  );
}