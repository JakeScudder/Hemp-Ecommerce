import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">Copyright &copy; Trees 4 Sale</Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
