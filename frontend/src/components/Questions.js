// Questions.js

import React from 'react';

const Questions = ({ questions, currentQuestion, handleAnswerClick, timer, selectedAnswer, handleNextQuestion }) => {
    const question = questions[currentQuestion];

    return (
        <div>
            <h4>{question.question}</h4>
            <p>Time left: {timer} seconds</p>
            <div className="d-flex flex-wrap justify-content-center mt-3">
                {question.options.map((option, index) => (
                    <button
                        key={index}
                        className={`btn btn-outline-primary m-2 ${selectedAnswer === option ? 'active' : ''}`}
                        onClick={() => handleAnswerClick(option)}
                    >
                        {option}
                    </button>
                ))}
            </div>
            <button className="btn btn-success mt-3" onClick={handleNextQuestion}>
                Next Question
            </button>
        </div>
    );
};

export default Questions;
