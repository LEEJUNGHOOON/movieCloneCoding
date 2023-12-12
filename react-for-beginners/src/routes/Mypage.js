/***
 * MyPage (in this page you can change your informaion)
 */
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Login.css";
import Navigation from "../components/Navigation";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { pwCheckUser, updateUser } from "../utills/userActions";

function Mypage() {
  const [pwerror, setPwError] = useState(false);
  const [pwcorrect, setPwCorrect] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [passwordcheck, setPasswordCheck] = useState("");
  const [passwordSame, setPasswordSame] = useState();
  const [newName, setNewName] = useState("");
  const [newId, setNewId] = useState("");

  const onPasswordChange = (event) => {
    event.preventDefault();
    setPassword(event.currentTarget.value);
  };

  const onPasswordCheckChange = (event) => {
    event.preventDefault();
    setPasswordCheck(event.currentTarget.value);
  };

  useEffect(() => {
    if (password === passwordcheck && passwordcheck !== "") {
      setPasswordSame(true);
    } else if (
      password !== passwordcheck &&
      password !== "" &&
      passwordcheck !== ""
    ) {
      setPasswordSame(false);
    }
  }, [password, passwordcheck]);

  const onPassWordCheck = (event) => {
    event.preventDefault();
    if (passwordSame) {
      let body = {
        _id: sessionStorage.getItem("userId"),
        password: password,
      };
      const data = dispatch(pwCheckUser(body));
      console.log(data);
      data.payload.then((result) => {
        if (result.success) {
          console.log("password check success");
          setPwCorrect(true);
          setPwError(false);
        } else {
          setPwError(true);
          setPwCorrect(false);
        }
      });
    }
  };

  const onNewNameChange = (event) => {
    setNewName(event.currentTarget.value);
  };

  const onNewIdChange = (event) => {
    setNewId(event.currentTarget.value);
  };

  const updateInfo = (event) => {
    event.preventDefault();
    let nameToChange = newName === "" ? sessionStorage.getItem("name") : newName;
    let idToChange = newId === "" ? sessionStorage.getItem("id") : newId;

    let body = {
      id: sessionStorage.getItem("id"),
      newName: nameToChange,
      newId: idToChange,
    };
    const data = dispatch(updateUser(body));
    console.log(data);
    data.payload.then((result) => {
      if (result.success) {
        navigate("/");
        sessionStorage.setItem("name", nameToChange);
        sessionStorage.setItem("id", idToChange);
      } else if (result.success) {
        alert("Failed to update");
      }
    });
  };
  return (
    <div className="outer">
      <Navigation />
      <div className="inner">
        <Card
          bg="secondary"
          style={{
            width: "60rem",
            height: "30rem",
            padding: "0px",
          }}
        >
          <Card.Body>
            <Card.Title style={{ textAlign: "center" }}>회원정보</Card.Title>
            <hr></hr>
            {pwerror ? (
              <Alert
                variant="danger"
                onClose={() => setPwError(false)}
                dismissible
              >
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <p>비밀번호가 다릅니다.</p>
              </Alert>
            ) : null}
            {pwcorrect ? (
              <Alert
                variant="success"
                onClose={() => setPwError(false)}
                dismissible
              >
                <Alert.Heading>Hey, nice to see you</Alert.Heading>
                <p>회원정보 변경이 가능합니다</p>
              </Alert>
            ) : null}

            <Form style={{ margin: "50px" }}>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextEmail"
              >
                <Form.Label column sm="2">
                  Name:
                </Form.Label>
                {pwcorrect ? (
                  <Col sm="6">
                    <Form.Control
                      value={newName}
                      type="text"
                      placeholder={sessionStorage.getItem("name")}
                      onChange={onNewNameChange}
                    />
                  </Col>
                ) : (
                  <Col sm="10">
                    <Form.Control
                      plaintext
                      readOnly
                      defaultValue={sessionStorage.getItem("name")}
                    />
                  </Col>
                )}
              </Form.Group>

              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextEmail"
              >
                <Form.Label column sm="2">
                  ID:
                </Form.Label>
                {pwcorrect ? (
                  <Col sm="6">
                    <Form.Control
                      value={newId}
                      type="text"
                      placeholder={sessionStorage.getItem("id")}
                      onChange={onNewIdChange}
                    />
                  </Col>
                ) : (
                  <Col sm="10">
                    <Form.Control
                      plaintext
                      readOnly
                      defaultValue={sessionStorage.getItem("id")}
                    />
                  </Col>
                )}
              </Form.Group>

              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextPassword"
              >
                <Form.Label column sm="2">
                  Password:
                </Form.Label>
                <Col sm="6">
                  <Form.Control
                    value={password}
                    type="password"
                    placeholder="Password"
                    onChange={onPasswordChange}
                    disabled={pwcorrect ? true : false}
                  />
                </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextPassword"
              >
                <Form.Label column sm="2">
                  Password Check:
                </Form.Label>
                <Col sm="6">
                  <Form.Control
                    value={passwordcheck}
                    type="password"
                    placeholder="Password Check"
                    onChange={onPasswordCheckChange}
                    disabled={pwcorrect ? true : false}
                  />
                  {passwordSame ? (
                    <p
                      style={{ fontSize: "small", color: "darkgreen" }}
                    >{`  password is same`}</p>
                  ) : (
                    <p
                      style={{ fontSize: "small", color: "darkred" }}
                    >{`  password is not same`}</p>
                  )}
                </Col>
              </Form.Group>
              <Button variant="primary" type="submit" onClick={onPassWordCheck}>
                PWCheck
              </Button>
              <Button
                variant="light"
                type="submit"
                style={{ marginLeft: "10px" }}
                onClick={updateInfo}
              >
                수정
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default Mypage;
