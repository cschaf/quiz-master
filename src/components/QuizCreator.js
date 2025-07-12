import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCopy } from '@fortawesome/free-solid-svg-icons';

const QuizCreator = ({ onReturnToStart }) => {
  const [quiz, setQuiz] = useState({
    title: '',
    description: '',
    questions: [{ title: '', description: '', image: '', answers: [{ text: '', image: '', correct: false }] }],
  });
  const [activeSection, setActiveSection] = useState(null); // 'ai', 'manual', or null

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };
  

  const promptTemplate = `
You are an expert in creating engaging quizzes. Your task is to generate a quiz in JSON format based on the topic I provide.

**Instructions:**
1.  The quiz must be in valid JSON format.
2.  The root object must have "title", "description", and "questions" (an array).
3.  Each question object must have a "title" and an array of "answers". It can optionally have a "description" and an "image" (URL).
4.  Each answer object must have "text" and "correct" (boolean). It can optionally have an "image" (URL).
5.  For the topic "[Your Topic Here]", create a quiz with [Number of Questions] questions.
6.  For each question and answer, if appropriate, find a high-quality, directly usable image URL from a reliable source (like Wikipedia, Pexels, Unsplash, etc.) and add it to the "image" field. Ensure the images are relevant to the text.
7.  Ensure there is at least one correct answer for each question.

**JSON Structure:**
\`\`\`json
{
  "title": "Quiz Title",
  "description": "Quiz Description",
  "questions": [
    {
      "title": "Question Title",
      "description": "Optional question description.",
      "image": "https://example.com/question_image.jpg",
      "answers": [
        {
          "text": "Answer text",
          "image": "https://example.com/answer_image.jpg",
          "correct": true
        }
      ]
    }
  ]
}
\`\`\`

**Topic:** [Your Topic Here]
**Number of Questions:** [Number of Questions]
`;

  const copyPrompt = () => {
    navigator.clipboard.writeText(promptTemplate);
    alert('Prompt copied to clipboard!');
  };

  // All other handler functions (handleQuizChange, addQuestion, etc.) remain the same
  const handleQuizChange = (e) => setQuiz({ ...quiz, [e.target.name]: e.target.value });
  const handleQuestionChange = (index, e) => {
    const newQuestions = [...quiz.questions];
    newQuestions[index][e.target.name] = e.target.value;
    setQuiz({ ...quiz, questions: newQuestions });
  };
  const handleAnswerChange = (qIndex, aIndex, e) => {
    const newQuestions = [...quiz.questions];
    const value = e.target.name === 'correct' ? e.target.checked : e.target.value;
    newQuestions[qIndex].answers[aIndex][e.target.name] = value;
    setQuiz({ ...quiz, questions: newQuestions });
  };
  const addQuestion = () => setQuiz({ ...quiz, questions: [...quiz.questions, { title: '', description: '', image: '', answers: [{ text: '', image: '', correct: false }] }] });
  const removeQuestion = (index) => {
    const newQuestions = [...quiz.questions];
    newQuestions.splice(index, 1);
    setQuiz({ ...quiz, questions: newQuestions });
  };
  const addAnswer = (qIndex) => {
    const newQuestions = [...quiz.questions];
    newQuestions[qIndex].answers.push({ text: '', image: '', correct: false });
    setQuiz({ ...quiz, questions: newQuestions });
  };
  const removeAnswer = (qIndex, aIndex) => {
    const newQuestions = [...quiz.questions];
    newQuestions[qIndex].answers.splice(aIndex, 1);
    setQuiz({ ...quiz, questions: newQuestions });
  };
  const downloadQuiz = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(quiz, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "quiz.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };


  return (
    <div className="quiz-creator-container">
      <h1 className="text-center mb-4">Create Your Quiz</h1>
      <hr className="my-5" />
      <div className="accordion" id="quizCreatorAccordion">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button className={`accordion-button ${activeSection !== 'ai' && 'collapsed'}`} type="button" onClick={() => toggleSection('ai')}>
              Generate Quiz with AI
            </button>
          </h2>
          <div id="collapseOne" className={`accordion-collapse collapse ${activeSection === 'ai' && 'show'}`} aria-labelledby="headingOne" data-bs-parent="#quizCreatorAccordion">
            <div className="accordion-body">
              <p>Copy the prompt below and paste it into your favorite AI chat model. Replace the placeholders with your desired topic and number of questions. The AI will generate the quiz JSON for you, which you can then upload on the start page.</p>
              <pre className="quiz-creator-pre"><code>{promptTemplate}</code></pre>
              <button className="btn btn-primary" onClick={copyPrompt}>
                <FontAwesomeIcon icon={faCopy} className="me-2" />
                Copy Prompt
              </button>
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header" id="headingTwo">
            <button className={`accordion-button ${activeSection !== 'manual' && 'collapsed'}`} type="button" onClick={() => toggleSection('manual')}>
              Create Quiz Manually
            </button>
          </h2>
          <div id="collapseTwo" className={`accordion-collapse collapse ${activeSection === 'manual' && 'show'}`} aria-labelledby="headingTwo" data-bs-parent="#quizCreatorAccordion">
            <div className="accordion-body">
              <div className="form-group">
                <label>Quiz Title</label>
                <input type="text" name="title" className="form-control" value={quiz.title} onChange={handleQuizChange} />
              </div>
              <div className="form-group mt-3">
                <label>Quiz Description</label>
                <textarea name="description" className="form-control" value={quiz.description} onChange={handleQuizChange}></textarea>
              </div>
              <hr className="my-4" />
              {quiz.questions.map((q, qIndex) => (
                <div key={qIndex} className="card bg-dark text-white mb-4">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="card-title">Question {qIndex + 1}</h5>
                      <button className="btn btn-danger btn-remove-answer" onClick={() => removeQuestion(qIndex)}><FontAwesomeIcon icon={faTrash} /></button>
                    </div>
                    {/* Question fields */}
                    <div className="form-group mt-3"><label>Question Title</label><input type="text" name="title" className="form-control" value={q.title} onChange={(e) => handleQuestionChange(qIndex, e)} /></div>
                    <div className="form-group mt-3"><label>Question Description</label><input type="text" name="description" className="form-control" value={q.description} onChange={(e) => handleQuestionChange(qIndex, e)} /></div>
                    <div className="form-group mt-3"><label>Question Image URL</label><input type="text" name="image" className="form-control" value={q.image} onChange={(e) => handleQuestionChange(qIndex, e)} /></div>
                    <h6 className="mt-4">Answers</h6>
                    {q.answers.map((a, aIndex) => (
                      <div key={aIndex} className="row align-items-center mb-2">
                        <div className="col-lg-5 col-12 mb-2"><input type="text" name="text" placeholder="Answer Text" className="form-control" value={a.text} onChange={(e) => handleAnswerChange(qIndex, aIndex, e)} /></div>
                        <div className="col-lg-4 col-12 mb-2"><input type="text" name="image" placeholder="Answer Image URL" className="form-control" value={a.image} onChange={(e) => handleAnswerChange(qIndex, aIndex, e)} /></div>
                        <div className="col-lg-2 col-6 mb-2"><div className="form-check"><input type="checkbox" name="correct" className="form-check-input" checked={a.correct} onChange={(e) => handleAnswerChange(qIndex, aIndex, e)} /><label className="form-check-label">Correct</label></div></div>
                        <div className="col-lg-1 col-6 mb-2"><button className="btn btn-danger btn-remove-answer" onClick={() => removeAnswer(qIndex, aIndex)}><FontAwesomeIcon icon={faTrash} /></button></div>
                      </div>
                    ))}
                    <button className="btn btn-secondary btn-sm mt-2" onClick={() => addAnswer(qIndex)}>Add Answer</button>
                  </div>
                </div>
              ))}
              <div className="d-grid gap-2 d-md-flex justify-content-md-center mt-4">
                <button className="btn btn-secondary" onClick={addQuestion}>Add Question</button>
                <button className="btn btn-primary" onClick={downloadQuiz}>Download JSON</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mt-4">
        <button className="btn btn-info" onClick={onReturnToStart}>Back to Start</button>
      </div>
    </div>
  );
};

export default QuizCreator;