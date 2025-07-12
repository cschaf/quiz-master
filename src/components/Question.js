import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import Answer from './Answer';

const Question = ({ question, selectedAnswer, onSelect }) => {
  const [imageError, setImageError] = useState(false);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const checkImage = async () => {
      if (question.image && isValidUrl(question.image)) {
        try {
          const res = await fetch(question.image, { method: 'HEAD' });
          if (res.ok) {
            setIsValid(true);
          } else {
            setIsValid(false);
          }
        } catch (error) {
          setIsValid(false);
        }
      } else {
        setIsValid(false);
      }
    };

    checkImage();
  }, [question.image]);

  const handleImageError = () => {
    setImageError(true);
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  return (
    <div>
      <h2>{question.title} {!isValid && <FontAwesomeIcon icon={faExclamationTriangle} className="text-warning ms-2" title="Image link is broken or invalid" />}</h2>
      <p>{question.description}</p>
      {isValid && !imageError && (
        <img
          src={question.image}
          className="img-fluid mb-3"
          alt={question.title}
          onError={handleImageError}
        />
      )}
      <div className="row answer-cards g-4">
        {question.answers.map((answer, index) => (
          <Answer
            key={index}
            answer={answer}
            isSelected={selectedAnswer && selectedAnswer.text === answer.text}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default Question;
