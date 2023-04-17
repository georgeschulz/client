function ChatDate({ children, type, isLoading=false }) {
    return (
        <div className="text-gray-500 text-sm mt-2 flex">
            <div>{children}</div>
            { type === 'ai' && !isLoading && <div className="text-right ml-2"> | G</div>}
            { type === 'lead' && <div className="text-right ml-2"> | You</div> }
        </div>
    )
}

export default ChatDate