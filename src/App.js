//boilerplate libraries
import './App.css';
import AIMessage from './components/chat/aiMessage';
import BufferingMessage from './components/chat/bufferingMessage';
import ChatBar from './components/chat/chatBar';
import LeadMessage from './components/chat/leadMessage';
import ContactModal from './components/modals/contactModal';
import { useState, useEffect } from 'react';

function App() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(true);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messageNumber, setMessageNumber] = useState(0);
  const [isChatDisabled, setIsChatDisabled] = useState(false);
  const [contact, setContact] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  });

  let randomResponses = [
    ["Oh no, that's not fun at all 😕. I'd be happy to help you with that. Can I ask you a few questions so we can provide an accurate quote for our pest control services?"],
    ["Great, thanks! Can you please tell me where on your property you've noticed the roach issue?"],
    ["Got it. And what's the square footage of your property? This will help us determine the best treatment plan for you."],
    ["Thanks for the info! What type of property is it? (single family, townhome, apartment, condo, commercial, etc.)"],
    ["Thanks! Just to clarify, you have an apartment with 2500 sq ft and 1 acre land? Or is this the entire building size and area?"],
    ["No problem! So it's a townhome with 2500 sq ft and 1 acre. Now, have you noticed any other pests besides roaches that we should be aware of?"],
    ["Well don't fret John. We see this kind of thing all the time. Give me just a second to check some pricing for you!",
      "Okay, John, based on the information you've provided me, I would recommend our Monthly Pest and Rodent Control program. The initial price is $149, and the recurring price is only $95.0 per month. It's an ongoing pest and rodent control plan that will provide you with a high level of protection against pests, mice, and rats. We come out monthly and complete a perimeter treatment and set up and maintain a rodent baiting program. This plan covers a wide range of pests, including ants, spiders, rodent issues, millipedes, roach issues, crickets, and centipedes.",
      "This plan is best for customers with an active roach or rodent issue, like the one you described. Also, since you live in a townhome and your infestation is located in the kitchen, this could make it more difficult to control the infestation. The Monthly Pest and Rodent Control plan will provide the high level of care needed to treat the issue effectively.",
      "With this plan, you'll have year-round protection and peace of mind from seasonal invaders. The perimeter treatments keep pests from getting into your home, and we even knock down ugly cobwebs for you. You'll also get rid of severe rodent issues and keep them from coming back. The recurring price is very affordable at only $95.0 per month.",
      "John, I would love to set you up with this plan. How does it sound to you?"],
    ["We don't offer a one-time treatment for pests like roaches, mainly because these critters can be quite persistent and may require regular treatments to ensure they're entirely eliminated. Our Monthly Pest and Rodent Control program will help to maintain consistent protection and tackle any potential issues before they grow bigger. Plus, you always have the option to cancel the plan at any time if you're not satisfied. In fact, if you sign up now, I can throw in a free annual termite inspection as a bonus. How does that sound? 😊"],
    ["I totally get that, John. To help you out, I can go ahead and bump $25 off the initial price, making it just $124 for the first month! Afterward, the recurring price will be the regular $95.00 per month. And you'll still get that free annual termite inspection as a bonus. What do you think? Is that a better fit for your budget?"],
    ["I totally understand, John. It's always good to discuss things with your partner. While you're talking it over, I'll do you one better and make a special offer 🎁. If you decide to book your visit today, I'll bump the initial price down to $99. That's a whole $50 off just for you! Remember, this plan comes with great coverage for pests and rodents, including those pesky roaches, and it includes that free annual termite inspection too."],
    ["When you're ready to move forward, let me know which date would be best for you: 4-5-23, 4-7-23, or 4-8-23. And don't hesitate to reach out if you need more information or have any questions!"],
    ["Haha, thanks John! I'm just trying to make sure you get the best possible deal 😉. So, which date works best for you to start our Monthly Pest and Rodent Control program: 4-5-23, 4-7-23, or 4-8-23? Once we've got that sorted, I'll send you the registration link."],
    ["Awesome! You're all set for 4-7-23. To complete the registration process, just click this link: <register: ID:2, Initial: 150, Recurring: 75>. I know you and your wife will be relieved once those roaches are gone. If you have any questions or need anything at all, don't hesitate to reach out. Have a great day, John! 😊"]
  ]

  function handleContactModalClose() {
    setIsContactModalOpen(false);
  }

  function disableChat() {
    setIsChatDisabled(true);
  }

  function enableChat() {
    setIsChatDisabled(false);
  }

  async function postThread() {
    let response = randomResponses[messageNumber];
    return response;
  }

  function calculateRandomLoadTime() {
    let base = 2500;
    //calculate a random number that is between 0-2, 15% of the time, 2-4, 30% of the time, 4-6, 30% of the time, 6-8, 15% of the time, 8-10, 10% of the time
    let random = Math.random();
    if (random < 0.15) {
      return base * 2;
    } else if (random < 0.45) {
      return base * 3;
    } else if (random < 0.75) {
      return base * 4;
    } else if (random < 0.9) {
      return base * 5;
    } else {
      return base * 6;
    }
  }

  function handleNewMessageChange(event) {
    setNewMessage(event.target.value);
  }

  async function handleNewMessageSubmit(event) {
    event.preventDefault();
  
    // Add the user's message
    setMessages((prevMessages) => [
      ...prevMessages,
      { content: newMessage, type: 'lead', date: new Date().toLocaleTimeString() },
    ]);
    setNewMessage('');
  
    // Create a random load time to simulate a human typing
    let loadTime = calculateRandomLoadTime();
    // let startTypingDelay = loadTime - 2000 < 0 ? 0 : loadTime - 2000;
    let startTypingDelay = 3000;

    // Fetch the AI response
    const thread = await postThread();
  
    // Add a delay before showing the AI response
    setTimeout(() => {
      setIsTyping(true);
      disableChat();
      dripMessages(0);
    }, startTypingDelay);
  
    // Drip out the AI responses so that they appear to be typed out
    async function dripMessages(index) {
      if (index < thread.length) {
        await new Promise(resolve => {
          setTimeout(() => {
            setMessages((prevMessages) => [
              ...prevMessages,
              { content: thread[index], type: 'ai', date: new Date().toLocaleTimeString() },
            ]);
            resolve();
          }, 2000);
        });
        await dripMessages(index + 1);
      } else {
        setIsTyping(false);
        enableChat();
        setMessageNumber(messageNumber + 1);
      }
    }
  }

  //scroll to the bottom of the chat window when a new message is added
  useEffect(() => {
    const chatWindow = document.querySelector('.flex-1');
    chatWindow.scrollTop = chatWindow.scrollHeight - chatWindow.clientHeight;
  }, [messages, isTyping]);

  //send the default message when the contact is submitted
  useEffect(() => {
    if (!isContactModalOpen) {
      setIsTyping(true);
      disableChat();
      setIsChatDisabled(true);
      setTimeout(() => {
        setMessages([{
          content: `Hi ${contact.firstName}, my name is G and I can help you get an estimate online! I'm here to help you get an estimate for your pest control needs. How can I help? 😊`,
          type: 'ai',
          //make the date not include seconds or AM/OM
          date: new Date().toLocaleTimeString()
        }])
        setIsTyping(false);
        enableChat();
        setIsChatDisabled(false);
      }, 2000);
    }
  }, [isContactModalOpen]);

  return (
    <div className="App bg-primary w-full h-screen">
      <ContactModal open={isContactModalOpen} handleClose={handleContactModalClose} handleContact={setContact} />
      <div className="flex flex-col h-screen">
        <div className="hidden lg:block h-16 bg-darkGreen flex-col justify-center">
          <h1 className='text-white text-2xl text-center w-full font-semibold pt-3'>ABC Pest Live Chat</h1>
        </div>

        <div className="flex-1 overflow-y-auto flex justify-center pt-8 mb-16">
          <div className="flex flex-col space-y-4 p-4 w-full max-w-4xl mx-auto">
            {messages.map((message, index) => {
              if (message.type === 'ai') {
                return <AIMessage key={index} date={message.date}>{message.content}</AIMessage>
              } else {
                return <LeadMessage key={index} date={message.date}>{message.content}</LeadMessage>
              }
            })}
            {isTyping && <AIMessage date="" isLoading={true}><BufferingMessage /></AIMessage>}
          </div>
        </div>

        <div className="h-24 md:h-48 bg-darkGreen flex align-middle">
          <ChatBar
            newMessage={newMessage}
            handleNewMessageChange={handleNewMessageChange}
            handleNewMessageSubmit={handleNewMessageSubmit}
            isChatDisabled={isChatDisabled}
          />
        </div>

      </div>
    </div>
  );
}

export default App;
