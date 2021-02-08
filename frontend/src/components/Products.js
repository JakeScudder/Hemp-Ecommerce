import React from "react";
import { Link } from "react-router-dom";
import { Card, Col, Row } from "react-bootstrap";
import Rating from "./Rating";

//Destructuring the props
const Products = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded ">
      <Col>
        <Row className="justify-content-center">
          <Link to={`/products/${product._id}`}>
            <Card.Img
              className="product-img"
              src={product.image}
              variant="top"
            />
          </Link>
        </Row>
        <Row>
          <Card.Body>
            <Link to={`/products/${product._id}`}>
              <Card.Title as="div">
                <strong>{product.name}</strong>
              </Card.Title>
            </Link>
            <Card.Text as="div">
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </Card.Text>
            <Card.Text as="h3">${product.price.eighth} per 1/8</Card.Text>
          </Card.Body>
        </Row>
      </Col>
    </Card>
  );
};

export default Products;
