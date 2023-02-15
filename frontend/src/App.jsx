import "./App.css";
import Header from "./components/Header/Header";
import Main from "./components/main/Main";
import Grid from '@mui/material/Grid';
import FourColumnDiv from "./components/main/FourColumnDiv";
import Footer from "./components/Footer/Footer";


function App() {
  return (
 <Grid container spacing={1}>
  <Grid xs={2}>
   <Header/>
  </Grid>
  <Grid xs={8}>
   <Main/>
   <FourColumnDiv/>
  </Grid>
  <Grid xs ={2}>
   <Footer/>
  </Grid>
</Grid>
  );
}

export default App;
