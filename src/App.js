import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';

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

function App() {

  
  return (
    <div className="App min-h-screen bg-[#111111] text-white">
       <NavBar/>
       <ScrollToTop />
      <Routes>
      
     
      <Route path='/' element={<Home/>}/>
      <Route path='/About' element={<AboutUsPage/>}/>
      <Route path='/Contact' element={<ContactUs/>}/>
      <Route path='/service' element={<ServicePage/>}/>

      <Route path='/Login' element={<LoginPage/>}/>
      <Route path='/Signup' element={<SignupPage/>}/>
      
      <Route path='/ConferencesPage' element={<ConferencesPage/>}/>
      <Route path='/ConferenceDetailsPage/:id' element={<ConferenceDetailsPage/>}/>

      {/* courses */}

      <Route path='/courses' element={<Courses/>}/>
      <Route path="/courses/:courseId" element={<CourseDetails />} />

      
      {/* <Route path='/ActivationPage' element={<ActivationPage/>}/> */}
      <Route path="/activate_account/:token" element={<ActivationPage />} />
      {/* <Route path="/verify/:token" element={<ActivateAccount />} /> */}

      <Route path="/Blogs" element={<BlogList />} />
      <Route path="/blog/:id" element={<BlogDetail />} />

{/* payment */}
      <Route path="/payment" element={<PaymentPage />} />


      <Route path="/account" element={<Account />} />
      <Route path="/settings" element={<Settings />} />


      <Route path="/Newblog" element={<NewBlogPage />}/>
      <Route path="/create-category" element={<CreateCategory />} />

{/* create course  */}
      <Route path="/NewCours" element={<NewCourse />}/>
      <Route path="/create-video" element={<CreateVideoPage />}/>


{/* create Conferences */}
      <Route path="/NewConference" element={<NewConferencePage />}/>

         {/*create Quiz  */}

         <Route path="/NewQuiz" element={<NewQuizPage />}/>
          
     



      
     
     



     {/* test */}
    
     <Route path="/AddVideotest" element={<AddVideo />}/>

  


      </Routes>
      <Footer/>
      
    </div>
  );
}

export default App;
