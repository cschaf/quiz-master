import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Quiz from './components/Quiz';
import StartPage from './components/StartPage';
import QuizCreator from './components/QuizCreator';
import defaultQuizData from './quizzes/clean-architecture.json';

function App() {
  const [quizData, setQuizData] = useState(null);
  const [page, setPage] = useState('start'); // 'start', 'quiz', 'create'

  const handleQuizStart = (data) => {
    setQuizData(data);
    setPage('quiz');
  };

  const handleReturnToStart = () => {
    setQuizData(null);
    setPage('start');
  }

  const renderPage = () => {
    switch (page) {
      case 'quiz':
        return <Quiz quiz={quizData} onReturnToStart={handleReturnToStart} />;
      case 'create':
        return <QuizCreator onReturnToStart={handleReturnToStart} />;
      case 'start':
      default:
        return (
          <div>
            <StartPage onQuizStart={handleQuizStart} />
            <div className="d-grid gap-2 d-md-block text-center mt-4">
              <button className="btn btn-primary me-md-2" onClick={() => handleQuizStart(defaultQuizData)}>
                Start Default Quiz
              </button>
              <button className="btn btn-secondary" onClick={() => setPage('create')}>
                Create a Quiz
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="container">
      {renderPage()}
    </div>
  );
}

export default App;
