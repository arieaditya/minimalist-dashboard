import { Fragment } from "react";
import { 
    Placeholder,
    Container,
    Row,
    Col
} from 'react-bootstrap';
import "@fontsource/sarabun";
import "./SkeletonStyle.scss";


const Skeleton = () => {

    return (
        <Fragment>
            <Container>
                <Row className="mt-90">
                    <Col>
                        <Placeholder as="p" animation="glow">
                            <Placeholder xs={3} />
                        </Placeholder>
                    </Col>
                    <Col>
                        <Placeholder.Button xs={4} aria-hidden="true" className="float-right" />
                    </Col>
                </Row>
                
                <Placeholder as="p" animation="glow">
                    <Placeholder xs={12} className="mt-30" />
                </Placeholder>
                <Placeholder as="p" animation="glow">
                    <Placeholder xs={12} />
                </Placeholder>
                <Placeholder as="p" animation="glow">
                    <Placeholder xs={12} />
                </Placeholder>
                <Placeholder as="p" animation="glow">
                    <Placeholder xs={12} />
                </Placeholder>
                <Placeholder as="p" animation="glow">
                    <Placeholder xs={12} />
                </Placeholder>
                <Placeholder as="p" animation="glow">
                    <Placeholder xs={12} />
                </Placeholder>
                <Placeholder as="p" animation="glow">
                    <Placeholder xs={12} />
                </Placeholder>
                
            </Container>
        </Fragment>  
    );
};

export default Skeleton;