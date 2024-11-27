import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import './App.css';
import { Navbar } from 'react-bootstrap';
import Home from './pages/Home/Home';
import NavBar from './components/NavBar/Navbar';
import LoginPage from './pages/LoginPage/Login';
import ContactUs from './pages/ContactUs/Contact';
import Footer from './components/Footer/Footer';
import AboutUsPage from './pages/About/About';
import ServicePage from './pages/Services/ServicePage';
import SignupPage from './pages/LoginPage/signup';
import Admin from './pages/deashbord/Admin/Admindord';
import UsersPage from './pages/deashbord/Admin/UsersPage/UsersPage';

import ActivateAccount from './pages/LoginPage/ActivateAccount';
import UserDashboard from './Dashboard/User Dashboard/UserDashboard';
import Account from './Dashboard/User Dashboard/Account/account';
import Settings from './Dashboard/User Dashboard/Settings/Settings';
import NewBlogPage from './Dashboard/Admin Dashboard/createblog/NewBlogPage';
import BlogList from './pages/Services/Blogs page/Blogs';
import BlogDetail from './pages/Services/Blogs page/BlogsDetail';
import Courses from './pages/Courses/Courses';
import CourseDetails from './pages/CourseDetails/CourseDetails';
import CreateCategory from './components/Createcategory/Createcategory';
import ActivationPage from './pages/ActivationPage/ActivationPage';
import CreateVideoPage from './Dashboard/Admin Dashboard/createvideo/createvideo';
import NewCourse from './Dashboard/Admin Dashboard/createCourse/CreateCourse';
import NewConferencePage from './Dashboard/Admin Dashboard/Conference/CreateConferencepage';

import ConferenceDetailsPage from './pages/Conferences/ConferenceDetailsPage/ConferenceDetailsPage';
import ConferencesPage from './pages/Conferences/Conferences';
import PaymentPage from './pages/PaymentPage/paymentPage';
import ScrollToTop from './Context/ScrollToTop';
import NewQuizPage from './Dashboard/Admin Dashboard/NewQuiz/NewQuiz';
import AddVideo from './Test/courseTest/coursetest';
import AdminPage from './Dashboard/Admin Dashboard/AdminPage';
import AdminLayout from './Dashboard/Admin Dashboard/AdminLayout';
import AdminDashboard from './Dashboard/Admin Dashboard/AdminDashboard';

function App() {
  const location = useLocation();

  // تحقق إذا كان المستخدم داخل لوحة تحكم الإدارة
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="App min-h-screen bg-[#111111] text-white">
      {/* إخفاء الـ NavBar والـ Footer إذا كان المسار يبدأ بـ '/admin' */}
      {!isAdminRoute && <NavBar />}
      
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Home />} />
        {/* مسارات الصفحة العامة */}
        <Route path='/About' element={<AboutUsPage />} />
        <Route path='/Contact' element={<ContactUs />} />
        <Route path='/service' element={<ServicePage />} />
        <Route path='/Login' element={<LoginPage />} />
        <Route path='/Signup' element={<SignupPage />} />
        
        {/* مسارات الـ Admin */}
        <Route path="/admin" element={<AdminLayout />} >
        <Route index element={<AdminDashboard />} />
          <Route path="NewQuiz" element={<NewQuizPage />} />
          <Route path="NewCourse" element={<NewCourse />} />
          <Route path="NewConference" element={<NewConferencePage />} />
          <Route path="create-video" element={<CreateVideoPage />} />
          <Route path="Newblog" element={<NewBlogPage />} />
          <Route path="create-category" element={<CreateCategory />} />
          <Route path="AddVideotest" element={<AddVideo />} />
        </Route>

        {/* مسارات أخرى */}
        <Route path="/account" element={<Account />} />
        <Route path="/settings" element={<Settings />} />
        {/* مسارات مدفوعة و أخرى */}
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
      
      {/* إخفاء الـ Footer إذا كنت في لوحة تحكم الإدارة */}
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default App;
