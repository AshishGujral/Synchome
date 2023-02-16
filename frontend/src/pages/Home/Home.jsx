import "./home.css"

import {Grid, styled} from '@mui/material';
// import { styled } from '@mui/system';
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import Main from "../../components/main/Main";
import FourColumnDiv from "../../components/main/FourColumnDiv";
import Userlist from "../../components/Userslist/Userlist";

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
 padding-left: 3vw;
`
const Home = () => {
  return <>
   <ContainerGrid container spacing={2} justifyContent="flex-start">

  <SidebarGrid item xs={1}>
   <Sidebar/>
  </SidebarGrid>

  <MainGrid item className='heroSection' xs={8}>
   <Main/>
   <FourColumnDiv/>
  </MainGrid>

  <TopbarGrid className="rightColumn" item xs ={3}>
   <Topbar/>
   <Userlist />
  </TopbarGrid>

</ContainerGrid>
  </>;
};

export default Home;
