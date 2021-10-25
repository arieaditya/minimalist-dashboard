import { Fragment } from "react";
import { Link } from 'react-router-dom';
import { 
    Container,
    Navbar,
} from 'react-bootstrap';
import "@fontsource/sarabun";
import Logo from "../../assets/logo.svg";
import "./HeaderStyle.scss";


const Header = () => {

    return (
        
        <Fragment>
            <Container>
                <Navbar expand="lg" variant="light" bg="light" fixed="top" >
                    <Container className="header-container">
                        <Link to="/">
                            <Navbar.Brand>
                                <img src={Logo} alt="logo"/>
                            </Navbar.Brand>
                        </Link>
                    </Container>
                </Navbar>
            </Container>
        </Fragment>   
    );
};

export default Header;