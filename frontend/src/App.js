import React, { useState, useEffect, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import questionBankData from "./components/QuestionBank";
import Questions from "./components/Questions";
import Score from "./components/Score";
import Login from "./components/Login";
import "./App.css";

const shuffleArray = (array) => {
  return array
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
};

const App = () => {
  const [username, setUsername] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [skippedAnswers, setSkippedAnswers] = useState(0);
  const [timer, setTimer] = useState(15); // Set initial timer to 15 seconds
  const [quizStarted, setQuizStarted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleNextQuestion = useCallback(() => {
    if (selectedAnswer === null) {
      setSkippedAnswers((prev) => prev + 1);
    }

    if (currentQuestion + 1 < shuffledQuestions.length) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      setTimer(15); // Reset timer to 15 seconds for the next question
      setSelectedAnswer(null);
    } else {
      setQuizStarted(false);
      setQuizCompleted(true);
    }
  }, [currentQuestion, selectedAnswer, shuffledQuestions]);

  useEffect(() => {
    if (quizStarted) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer > 0) {
            return prevTimer - 1;
          } else {
            handleNextQuestion();
            return 15;
          }
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [quizStarted, handleNextQuestion]);

  const handleAnswerClick = (selectedAnswer) => {
    setSelectedAnswer(selectedAnswer);
    if (selectedAnswer === shuffledQuestions[currentQuestion].answer) {
      setScore((prevScore) => prevScore + 1);
      setCorrectAnswers((prev) => prev + 1);
    } else {
      setWrongAnswers((prev) => prev + 1);
    }
  };

  const startQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setTimer(15); // Reset timer to 15 seconds when starting a new quiz
    setQuizStarted(true);
    setQuizCompleted(false);
    setSelectedAnswer(null);
    setCorrectAnswers(0);
    setWrongAnswers(0);
    setSkippedAnswers(0);

    // Shuffle questions when starting quiz
    setShuffledQuestions(shuffleArray(questionBankData[selectedLanguage]));
  };

  const handleLogin = async (username, language) => {
    // Try to register the user first (optional, or you can have a separate registration)
    await fetch("http://10.110.66.139:5000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, language }),
    });

    // Then try to login
    const response = await fetch("http://10.110.66.139:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, language }),
    });
    const data = await response.json();

    if (response.ok) {
      setUsername(username);
      setSelectedLanguage(language);
    } else {
      alert(data.message || "Login failed");
    }
  };

  return (
    <div className="app-container">
      <div className="card text-center quiz-card">
        <h1 className="quiz-title">Welcome to the</h1>
        <h2 className="quiz-subtitle">Quiz App</h2>

        {!username ? (
          <Login handleLogin={handleLogin} />
        ) : (
          <div>
            {!quizStarted && !quizCompleted ? (
              <>
                <h3 className="greeting">Hello, {username}!</h3>
                <button
                  className="btn btn-primary start-btn"
                  onClick={startQuiz}
                >
                  Start Quiz for {selectedLanguage}
                </button>
              </>
            ) : quizStarted ? (
              selectedLanguage &&
              shuffledQuestions &&
              currentQuestion < shuffledQuestions.length ? (
                <Questions
                  questions={shuffledQuestions}
                  currentQuestion={currentQuestion}
                  handleAnswerClick={handleAnswerClick}
                  timer={timer}
                  selectedAnswer={selectedAnswer}
                  handleNextQuestion={handleNextQuestion}
                />
              ) : null
            ) : (
              <Score
                score={score}
                totalQuestions={shuffledQuestions.length}
                correctAnswers={correctAnswers}
                wrongAnswers={wrongAnswers}
                skippedAnswers={skippedAnswers}
                setCurrentQuestion={setCurrentQuestion}
                setQuizStarted={setQuizStarted}
                selectedLanguage={selectedLanguage}
                setScore={setScore}
                startQuiz={startQuiz}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
