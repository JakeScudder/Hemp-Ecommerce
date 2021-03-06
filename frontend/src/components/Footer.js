import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className="py-3">
            <Row className="justify-content-center">
              Copyright &copy; Hemp Highway
            </Row>
            <Row className="justify-content-center">Jake Morris</Row>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
