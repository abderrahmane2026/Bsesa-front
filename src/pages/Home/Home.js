
import AboutSection from '../../components/AboutSection/AboutSection';
import CommentSection from '../../components/Add Comment/CommentSection ';
import CommentsSection from '../../components/CommentSection/CommentSection';
import ContactSection from '../../components/Contact Section/ContactSection';
import CoursesSection from '../../components/CourseSection/CourseSection';
import Hero from '../../components/HeroSection/Hero';
import LogoGrid from '../../components/Logo Grid/LogoGrid';
import PricingSec from '../../components/PricinSection/Pricin';
import ServiceSection from '../../components/service Section/ServiceSection';
import ConferencesPage from '../Conferences/Conferences';
import Courses from '../Courses/Courses';
import BlogList from '../Services/Blogs page/Blogs';
import './Home.css';

function Home() {
  return (
    <div className="Home">
      <Hero/>
      <LogoGrid/>
      <ConferencesPage/>
      <BlogList/>
      {/* <ServiceSection/> */}
      {/* <Courses/> */}
      <CoursesSection/>
      
      
      <AboutSection/>
      <ContactSection/>
      <CommentsSection/>
      <PricingSec/>
      <CommentSection/>

    </div>
  );
}

export default Home;
