import React, { useState } from 'react';

const StartPage = ({ onQuizStart }) => {
  const [error, setError] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const quizData = JSON.parse(e.target.result);
          if (quizData.title && quizData.questions && Array.isArray(quizData.questions)) {
            onQuizStart(quizData);
          } else {
            setError('Invalid quiz file format.');
          }
        } catch (err) {
          setError('Error parsing JSON file.');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="start-page-container">
      <h1>Welcome to Quiz Master!</h1>
      <p className="lead">
        Test your knowledge with our interactive quizzes. Upload your own or try our default quiz on Clean Architecture!
      </p>
      <hr className="my-4" style={{ borderColor: 'rgba(255,255,255,0.3)' }} />
      
      <h2>Upload a Custom Quiz</h2>
      <p>
        Create a JSON file with the following structure to load your own quiz.
      </p>
      <pre>
        <code>
          {`{
  "title": "Your Quiz Title",
  "description": "A brief description of your quiz.",
  "questions": [
    {
      "title": "First Question",
      "description": "Optional description for the question.",
      "image": "URL_to_an_image.jpg (optional)",
      "answers": [
        { "text": "Correct Answer", "correct": true },
        { "text": "Wrong Answer 1", "correct": false },
        { "text": "Wrong Answer 2", "correct": false }
      ]
    }
  ]
}`}
        </code>
      </pre>
      <div className="mt-4">
        <input type="file" className="form-control-file" accept=".json" onChange={handleFileUpload} />
      </div>
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
};

export default StartPage;