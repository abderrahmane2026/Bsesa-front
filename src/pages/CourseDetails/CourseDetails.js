import React, { useState } from "react";
import { useParams } from "react-router-dom";
import data from "../Courses/CoursesData.json";
import { FaUserTie, FaClock, FaCheckCircle } from "react-icons/fa";
import "./CourseDetails.css";

const CourseDetails = () => {
  const { courseId } = useParams() || {};
 
  const course = courseId ? data.find((course) => course._id === courseId) : null;
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(null);
  const [certificate, setCertificate] = useState(null);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0); // Track selected video index

  if (!course) {
    return (
      <div className="course-not-found">
        <h2>Course Not Found</h2>
        <p>We couldn't find the course you're looking for. Please check the course ID or browse our available courses.</p>
      </div>
    );
  }

  const handleQuizCompletion = (userScore) => {
    setScore(userScore);
    setQuizCompleted(true);
    if (userScore >= 70) {
      // Assuming 70% is the passing score
      setCertificate("Congratulations! You have passed the quiz and earned a certificate.");
    }
  };

  const renderQuiz = () => {
    const quiz = course.quiz;
    if (!quiz) {
      return <div>No quiz available for this course.</div>;
    }

    return (
      <div className="course-quiz">
        <h2>Quiz for {course.title}</h2>
        {/* Render quiz questions here */}
        <button onClick={() => handleQuizCompletion(80)}>Submit Quiz (Simulated Score: 80%)</button>
      </div>
    );
  };

  const handleVideoClick = (index) => {
    setSelectedVideoIndex(index);
  };

  return (
    <div className="course-details-page">
      <div className="course-details-header">
        <img src={course.thumbnail} alt={course.title} className="course-details-thumbnail" />
        <h1>{course.title}</h1>
        <p>{course.description}</p>
        <div className="course-coach-info">
          <FaUserTie /> <span>{course.coach.name}</span>
        </div>
      </div>

      
      <div className="course-progress">
        <div className="progress-bar">
          <div className="progress" style={{ width: "25%" }}></div>
        </div>
        <p>Great Job! 🎉 You're on the path to becoming a certified {course.title} expert. Keep up the good work!</p>
      </div>
      <div className="course-details-content">
        <div className="course-details-sidebar">
          <h3>Course Completion</h3>
          <ul className="course-video-list">
            {course.videos.map((video, index) => (
              <li
                key={index}
                className={`course-details-video-item ${index === selectedVideoIndex ? 'active' : ''}`}
                onClick={() => handleVideoClick(index)}
              >
                <FaClock /> <span>{video.title} </span>
              </li>
            ))}
          </ul>
          {!showQuiz && (
            <button className="start-quiz-button" onClick={() => setShowQuiz(true)}>
              Start Quiz
            </button>
          )}
        </div>
        <div className="course-details-video">
          <h2>{course.videos[selectedVideoIndex].title}</h2>
          <video src={course.videos[selectedVideoIndex].url} controls className="details-video-player" />
          <p>{course.videos[selectedVideoIndex].description}</p>
          {course.videos[selectedVideoIndex].thumbnail && (
            <img src={course.videos[selectedVideoIndex].thumbnail} alt={course.videos[selectedVideoIndex].title} className="video-thumbnail" />
          )}
        </div>
      </div>
      {showQuiz && !quizCompleted && renderQuiz()}
      {quizCompleted && (
        <div className="quiz-result">
          <h2>Your Score: {score}%</h2>
          {certificate && <p>{certificate}</p>}
        </div>
      )}
    </div>
  );
};

export default CourseDetails;
