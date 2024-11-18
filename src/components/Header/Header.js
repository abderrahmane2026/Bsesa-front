import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";
import logo from "../../assets/logo/startup logo.jpg"

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "./Header.css";

function Header() {
  const navigate = useNavigate();
  
  const [userName, setUserName] = useState(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const loggedUser = JSON.parse(window.localStorage.getItem("userr"));
    if (loggedUser) {
      setUserName(loggedUser.name);
    }
  }, []);

  const handleProfileOnClick = () => {
    if (userName) {
      navigate('/Dashboard/');
    } else {
      navigate("/signup");
      console.log('You are not logged in');
    }
  };

  
  return (
    <Navbar expand="lg" className="custom-navbar" expanded={expanded}>
      <Container>
        <Navbar.Brand>
         
          <img src={logo} style={{ width: "100px", marginRight: "100px" }} alt="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(!expanded)} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link 
              as={Link} 
              to="/" 
              style={{ fontWeight: "600", fontSize: "20px" }} 
              onClick={() => setExpanded(false)}
            >
              الصفحة الرئيسية
            </Nav.Link>
           
            <Nav.Link 
              as={Link} 
              to="/About" 
              style={{ fontWeight: "600", fontSize: "20px" }} 
              onClick={() => setExpanded(false)}
            >
              من نحن
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/Contact" 
              style={{ fontWeight: "600", fontSize: "20px" }} 
              onClick={() => setExpanded(false)}
            >
              تواصل معنا
            </Nav.Link>
            <NavDropdown className="Navdown" title="خدماتنا" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link}  to="/Courses">دورات تدريبية</NavDropdown.Item>
              <NavDropdown.Divider />
             
              <NavDropdown.Item as={Link}  to="/Education"> تحسين المستوى</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link}  to="/Training">تربص </NavDropdown.Item>
              <NavDropdown.Divider />
          
            </NavDropdown>
            <NavDropdown className="Navdown" title="المزيد" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link}  to="/AddJob">طلب عمل</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link}  to="/ِCourses">الاخبار</NavDropdown.Item>
              <NavDropdown.Divider />
              
          
            </NavDropdown>
          </Nav>
          <Nav className="ml-auto header-links">
            {userName ? (
              <Nav.Link 
                className="User-icon" 
                style={{ fontWeight: "600", fontSize: "20px" }} 
                onClick={() => {
                  handleProfileOnClick();
                  setExpanded(false);
                }}
              >
                <div className="user-icon">
                  <FaUserCircle style={{ fontWeight: "600", fontSize: "30px" }} /> {userName}
                </div>
              </Nav.Link>
            ) : (
              <Nav.Link 
                className="Login-button " 
                onClick={() => {
                  handleProfileOnClick();
                  setExpanded(false);
                }}
              >
               تسجيل الدخول
              </Nav.Link>
            )}
           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
