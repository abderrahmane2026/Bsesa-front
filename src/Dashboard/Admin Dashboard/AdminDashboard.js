import React, { useEffect, useState } from 'react';
import { Card, Row, Col, ProgressBar } from 'react-bootstrap';
import { Line } from 'react-chartjs-2'; // استيراد الرسم البياني
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './AdminDashboard.css';  // لكتابة الأنماط الخاصة بالصفحة

// تفعيل الإضافات المطلوبة لـ Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
  // بيانات افتراضية
  const [userCount, setUserCount] = useState(1200);  // عدد المستخدمين
  const [loginCount, setLoginCount] = useState(2500);  // عدد تسجيلات الدخول
  const [courseCount, setCourseCount] = useState(50);  // عدد الدورات
  const [engagementCount, setEngagementCount] = useState(1500);  // التفاعلات
  const [recentActivities, setRecentActivities] = useState([
    "User JohnDoe created a new course.",
    "Admin added a new blog post.",
    "User JaneSmith enrolled in a course.",
  ]);  // الأنشطة الأخيرة
  
  // بيانات المستخدمين الشهرية على شكل مثال
  const userGrowthData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'], // الشهور
    datasets: [
      {
        label: 'Users Growth',
        data: [1200, 1300, 1400, 1550, 1700, 1850, 2000], // نمو المستخدمين
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1
      }
    ]
  };

  useEffect(() => {
    // هنا يمكنك جلب البيانات من API حقيقي إذا كان لديك
  }, []);

  return (
    <div className="admin-dashboard">
      <Row className="g-4">
        {/* Card for Total Users */}
        <Col md={3}>
          <Card className="text-center shadow">
            <Card.Body>
              <Card.Title>Total Users</Card.Title>
              <Card.Text className="display-4">{userCount}</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Card for Total Logins */}
        <Col md={3}>
          <Card className="text-center shadow">
            <Card.Body>
              <Card.Title>Total Logins</Card.Title>
              <Card.Text className="display-4">{loginCount}</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Card for Total Courses */}
        <Col md={3}>
          <Card className="text-center shadow">
            <Card.Body>
              <Card.Title>Total Courses</Card.Title>
              <Card.Text className="display-4">{courseCount}</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Card for Engagement */}
        <Col md={3}>
          <Card className="text-center shadow">
            <Card.Body>
              <Card.Title>Engagement</Card.Title>
              <ProgressBar now={engagementCount} max={5000} label={`${engagementCount} interactions`} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Recent Activities */}
      <Row className="g-4 mt-4">
        <Col md={12}>
          <Card className="shadow">
            <Card.Body>
              <Card.Title>Recent Activities</Card.Title>
              <ul>
                {recentActivities.map((activity, index) => (
                  <li key={index}>{activity}</li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Chart for User Growth */}
      <Row className="g-4 mt-4">
        <Col md={12}>
          <Card className="shadow">
            <Card.Body>
              <Card.Title>User Growth (Last 6 Months)</Card.Title>
              <Line data={userGrowthData} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;
