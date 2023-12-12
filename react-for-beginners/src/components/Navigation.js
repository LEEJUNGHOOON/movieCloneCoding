import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useState, useEffect } from "react";
import * as React from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../utills/userActions";
import ItemList from "../assets/ItemList";

import { DropDownItem } from "../styles/AutoComplete";

const Navigation = () => {
  const dispatch = useDispatch();
  const [genre, setGenre] = useState("");
  const [isHaveInput, setIsHaveInput] = useState(false);
  const [dropDownList, setDropDownList] = useState(ItemList);
  const [dropDownGenreIndex, setDropDownGenreIndex] = useState(-1);
  const [curUser, setCurUser] = useState(null);

  useEffect(() => {
    setCurUser(sessionStorage.getItem("token"));
  }, []);

  const showDropDownList = () => {
    if (genre === "") {
      setIsHaveInput(false);
      setDropDownList([]);
    } else {
      const choosenTextList = ItemList.filter((textItem) =>
        textItem.includes(genre)
      );
      setDropDownList(choosenTextList);
    }
  };

  const onChange = (event) => {
    event.preventDefault();
    setGenre(event.target.value);
    console.log(genre);
    setIsHaveInput(true);
  };

  const clickDropDownItem = (clickedItem) => {
    setGenre(clickedItem);
    setIsHaveInput(false);
  };

  const handleDropDown = (event) => {
    if (isHaveInput) {
      if (
        event.key === "ArrowDown" &&
        dropDownList.length - 1 > dropDownGenreIndex
      ) {
        setDropDownGenreIndex(dropDownGenreIndex + 1);
      }
      if (event.key === "ArrowUp" && dropDownGenreIndex >= 0) {
        setDropDownGenreIndex(dropDownGenreIndex - 1);
      }
      if (event.key === "Enter" && dropDownGenreIndex >= 0) {
        clickDropDownItem(dropDownList[dropDownGenreIndex]);
        setDropDownGenreIndex(-1);
      }
    }
  };

  useEffect(showDropDownList, [genre]);

  const onLogOutHandler = async (event) => {
    event.preventDefault();
    let params = {
      userId: sessionStorage.getItem("userId"),
    };
    const data = dispatch(logoutUser(params));
    console.log(data);
    data.payload.then((result) => {
      if (result.success) {
        window.location.replace("/");
        sessionStorage.clear(); //세션 싹 비워줌
      } else {
        alert("ERROR");
      }
    });
  };

  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary"
      style={{ position: "sticky", top: "0", zIndex: "3" }}
    >
      <Container fluid>
        <Navbar.Brand href="/">CloneFlix</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll="true"
          >
            <Nav.Link href="/">Home</Nav.Link>
            <NavDropdown
              title="Mypage"
              id="mypagee"
              disabled={curUser ? false : true}
            >
              <NavDropdown.Item href="/mypage">Mypage</NavDropdown.Item>
              <NavDropdown.Item href="/mymovies">My Movies</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">회원탈퇴</NavDropdown.Item>
            </NavDropdown>
            {
              //만약 로그인 세션에 유저가 있으면 logout, 없으면 login버튼
              curUser == null ? (
                <Nav.Link href="/login">Login</Nav.Link>
              ) : (
                <Nav.Link href="/" onClick={onLogOutHandler}>
                  Logout
                </Nav.Link>
              )
            }
          </Nav>

          {isHaveInput && (
            <NavDropdown show="true">
              {dropDownList.length === 0 && (
                <DropDownItem>No Options</DropDownItem>
              )}
              {dropDownList.map((dropDownItem, dropDownIndex) => {
                return (
                  <NavDropdown.Item
                    key={dropDownIndex}
                    onClick={() => clickDropDownItem(dropDownItem)}
                    onMouseOver={() => setDropDownGenreIndex(dropDownIndex)}
                    className={
                      dropDownGenreIndex === dropDownIndex ? "selected" : ""
                    }
                  >
                    {dropDownItem}
                  </NavDropdown.Item>
                );
              })}
            </NavDropdown>
          )}
          <Form className="d-flex">
            <Form.Control
              type="text"
              placeholder="Search Genre"
              className="Search"
              aria-label="text"
              value={genre}
              onChange={onChange}
              onKeyUp={handleDropDown}
            />
            <Button variant="outline-success" type="submit" href={`/${genre}`}>
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Navigation;
