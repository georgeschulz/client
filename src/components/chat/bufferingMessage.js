import React from 'react';
import './bufferingMessage.css'

const BufferingMessage = () => {
  return (
    <div className="buffering-message">
      <div className="typing-indicator">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default BufferingMessage;
