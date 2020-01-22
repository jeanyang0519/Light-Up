export const selectChatMessages = (messages, chatId) => {
    const chatMessages = []

    messages.forEach(message => {
        if (message.chatId === chatId) {

            chatMessages.push(message)
        }
        
    })
    return chatMessages
}

export const userConnections = (currentUser) => {
    const connections = {};
    currentUser.connections.forEach(connection => {
        // change null conditional after removing corrupted user data.
        if (connection.user !== null) {
            connections[connection.user._id] = connection.status;
        }
    });
    return connections;
}
