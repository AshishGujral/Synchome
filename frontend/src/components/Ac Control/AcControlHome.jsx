import {Grid, styled} from '@mui/material';
import Sidebar from '../Sidebar/Sidebar';
import Topbar from '../Topbar/Topbar';
import React, { Component } from 'react'
import AcControlMain from './AcControlMain';


const SidebarGrid = styled(Grid)`
    max-width: 10%;
`;
const TopbarGrid = styled(Grid)`
    right: 0;
    top: 0;
    float: right;
  
`;
const ContainerGrid = styled(Grid)`
    justify-content: center;
    width: 100%;
`
const MainGrid = styled(Grid)`
 padding-left: 2vw;
`

export default class AcControlHome extends Component {
  render() {
    return (
      <ContainerGrid container spacing={2} justifyContent="flex-start">
      <SidebarGrid item xs={1}>
       <Sidebar/>
      </SidebarGrid>
    
      <MainGrid item className='heroSection' xs={8}>
        <AcControlMain/>
      </MainGrid>
    
      <TopbarGrid className="rightColumn" item xs ={3}>
      </TopbarGrid>
    
    </ContainerGrid>
    )
  }
}
