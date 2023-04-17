function MessageContainer({ children, type }) {
    return (
        <div className={`flex flex-wrap w-full ${type === 'right' ? 'justify-end' : 'justify-start'}`}>
            <div className="flex space-x-4">
                {children}
            </div>
        </div>
    )
}

export default MessageContainer;