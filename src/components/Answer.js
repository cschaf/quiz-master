import React, { useState, useEffect } from 'react';

const Answer = ({ answer, isSelected, onSelect }) => {
  const [imageError, setImageError] = useState(false);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const checkImage = async () => {
      if (answer.image && isValidUrl(answer.image)) {
        try {
          const res = await fetch(answer.image, { method: 'HEAD' });
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
  }, [answer.image]);

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

  const cardClasses = `card mb-3 ${isSelected ? 'border-primary' : ''}`;

  return (
    <div className="col-lg-6 col-12">
      <div className={cardClasses} onClick={() => onSelect(answer)}>
        <div className="card-body">
          {isValid && !imageError && (
            <img
              src={answer.image}
              className="card-img-top"
              alt={answer.text}
              onError={handleImageError}
            />
          )}
          <p className="card-text">{answer.text}</p>
        </div>
      </div>
    </div>
  );
};

export default Answer;
