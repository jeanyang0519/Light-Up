import React from 'react';
import { Link } from 'react-router-dom';

import { socket, fetchChats, createNewMessage } from '../../actions/chat_actions';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    socket.emit("enter chat", "5e0d8f2119c96fcdcd15c2df");
    // socket.on("refresh messages", data => {
    //     // console.log("about to refresh messages", data);
    //     // fetch chat needs to go on chat_container
    //     fetchChats("5e0a579d6a0bd7e29328b9b7");
    // });

    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    if (this.props.messages.length === 0 ) {
      this.props.fetchMessages(this.props.chat._id)
    }

  }

  componentWillUnmount() {
    const chatId = this.props.chat._id
    socket.emit("leave chat", chatId);
  }

  handleClick() {
    const chatId = this.props.chat.chatId;
    this.props.fetchMessages(chatId).then((res) => {
      this.props.handleMessages(this.props.user, this.props.messages)
    })
    
  }

  render() {
    const { user, chat, messages } = this.props
    if (!user) return null
    return (
      <div onClick={this.handleClick}>
        <h2>{user.username}</h2>
        <h3>{user.email}</h3>
      </div>
    )
  }
}

export default Chat;