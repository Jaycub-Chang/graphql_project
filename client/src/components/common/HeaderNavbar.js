import React from "react";
import styled from "styled-components";

// component
import { Form, Nav, Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const navbarItems = [
  {
    name: "首頁",
    link: "/",
  },
  {
    name: "景點查詢",
    link: "/attractions",
  },
  {
    name: "旅遊快訊",
    link: "/news",
  },
  {
    name: "最新活動",
    link: "/activities",
  },
];

const HeaderNavbar = () => {
  const { pathname } = useLocation();
  return (
    <NavbarWrapper>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#">臺北市觀光資訊看板</Navbar.Brand>
        <Nav className="mr-auto">
          {navbarItems.map((item, index) => {
            return (
              <Nav.Link key={index}>
                <Link
                  to={item.link}
                  style={{
                    color: pathname === item.link ? null : "white",
                    fontWeight: pathname === item.link ? "bolder" : null,
                  }}
                >
                  {item.name}
                </Link>
              </Nav.Link>
            );
          })}
        </Nav>
        <Form inline>
          <AuthorInfo>Author : Jacob Chang</AuthorInfo>
        </Form>
      </Navbar>
    </NavbarWrapper>
  );
};

export default HeaderNavbar;

const NavbarWrapper = styled.div`
  box-shadow: 0 3px 3px 3px #222;
  z-index: 10;
  position: relative;
`;
const AuthorInfo = styled.div``;
