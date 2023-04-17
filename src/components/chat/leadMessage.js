import React from 'react';
import MessageContainer from './messageContainer';
import ChatAvatar from './chatAvatar';
import ChatDate from './chatDate';
import ChatMessage from './chatMessage';

function LeadMessage({ date="", children}) {
    return (
        <MessageContainer type="right">
            <div className="flex flex-col">
                <ChatMessage>{children}</ChatMessage>
                <ChatDate type="lead">{date}</ChatDate>
            </div>
            <ChatAvatar type="lead" />
        </MessageContainer>
    )
}

export default LeadMessage;
