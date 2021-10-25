import { Fragment } from "react";
import { 
    Placeholder,
    Container,
} from 'react-bootstrap';
import "@fontsource/sarabun";
import "./SkeletonStyle.scss";


const Skeleton = () => {

    return (
        <Fragment>
            <Container>
                <Placeholder as="p" animation="glow">
                    <Placeholder xs={6} />
                </Placeholder>
            </Container>
        </Fragment>  
    );
};

export default Skeleton;