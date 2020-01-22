import React from 'react';
import Chat from './chat';
import { selectChatMessages } from '../../util/selectors';
import Conversation from './conversation';
import CreateChatContainer from './create_chat_container';
import '../../stylesheets/chat.css';

class ChatsIndex extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
        conversation: ""
    }
    this.handleMessages = this.handleMessages.bind(this);
    this.handleChat = this.handleChat.bind(this);
  }
  componentDidMount() {
    const userId = this.props.currentUser.id
    this.props.fetchChats(userId);
  }

  handleMessages(user, messages, chatId) {
      this.setState({
        conversation: <Conversation user={user} messages={messages} chatId={chatId} createNewMessage={this.props.createNewMessage}/>
        // conversation: <CreateChat createChat={this.props.createChat} user={user}/>
      })
  }

  handleChat() {
    this.setState({
      conversation: <CreateChatContainer />
    })
  }

  render() {
      const { currentUser, chats, fetchMessages, messages } = this.props
      if (!chats) return null
      const chatsLis = chats.map(chat => {
          const chatMessages = selectChatMessages(messages, chat.chatId);
        return (
            <Chat
              key={chat._id}
              currentUser={currentUser}
              chat={chat}
              fetchChats={this.props.fetchChats}
              messages={chatMessages}
              handleMessages={this.handleMessages}
              fetchMessages={this.props.fetchMessages}
            />
        );
      })
    return (
      <div className='chat-all'>
        <div className='chat-index-all'>
          <h1>Messaging</h1>
          <div className='chat-index-box'>
            <div className="start-chat-container">
              <button className="start-chat" onClick={this.handleChat}>
              </button>
            </div>
            <ul className="chats">
              {chatsLis}
            </ul>
            <ul className='chats-conversation'>
                {this.state.conversation}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default ChatsIndex;