import React from 'react';
import Chat from './chat';
import { selectChatMessages } from '../../util/selectors';
import Conversation from './conversation';
import CreateChatContainer from './create_chat_container';
import '../../stylesheets/chat.css';
import add from '../../stylesheets/add.png';
import { withRouter, Route } from 'react-router-dom';

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
    const { search } = this.props.location
    if (search) {
      const chatId = search.slice(1)
      this.props.fetchMessages(chatId).then(() => {
        const { messages } = this.props;
        const chatMessages = selectChatMessages(messages, chatId);
        this.setState({
          conversation: (
            <Conversation 
              user={this.props.currentUser}
              messages={chatMessages}
              chatId={chatId}
              createNewMessage={this.props.createNewMessage}
              leaveChat={this.props.leaveChat}
              resetConversation={this.resetConversation}
            />
          )
        })
      })
    }
  }

  resetConversation() {
    this.setState({
      conversation: ""
    });
  }

  handleMessages(user, messages, chatId) {
    const ConversationWithRouter = withRouter(Conversation);
    const { search } = this.props.location
    if (search.slice(1) !== chatId) {
      this.props.history.push({ pathname: `/chat`, search: chatId })
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
      });
    }
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
            <div>
              <Route exact path="/chat/:chatId" component={this.props.conversation} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ChatsIndex;