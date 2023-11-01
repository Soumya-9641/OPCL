import React, { useState } from 'react';

const Question = ({ question, index, questionId,onAnswerChange }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleOptionChange = (optionIndex) => {
    setSelectedAnswer(optionIndex);
    onAnswerChange(questionId, optionIndex);
  };

  return (
    <div className="border p-4 m-4 rounded-lg">
      <p className="font-bold">Question {index + 1}: {question.text}</p>
      <div className="mt-4">
        {question.options.map((option, optionIndex) => (
          <div key={optionIndex} className="mb-2">
            <input
              type="radio"
              id={`option-${optionIndex}`}
              name={`question-${index}`}
              value={optionIndex}
              checked={selectedAnswer === optionIndex}
              onChange={() => handleOptionChange(optionIndex)}
            />
            <label htmlFor={`option-${optionIndex}`} className="ml-2">{option}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Question;