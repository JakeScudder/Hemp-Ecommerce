import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Meta from "../components/Meta";
import {
  listProductDetails,
  createProductReview,
} from "../actions/productActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";

//Instead of props.match, destructure to just grab match.
const ProductScreen = ({ history, match }) => {
  // const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState(false);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productCreateReview = useSelector((state) => state.productCreateReview);
  const { success: successReview, error: errorReview } = productCreateReview;

  useEffect(() => {
    if (successReview) {
      setMessage(true);
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
      setTimeout(() => {
        setMessage(false);
      }, 3000);
    }
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match, successReview]);

  const addToCartHandler = (weight) => {
    history.push(`/cart/${match.params.id}?qty=${weight}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    );
  };

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Meta title={product.name} />
          <Row>
            <Col md={4}>
              <Image src={product.image} alt={product.name} fluid></Image>
            </Col>
            <Col md={4}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                {product.price && product.price.eighth ? (
                  <ListGroup.Item>
                    <Col className="mb-3">
                      <Row>
                        <h4>Description:</h4>
                      </Row>
                      <Row>{product.description}</Row>
                    </Col>
                    <Col>
                      <div id="disabled-info-buttons">
                        <Button
                          name="price"
                          type="button"
                          className="price-display btn-block mb-2 no-hover"
                          disabled>
                          Price By Weight
                        </Button>
                        <Button
                          name="eighth"
                          type="button"
                          className="price-display btn-block mb-2 no-hover"
                          disabled>
                          {`1/8oz: $${product.price.eighth}`}
                        </Button>
                        <Button
                          name="quarter"
                          type="button"
                          className="price-display btn-block mb-2 no-hover"
                          disabled>
                          {`1/4oz: $${product.price.quarter}`}
                        </Button>
                        <Button
                          name="half"
                          type="button"
                          className="price-display btn-block mb-2 no-hover"
                          disabled>
                          {`1/2oz: $${product.price.half}`}
                        </Button>
                        <Button
                          name="ounce"
                          type="button"
                          onClick={addToCartHandler}
                          className="price-display btn-block mb-2 no-hover"
                          disabled>
                          {`1oz: $${product.price.ounce}`}
                        </Button>
                      </div>
                    </Col>
                  </ListGroup.Item>
                ) : null}
              </ListGroup>
            </Col>
            <Col md={4}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item className="d-flex justify-content-start">
                    <Row>
                      <Col>Status: </Col>
                      <Col>
                        <span class="text-nowrap">
                          {product.countInStock > 0 ? (
                            <h5 style={{ color: "green" }}>In Stock</h5>
                          ) : (
                            <h5 style={{ color: "red" }}>Out of Stock</h5>
                          )}
                        </span>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && product.price.eighth ? (
                    <ListGroup.Item>
                      <Button
                        name="eighth"
                        type="button"
                        onClick={() => addToCartHandler("eighth")}
                        className="btn-block mb-3 add-to-cart">
                        <Col>{`1/8oz: $${product.price.eighth}`}</Col>
                        <Col>Add To Cart</Col>
                      </Button>
                      <Button
                        name="quarter"
                        type="button"
                        onClick={() => addToCartHandler("quarter")}
                        className="btn-block mb-3 add-to-cart">
                        <Col>{`1/4oz: $${product.price.quarter}`}</Col>
                        <Col>Add To Cart</Col>
                      </Button>
                      <Button
                        name="half"
                        type="button"
                        onClick={() => addToCartHandler("half")}
                        className="btn-block mb-3 add-to-cart">
                        <Col>{`1/2oz: $${product.price.half}`}</Col>
                        <Col>Add To Cart</Col>
                      </Button>
                      <Button
                        name="ounce"
                        type="button"
                        onClick={() => addToCartHandler("ounce")}
                        className="btn-block mb-3 add-to-cart">
                        <Col>{`1oz: $${product.price.ounce}`}</Col>
                        <Col>Add To Cart</Col>
                      </Button>
                    </ListGroup.Item>
                  ) : null}
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col md={6}>
              {message && (
                <Message variant="success">Review Submitted!</Message>
              )}
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant="flush">
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Review</h2>
                  {errorReview && (
                    <Message variant="danger">{errorReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}>
                          <option value="">Select...</option>
                          <option value="1">1 star</option>
                          <option value="12">2 stars</option>
                          <option value="3">3 stars</option>
                          <option value="4">4 stars</option>
                          <option value="5">5 stars</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="comment">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          row="3"
                          value={comment}
                          onChange={(e) =>
                            setComment(e.target.value)
                          }></Form.Control>
                      </Form.Group>
                      <Button type="submit" variant="primary">
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to="/login">Login</Link> to write a review.
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
