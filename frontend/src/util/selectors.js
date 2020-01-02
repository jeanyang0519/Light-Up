export const selectChatMessages = (messages, chatId) => {
    const chatMessages = []
    messages.forEach(message => {
        if (message.chatId === chatId) {

            chatMessages.push(message)
        }
        
    })
    debugger
    return chatMessages
}