/***
 * Login page
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
import { loginUser } from "../utills/userActions";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const onIdChange = (event) => {
    event.preventDefault();
    setId(event.currentTarget.value);
  };

  const onPwChange = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onLogin = (event) => {
    event.preventDefault();
    let body = {
      id: id,
      password: password,
    };
    const data = dispatch(loginUser(body));//axios 
    data.payload.then((result) => {
      if (result.loginSuccess) {
        navigate("/"); // navigate to main page 
        sessionStorage.clear(); //sesstion storage clear
        sessionStorage.setItem("userId", result.userId);//store user informaions to session 
        sessionStorage.setItem("id", result.id);
        sessionStorage.setItem("token", result.token);
        sessionStorage.setItem("name", result.name);
      } else {
        alert("ERROR");
      }
    });
  };

  return (
    <div className="outer">
      <Navigation />
      <div className="inner">
        <Card bg="secondary" style={{ width: "38rem" }}>
          <Card.Body>
            <Card.Title>Login</Card.Title>
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
                    value={password}
                    onChange={onPwChange}
                  />
                </Col>
              </Form.Group>
              <br />

              <div className="buttons">
                <Button
                  variant="primary"
                  type="submit"
                  style={{
                    marginBottom: "20px",
                    width: "80%",
                    marginLeft: "10%",
                  }}
                  onClick={onLogin}
                >
                  Login
                </Button>

                <Button
                  variant="outline-primary"
                  type="submit"
                  href="/signIn"
                  style={{ width: "80%", marginLeft: "10%", color: "white" }}
                >
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

export default Login;
