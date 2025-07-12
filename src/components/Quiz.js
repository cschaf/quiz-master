import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Question from './Question';
import ResultsPage from './ResultsPage';

const Quiz = ({ quiz, onReturnToStart }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState(new Array(quiz.questions.length).fill(null));
  const [quizFinished, setQuizFinished] = useState(false);

  const handleAnswerSelect = (answer) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = answer;
    setUserAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    if (window.confirm('Are you sure you want to submit your answers?')) {
      setQuizFinished(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers(new Array(quiz.questions.length).fill(null));
    setQuizFinished(false);
  };

  if (quizFinished) {
    // We need to format userAnswers to match what ResultsPage expects
    const formattedAnswers = userAnswers.map((answer, index) => ({
        questionIndex: index,
        answer: answer
    }));
    return (
      <ResultsPage
        quiz={quiz}
        userAnswers={formattedAnswers}
        onRestart={restartQuiz}
        onReturnToStart={onReturnToStart}
      />
    );
  }

  const allQuestionsAnswered = userAnswers.every(answer => answer !== null);
  const progress = ((userAnswers.filter(a => a !== null).length) / quiz.questions.length) * 100;

  return (
    <div>
      <h1 className="text-center mb-4">{quiz.title}</h1>
      <div className="progress mb-4 quiz-progress-container">
        {quiz.questions.map((_, index) => (
          <div
            key={index}
            className={`quiz-progress-segment ${userAnswers[index] !== null ? 'answered' : ''}`}
            style={{ width: `${100 / quiz.questions.length}%` }}
          ></div>
        ))}
      </div>
      <h3 className="text-center mb-3">Question {currentQuestionIndex + 1} of {quiz.questions.length}</h3>
      <Question
        question={quiz.questions[currentQuestionIndex]}
        selectedAnswer={userAnswers[currentQuestionIndex]}
        onSelect={handleAnswerSelect}
      />
      <div className="d-flex justify-content-between mt-4">
        <div className="d-flex">
          <button className="btn btn-secondary me-2" onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <button className="btn btn-primary" onClick={handleNext} disabled={currentQuestionIndex === quiz.questions.length - 1}>
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
        <div>
          <button className="btn btn-success" onClick={handleSubmit} disabled={!allQuestionsAnswered}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
