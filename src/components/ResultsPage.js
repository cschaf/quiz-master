import React from 'react';

const ResultsPage = ({ quiz, userAnswers, onRestart, onReturnToStart }) => {
  const calculateScore = () => {
    return userAnswers.reduce((score, userAnswer) => {
      const question = quiz.questions[userAnswer.questionIndex];
      const selectedAnswer = userAnswer.answer;
      if (selectedAnswer.correct) {
        return score + 1;
      }
      return score;
    }, 0);
  };

  return (
    <div className="results-page-container">
      <h2 className="text-center">Quiz Results</h2>
      <p className="lead text-center">
        Your score is: {calculateScore()} / {quiz.questions.length}
      </p>
      <div className="d-grid gap-2 d-md-block text-center mb-4">
        <button className="btn btn-primary me-md-2" onClick={onRestart}>
          Restart Quiz
        </button>
        <button className="btn btn-secondary" onClick={onReturnToStart}>
          Return to Start
        </button>
      </div>

      {quiz.questions.map((question, index) => {
        const userAnswer = userAnswers.find(a => a.questionIndex === index);
        const correctAnswer = question.answers.find(a => a.correct);

        return (
          <div key={index} className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">{question.title}</h5>
              {question.answers.map((answer, answerIndex) => {
                let answerClassName = 'd-block p-2 mt-2 rounded ';
                if (answer.correct) {
                  answerClassName += 'bg-success text-white';
                } else if (userAnswer && userAnswer.answer.text === answer.text && !answer.correct) {
                  answerClassName += 'bg-danger text-white';
                } else {
                  answerClassName += 'bg-light text-dark';
                }
                return (
                  <span key={answerIndex} className={answerClassName}>
                    {answer.text}
                  </span>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ResultsPage;
