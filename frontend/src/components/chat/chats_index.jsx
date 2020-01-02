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
    // this.conversation = "yo";
    this.handleMessages = this.handleMessages.bind(this);
  }
  componentDidMount() {
    const userId = this.props.user.id
    this.props.fetchChats(userId);
  }

  handleMessages(user, messages) {
      this.setState({
        conversation: <Conversation user={user} messages={messages} />
      })
  }

  render() {
      const { user, chats, fetchMessages, messages } = this.props
      if (!chats) return null
      const chatsLis = chats.map(chat => {
          const chatMessages = selectChatMessages(messages, chat.chatId);
        return (
            <Chat
              key={chat._id}
              user={user}
              chat={chat}
              fetchMessages={fetchMessages}
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