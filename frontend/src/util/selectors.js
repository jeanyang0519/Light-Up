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
        connections[connection.user._id] = connection.status;
    });
    return connections;
}

export const selectUserChats = (currentUser) => {
    const chats = {};
    // debugger
    currentUser.connections.forEach(connection => {
        // change null conditional after removing corrupted user data.
        chats[connection.user._id] = connection.user.username;
    });
    return chats;
}
