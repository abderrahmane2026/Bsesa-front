import React, { useState, useEffect } from "react";
import axios from "axios";
import "./NewQuiz.css";
import { Container, TextField, Button, Typography, Box, Paper, Radio, FormControlLabel } from "@mui/material";
import { refresh } from "../createblog/NewBlogPage";
import { useStore } from "../../../Context/testzustand";

const NewQuizPage = () => {
  const { user } = useStore();

  const [quizName, setQuizName] = useState("");
  const [questions, setQuestions] = useState([
    { questionText: "", options: [{ text: "", isCorrect: false }] },
  ]);
  const [responseMessage, setResponseMessage] = useState("");

  const handleAddQuestion = () => {
    setQuestions([...questions, { questionText: "", options: [{ text: "", isCorrect: false }] }]);
  };

  const handleAddOption = (questionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options.push({ text: "", isCorrect: false });
    setQuestions(newQuestions);
  };

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].questionText = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex].text = value;
    setQuestions(newQuestions);
  };

  const handleOptionCorrectChange = (questionIndex, optionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options.forEach((option, idx) => {
      option.isCorrect = idx === optionIndex;
    });
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Refresh token to get a valid session
      const checkToken = await refresh();
      if (!checkToken) throw new Error("You Must Login");

      // Prepare form data
      const formData = {
        name: quizName,
        questions,
        author: user._id,
      };

      console.log("Sending formData:", formData); // Verify the data here

      // Send the request to create a quiz with credentials (cookies)
      const response = await axios.post("http://localhost:5000/quiz", formData, {
        withCredentials: true,
      });

      setResponseMessage("Quiz created successfully!");
      setQuizName("");
      setQuestions([{ questionText: "", options: [{ text: "", isCorrect: false }] }]);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setResponseMessage("Access denied: You do not have permission to create a quiz.");
      } else if (error.message === "You Must Login") {
        setResponseMessage("You must login to create a quiz.");
      } else {
        setResponseMessage("Failed to create quiz.");
      }
      console.error("Error creating quiz:", error);
    }
  };

  return (
    <Container maxWidth="md" className="new-quiz-container">
      <Paper elevation={3} className="new-quiz-paper">
        <Typography variant="h4" gutterBottom className="new-quiz-title">
          Create New Quiz
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box marginBottom={3} className="new-quiz-box">
            <TextField
              label="Quiz Name"
              variant="outlined"
              fullWidth
              value={quizName}
              onChange={(e) => setQuizName(e.target.value)}
              required
              className="new-quiz-input"
            />
          </Box>
          {questions.map((question, qIndex) => (
            <Box key={qIndex} marginBottom={3} className="new-quiz-question-box">
              <TextField
                label={`Question ${qIndex + 1}`}
                variant="outlined"
                fullWidth
                value={question.questionText}
                onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                required
                className="new-quiz-input"
              />
              {question.options.map((option, oIndex) => (
                <Box key={oIndex} display="flex" alignItems="center" marginTop={2} className="new-quiz-option-box">
                  <TextField
                    label={`Option ${oIndex + 1}`}
                    variant="outlined"
                    value={option.text}
                    onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                    required
                    className="new-quiz-option-input"
                  />
                  <FormControlLabel
                    control={
                      <Radio
                        checked={option.isCorrect}
                        onChange={() => handleOptionCorrectChange(qIndex, oIndex)}
                        className="new-quiz-radio"
                      />
                    }
                    label="Correct"
                  />
                </Box>
              ))}
              <Button
                variant="outlined"
                onClick={() => handleAddOption(qIndex)}
                className="new-quiz-add-option-button"
              >
                Add Option
              </Button>
            </Box>
          ))}
          <Button
            variant="contained"
            onClick={handleAddQuestion}
            className="new-quiz-add-question-button"
          >
            Add Question
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="new-quiz-submit-button"
          >
            Create Quiz
          </Button>
        </form>
        {responseMessage && <Typography variant="body1" className="new-quiz-response-message">{responseMessage}</Typography>}
      </Paper>
    </Container>
  );
};

export default NewQuizPage;
