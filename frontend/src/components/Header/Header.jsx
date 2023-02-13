
import { AppBar, Toolbar, styled, Button } from '@mui/material'; 
import { Link } from 'react-router-dom';




const Component = styled(AppBar)`
    background: #FFFFFF;
    color: black;
`;

const Container = styled(Toolbar)`
    justify-content: center;
    /* Link gives 'a' tag by default */
    & > a {
        padding: 20px;
        color: #000;
        text-decoration: none;
    }
`

const Header = () => {
        
    return (
        <Component>
            <Container>
              <a>Home</a>
              <a>about</a>
              <a>monitor</a>
              <a>stats</a>
              <a>logout</a>
            </Container>
        </Component>
    )
}

export default Header;