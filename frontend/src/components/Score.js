import React from "react";
import "./Score.css";

const Score = ({
  score,
  totalQuestions,
  correctAnswers,
  wrongAnswers,
  skippedAnswers,
  startQuiz,
  username,
}) => {
  const submitScore = async () => {
    try {
      const response = await fetch("http://10.110.66.139:5000/marks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: username, totalMarks: score }),
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message || "Score submitted successfully!");
      } else {
        alert(data.message || "Failed to submit score.");
      }
    } catch (error) {
      alert("Error connecting to backend.");
      console.error(error);
    }
  };

  return (
    <div className="score-container">
      <h2 className="score-title">Quiz Completed</h2>
      <div className="score-card">
        <p className="score-detail">
          Total Score:{" "}
          <span className="score-number">
            {score} / {totalQuestions}
          </span>
        </p>
        <p className="score-detail correct">
          Correct Answers: <span>{correctAnswers}</span>
        </p>
        <p className="score-detail wrong">
          Wrong Answers: <span>{wrongAnswers}</span>
        </p>
        <p className="score-detail skipped">
          Skipped Questions: <span>{skippedAnswers}</span>
        </p>
      </div>
      <button className="btn btn-primary restart-btn" onClick={startQuiz}>
        Restart Quiz
      </button>
      <button className="btn btn-secondary submit-btn" onClick={submitScore}>
        Submit Score
      </button>
    </div>
  );
};

export default Score;
