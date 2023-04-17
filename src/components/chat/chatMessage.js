function ChatMessage({children}) {
    return (
        <div className="bg-gray-100 px-4 py-2 rounded-xl">
            <div className="text-gray-900 font-medium">
                {children}
            </div>
        </div>
    )
}

export default ChatMessage;