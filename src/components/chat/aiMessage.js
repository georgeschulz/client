import React from 'react';
import MessageContainer from './messageContainer';
import ChatAvatar from './chatAvatar';
import ChatDate from './chatDate';
import ChatMessage from './chatMessage';
import ServiceImg from '../../assets/service.JPG'
import { useState, useEffect } from 'react';
import { renderToString } from 'react-dom/server';

function AIMessage({ date = "", isLoading, children }) {
    const [loadingDots, setLoadingDots] = useState('.');

    function parseRegistrationMergeTag(str) {
        if (typeof str !== "string") return false;
        const regex = /<register([^>]*)>/;
        const match = str.match(regex);

        if (!match) {
            return null; // Return null if the input string doesn't contain <register> tags
        }

        const idRegex = /ID:\s*(\d+)/;
        const initialRegex = /Initial:\s*([\d.]+)/;
        const recurringRegex = /Recurring:\s*([\d.]+)/;

        const idMatch = match[1].match(idRegex);
        const initialMatch = match[1].match(initialRegex);
        const recurringMatch = match[1].match(recurringRegex);
        const url = 'https://chat.abc.com/register?id=' + idMatch[1] + '&initial=' + initialMatch[1] + '&recurring=' + recurringMatch[1];

        if (!idMatch || !initialMatch || !recurringMatch) {
            return null; // Return null if any of the ID, initial, or recurring values are missing
        }

        return {
            id: parseInt(idMatch[1]),
            initial: parseFloat(initialMatch[1]),
            recurring: parseFloat(recurringMatch[1]),
            url: url
        };
    }


    function replaceRegistrationLink(str, pricing) {
        const linkUrl = pricing.url;
        const linkText = 'Registration Link';
        const regex = /<register:([^>]*)>/g;
        
        let splits = str.split(regex);

        let elements = []
            
        for (let i = 0; i < splits.length; i++) {
            if (i % 2 === 0) {
                elements.push(<span key={Math.random()}>{splits[i]}</span>)
            } else {
                elements.push(<a key={Math.random()} href={linkUrl} className='text-yellowSecondary underline hover:pointer hover:opacity-80'>{linkText}</a>)
            }
        }
        return elements
    }

    useEffect(() => {
        if (isLoading) {
            const interval = setInterval(() => {
                setLoadingDots((dots) => {
                    if (dots.length < 3) {
                        return dots + '.';
                    } else {
                        return '.';
                    }
                });
            }, 500);
            return () => clearInterval(interval);
        }
    }, [isLoading]);

    let registerLink = parseRegistrationMergeTag(children);
    let messageContent = children;
    //replace any contents between <register...> tags with a link
    if (registerLink) {
        messageContent = replaceRegistrationLink(messageContent, registerLink);
    }

    return (
        <MessageContainer type="ai">
            <ChatAvatar type="ai" shouldPulse={isLoading} />
            <div className="flex flex-col">
                <ChatMessage isLoading={isLoading}>{messageContent}</ChatMessage>
                {registerLink && (
                    <div className="w-96 mt-4">
                        <div className="flex bg-gray-100 px-4 py-2 rounded-xl gap-x-4 items-center hover:bg-gray-200 cursor-pointer">
                            <img src={ServiceImg} alt="placeholder" className='w-1/4 rounded-xl' />
                            <div className="text-gray-900 font-medium">
                                <p className='font-semibold text-lg'>Castle Program</p>
                                <p className='text-gray-700 text-sm'>${registerLink.initial} initial, ${registerLink.recurring} / service</p>
                                <p className='text-gray-700 text-sm'>Click to sign up for this program.</p>
                            </div>
                        </div>
                    </div>
                )}
                <ChatDate type="ai" isLoading={isLoading}>{isLoading ? `G is typing${loadingDots}` : date}</ChatDate>

            </div>

        </MessageContainer>
    )
}

export default AIMessage;