import { Fragment } from "react";
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Content from "../../assets/404.png"
import "./ErrorStyle.scss";

const Error = () => {

  return (
    <Fragment> 
        <div className="error-wrapper">
            <img src={Content} alt="404-page" width="500"/>
            <h1 className="error-title">Oh, no! This page does not exist</h1>
            <Link to="/">
              <Button className="btn-back">Go to main page</Button>
            </Link>
        </div>
    </Fragment>
  )
  
};

export default Error;