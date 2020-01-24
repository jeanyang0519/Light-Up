import React from "react";
import { fetchMessages, socket, createNewMessage } from "../../actions/chat_actions";
import '../../stylesheets/chat.css';

class Conversation extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.newMessages = [];
    this.state = {
      newMessage: 0,
      message: "",
      receiveMessage: false
    };

    this.update = this.update.bind(this);
    this.mesRef = React.createRef();
    this.scrollToBottom = this.scrollToBottom.bind(this);
    this.handleLeaveChat = this.handleLeaveChat.bind(this)

    socket.on("refresh messages", data => {
      this.newMessages.push(data);
      this.setState({
        newMessage: this.state.newMessage + 1,
        message: "",
        receiveMessage: true
      });
      // console.log("I'm hearing it all")
    });
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.chatId !== this.props.chatId) {
      this.scrollToBottom();
    } else if (this.state.receiveMessage) {
      this.scrollToBottom();
      this.setState({
        receiveMessage: false
      });
    }
  }


  scrollToBottom = () => {
    this.mesRef.current.scrollTop = this.mesRef.current.scrollHeight;
  };


  handleClick(e) {
    e.preventDefault();
    const data = {
      chatId: this.props.chatId,
      message: this.state.message
    };
    this.props.createNewMessage(this.props.user.id, data).then(() => {
      this.scrollToBottom();
    });
  }

  handleLeaveChat(e) {
    e.preventDefault();
    const data = {
      userId: this.props.user.id
    };
    this.props.leaveChat(this.props.chatId, data).then(() => {
      socket.emit("leave chat", this.props.chatId);
      this.props.resetConversation();
    });
  }

  update(message) {
    return e => {
      this.setState({ [message]: e.target.value });
    };
  }

  render() {

    const { messages, currentUser } = this.props;
    let allMessages = messages.concat(this.newMessages);
    const messageLis = allMessages
      .filter(message => message.chatId === this.props.chatId)
      .map(message => {
        return (
          <li className="msg-list" key={message._id}>
            <div className="chat-sender-name">{message.sender.username}</div>
            <p>{message.message}</p>
          </li>
        );
      });
    return (
      <div className="msg-wrapper">
        <ul className="msg-list-all" ref={this.mesRef}>
          {messageLis}
        </ul>

        <div className="msg-input-box">
          <textarea
            className="msg-input"
            type="text"
            placeholder="Write a message..."
            value={this.state.message}
            onChange={this.update("message")}
          />
          <button className="send-button" onClick={this.handleClick}>
            Send
          </button>
          <button onClick={this.handleLeaveChat}>Leave Chat</button>
        </div>
      </div>
    );
  }
}

export default Conversation;
