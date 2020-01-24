import React from 'react';
import Chat from './chat';
import { selectChatMessages } from '../../util/selectors';
import Conversation from './conversation';
import CreateChatContainer from './create_chat_container';
import '../../stylesheets/chat.css';
import add from '../../stylesheets/add.png';
import { withRouter } from 'react-router-dom';

class ChatsIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      conversation: ""
    };
    this.handleMessages = this.handleMessages.bind(this);
    this.handleChat = this.handleChat.bind(this);
    this.resetConversation = this.resetConversation.bind(this);
  }
  componentDidMount() {
    const userId = this.props.currentUser.id;
    this.props.fetchChats(userId);
  }

  resetConversation() {
    this.setState({
      conversation: ""
    });
  }

  handleMessages(user, messages, chatId) {
    const ConversationWithRouter = withRouter(Conversation);
    this.setState({
      conversation: (
        <ConversationWithRouter
          user={user}
          messages={messages}
          chatId={chatId}
          createNewMessage={this.props.createNewMessage}
          leaveChat={this.props.leaveChat}
          resetConversation={this.resetConversation}
        />
      )
      // conversation: <CreateChat createChat={this.props.createChat} user={user}/>
    });
  }

  handleChat() {
    this.setState({
      conversation: <CreateChatContainer handleMessages={this.handleMessages} />
    });
  }

  render() {
    const { currentUser, chats, fetchMessages, messages } = this.props;
    if (!chats) return null;
    const chatsLis = chats.map(chat => {
      const chatMessages = selectChatMessages(messages, chat._id);
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
    });
    return (
      <div className="chat-all">
        <div className="chat-index-all">
          <h1>Messaging</h1>
          <div className="chat-index-box">
            <div className="start-chat-container">
              <button className="start-chat" onClick={this.handleChat}>
                <img src={add} alt="" />
              </button>
              <p>Start a Chat</p>
            </div>

            <ul className="chats">{chatsLis}</ul>
            <ul className="chats-conversation">{this.state.conversation}</ul>
          </div>
        </div>
      </div>
    );
  }
}

export default ChatsIndex;