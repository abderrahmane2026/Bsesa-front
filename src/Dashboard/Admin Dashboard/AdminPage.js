// AdminPage.js
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const AdminPage = () => {
  return (
    <div className="admin-dashboard bg-dark text-white min-vh-100">
      <Container fluid>
        <Row>
          <Col>
            <h2 className="text-light">Welcome to Admin Dashboard</h2>
            <p className="text-light">
              This is the admin dashboard where you can manage all content, quizzes, blogs, courses, and more.
            </p>
            <Button variant="warning" onClick={() => alert("Admin Options")}>
              Admin Options
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdminPage;
