import React from "react";
import AIMessage from "./aiMessage";

function AIMessageThread({ messages }) {
    return (
        <div className="message-thread">
        {messages.map((message, index) => {
            return <AIMessage key={index} date={message.date}>{message.content}</AIMessage>
        })}
        </div>
    )
}