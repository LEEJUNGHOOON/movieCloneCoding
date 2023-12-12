/***
 * Sign in  page
 */
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Login.css";
import Navigation from "../components/Navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../utills/userActions";

function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");

  const onIdChange = (event) => {
    setId(event.currentTarget.value);
  };
  const onPwChange = (event) => {
    setPassword(event.currentTarget.value);
  };
  const onConfirmPwChange = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };
  const onNameChange = (event) => {
    setName(event.currentTarget.value);
  };
  function onSignin(event) {
    event.preventDefault();
    if (password !== confirmPassword) {
      return alert("password and confirmPassword should be same");
    }
    let body = {
      id: id,
      password: password,
      name: name,
    };

    const data = dispatch(registerUser(body));
    data.payload.then((result) => {
      if (result.success) {
        navigate("/login");
        console.log("go to login");
      } else if (result.success) {
        alert("Failed to sign up");
      }
    });
  }

  return (
    <div className="outer">
      <Navigation />
      <div className="inner">
        <Card bg="secondary" style={{ width: "38rem" }}>
          <Card.Body>
            <Card.Title style={{ textAlign: "center" }}>Sign In</Card.Title>
            <br />
            <Form>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextPassword"
              >
                <Col sm>
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={onNameChange}
                  />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextPassword"
              >
                <Col sm>
                  <Form.Control
                    type="text"
                    placeholder="UserID"
                    value={id}
                    onChange={onIdChange}
                  />
                </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextPassword"
              >
                <Col sm>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={confirmPassword}
                    onChange={onConfirmPwChange}
                  />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextPassword"
              >
                <Col sm>
                  <Form.Control
                    type="password"
                    placeholder="confirmPassword"
                    value={password}
                    onChange={onPwChange}
                  />
                </Col>
              </Form.Group>
              <br />

              <div className="d-grid gap-1">
                <Button variant="primary" type="submit" onClick={onSignin}>
                  Sign In
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default SignIn;
