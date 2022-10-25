import Container from "react-bootstrap/Container";
import {Col, Row} from "react-bootstrap";

export function HomePage (){
    return<section className="w-100 vh-100" style={{backgroundColor: "grey"}}>
        <h1 className="text-center pt-3">Homepage</h1>
        <Container>
            <Row>
                <Col style={{border: "blue"}}>1 of 2</Col>
                <Col style={{border: "blue"}}>2 of 2</Col>
            </Row>
            <Row>
                <Col>1 of 3</Col>
                <Col>2 of 3</Col>
                <Col>3 of 3</Col>
            </Row>
        </Container>

    </section>

}