import React from 'react';
import Chat from './chat';
import { selectChatMessages } from '../../util/selectors';
import Conversation from './conversation';

class ChatsIndex extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
        conversation: ""
    }
    this.handleMessages = this.handleMessages.bind(this);
  }
  componentDidMount() {
    const userId = this.props.currentUser.id
    this.props.fetchChats(userId);
  }

  handleMessages(user, messages, chatId) {
      this.setState({
        conversation: <Conversation user={user} messages={messages} chatId={chatId} createNewMessage={this.props.createNewMessage}/>
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
      <div>
        <h1>Messaging</h1>
        <ul>
          {chatsLis}
        </ul>
        <ul>
            {this.state.conversation}
        </ul>
      </div>
    )
  }
}

export default ChatsIndex;