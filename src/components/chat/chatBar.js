import React, { useEffect } from "react";

const ChatBar = ({ newMessage, handleNewMessageChange, handleNewMessageSubmit, isChatDisabled=false }) => {
  //make sure it submits when I click enter while focused on the input
  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      handleNewMessageSubmit(event);
    }
  }

  useEffect(() => {
    document.getElementById("chatBarInput").focus();
  }, [isChatDisabled]);

  let bgColor = isChatDisabled ? "bg-gray-400 border-gray-600" : "bg-gray-100 border-gray-300";

  return (
    <div className="w-full flex items-center justify-center px-4">
      <input
        type="text"
        placeholder={isChatDisabled ? "" : "Type a message"}
        className={`${bgColor} border rounded-full px-4 py-2 mr-2 focus:outline-none focus:ring focus:border-blue-300 flex-1 max-w-4xl w-full`}
        value={newMessage}
        onChange={handleNewMessageChange}
        onKeyDown={handleKeyDown}
        disabled={isChatDisabled}
        id="chatBarInput"
        name="chatBarInput"
      />
      <button
        className="bg-yellowSecondary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-full focus:outline-none focus:ring focus:border-blue-300"
        type="button"
        onClick={handleNewMessageSubmit}
      >
        <svg className="w-6 h-6 fill-current" viewBox="0 0 20 20">
          <path d="M2.9 17.9L17.1 10L2.9 2.1V8C2.9 9.4 1.8 10.5 0.4 10.5C1.8 10.5 2.9 11.6 2.9 13V17.9Z" />
        </svg>
      </button>
    </div>
  );
};

export default ChatBar;
