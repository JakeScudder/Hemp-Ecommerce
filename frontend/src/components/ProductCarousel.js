import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Carousel, Image, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import Message from "./Message";
import { listTopProducts } from "../actions/productActions";
import hemp from "../SIERRA-HEMP.jpg";

const ProductCarousel = () => {
  const dispatch = useDispatch();

  const productTopRated = useSelector((state) => state.productTopRated);
  //destructure state
  const { loading, error, products } = productTopRated;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-info">
      <Carousel.Item interval={20000}>
        <Col>
          <Row className="hemp-info-row">
            <Col md={6} sm={10}>
              <Image
                src={hemp}
                className="carousel-hemp-image"
                alt="First slide"
                fluid
              />
            </Col>
            <Col md={6} sm={10}>
              <Carousel.Caption
                style={{ textAlign: "left" }}
                className="carousel-main-caption mb-3">
                <h3 style={{ color: "black" }}>
                  <strong>Organic Hemp</strong>
                </h3>
                <h5 style={{ color: "black" }}>
                  <strong>
                    {" "}
                    The Hemp Farming Act of 2018 legalized all industrial hemp
                    and products made from industrial hemp containing no more
                    than .3% THC. It can be refined into a variety of commercial
                    items, including paper, rope, textiles, clothing, and
                    biodegradable plastics.
                  </strong>
                </h5>
                <p>
                  -<i>wikipedia.org/wiki/Hemp</i>
                </p>
                <h3 style={{ color: "black" }}>
                  <strong>CBD</strong>
                </h3>
                <h5 style={{ color: "black" }}>
                  <strong>
                    While CBD is an essential component of medical marijuana, it
                    is derived directly from the hemp plant, which is a cousin
                    of the marijuana plant. While CBD is a component of
                    marijuana (one of hundreds), by itself it does not cause a
                    “high.” According to a report from the World Health
                    Organization, “In humans, CBD exhibits no effects indicative
                    of any abuse or dependence potential…. To date, there is no
                    evidence of public health related problems associated with
                    the use of pure CBD.
                  </strong>
                </h5>
                <p>
                  -<i>health.harvard.edu</i>
                </p>
              </Carousel.Caption>
            </Col>
          </Row>
        </Col>
      </Carousel.Item>
      {products.map((product) => (
        <Carousel.Item interval={7000} key={product._id}>
          <Link to={`/products/${product._id}`}>
            <Image
              className="carousel-product-image"
              src={product.image}
              alt={product.name}
              fluid
            />
            <Carousel.Caption className="mb-3 carousel-caption">
              <h4>
                {product.name}, Starting At: ${product.price.eighth}
              </h4>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
