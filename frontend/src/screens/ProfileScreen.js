import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import { userListOrders } from "../actions/orderActions";

//Annoying
const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState(null);
  const [updateMessage, setUpdateMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //Did the profile get successfully updated? Retrieve from redux userUpdateProfile state
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderUserList = useSelector((state) => state.orderUserList);
  const { loading: loadingOrders, error: errorOrders, orders } = orderUserList;

  const stringCapitalized = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user || !user.name) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("profile"));
        dispatch(userListOrders());
      } else if (success) {
        handleMessage();
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user, success]);

  //Gets brief success true value to setMessage for 3 seconds
  const handleMessage = () => {
    setUpdateMessage(true);
    setTimeout(() => {
      setUpdateMessage(false);
    }, 3000);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setPasswordMessage(null);
    //Update Profile
    if (password !== confirmPassword) {
      setPasswordMessage("Passwords do not match");
    } else {
      //Dispatch Update User profile
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };

  return (
    <Row>
      <Col md={3} lg={2}>
        <h2>User Profile</h2>
        {passwordMessage && (
          <Message variant="danger">{passwordMessage}</Message>
        )}
        {error && <Message variant="danger">{error}</Message>}
        {updateMessage && (
          <Message variant="success">Profile Updated Successfully</Message>
        )}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}></Form.Control>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}></Form.Control>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}></Form.Control>
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </Col>
      <Col className="mt-4" md={9} lg={12}>
        <h2>My Orders</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant="danger">{errorOrders}</Message>
        ) : (
          <div>
            {orders && orders.length > 0
              ? orders.map((order) => (
                  <Row className="mb-4 p-4 border border-primary">
                    <Col className="order-id-col mr-4">
                      <Row
                        className="justify-content-center"
                        style={{ fontSize: "14px" }}>
                        <strong>ID</strong>
                      </Row>
                      <Row className="justify-content-center">{order._id}</Row>
                    </Col>
                    <Col>
                      <Row className="justify-content-center">
                        <strong>CREATED AT</strong>
                      </Row>
                      <Row className="justify-content-center">
                        {order.createdAt.substring(0, 10)}
                      </Row>
                    </Col>
                    <Col lg={2}>
                      {order.orderItems.length > 0
                        ? order.orderItems.map((item) => (
                            <Container className="order-items-container mb-4">
                              <Row className="justify-content-center">
                                <strong>Strain: </strong>
                              </Row>
                              <Row className="justify-content-center mb-2">
                                {item.name}
                              </Row>
                              <Row className="justify-content-center">
                                <strong>QTY: </strong>
                              </Row>
                              <Row className="justify-content-center">
                                {stringCapitalized(item.qty)}
                              </Row>
                            </Container>
                          ))
                        : null}
                    </Col>
                    <Col className="mb-3">
                      <Row className="justify-content-center">
                        <strong>PRICE</strong>
                      </Row>
                      <Row className="justify-content-center">
                        ${order.totalPrice}
                      </Row>
                    </Col>
                    <Col lg={2} className="mb-3">
                      <Row className="justify-content-center">
                        <strong>IS PAID</strong>
                      </Row>
                      <Row className="justify-content-center">
                        {order.isPaid ? (
                          order.paidAt.substring(0, 10)
                        ) : (
                          <i
                            className="fas fa-times"
                            style={{ color: "red" }}></i>
                        )}
                      </Row>
                    </Col>
                    <Col lg={2} className="mb-3">
                      <Row className="justify-content-center">
                        <strong>IS DELIVERED</strong>
                      </Row>
                      <Row className="justify-content-center">
                        {order.isDelivered && order.deliveredAt ? (
                          order.deliveredAt.substring(0, 10)
                        ) : (
                          <i
                            className="fas fa-times"
                            style={{ color: "red" }}></i>
                        )}
                      </Row>
                    </Col>
                    <Col>
                      <Row className="justify-content-center">
                        <LinkContainer to={`/order/${order._id}`}>
                          <Button variant="light">Details</Button>
                        </LinkContainer>
                      </Row>
                    </Col>
                  </Row>
                ))
              : null}
          </div>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
