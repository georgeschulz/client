import Avatar from '../../assets/avatar.jpeg'
//give the border a width
function ChatAvatar({ type, isTyping = true, shouldPulse = false }) {
    if (type === 'lead') {
        return (
            <div className='h-10 w-10 rounded-full bg-slate-300 flex justify-center items-center font-semibold border-yellowSecondary border-2'>
                GS
            </div>
        )
    } else {
        return (
            <img
                src={Avatar}
                alt="Profile"
                className={`h-10 w-10 rounded-full ${isTyping ? 'border-2 border-yellowSecondary' : ''} ${shouldPulse ? 'animate-pulse' : ''}`}
            />
        )
    }   
}

export default ChatAvatar