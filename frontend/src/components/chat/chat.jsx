import React from 'react';
import { Link } from 'react-router-dom';
import '../../stylesheets/chat.css'

import { socket, fetchChats, createNewMessage } from '../../actions/chat_actions';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    

    // socket.on("refresh messages", data => {
    //   // socket.emit("I'm going to refresh", {hello: 'world'})
    //   // console.log();
    //   // fetch chat needs to go on chat_container
    //   console.log(data)
    // });


    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    if (this.props.messages.length === 0 ) {
      this.props.fetchMessages(this.props.chat._id)
    }
    socket.on('connect', () => {
      socket.emit('enter chat', {username: this.props.currentUser.username})
    })
    // socket.emit("enter chat", this.props.currentUser.username)
  }
  

  componentWillUnmount() {
    const chatId = this.props.chat._id
    socket.emit("leave chat", chatId);
  }

  handleClick() {
    const chatId = this.props.chat.chatId;
    this.props.fetchMessages(chatId).then((res) => {
      this.props.handleMessages(this.props.currentUser, this.props.messages, this.props.chat.chatId)
    })
    
  }

  render() {
    const { currentUser, chat, messages } = this.props
    if (!currentUser) return null
    return (
      <div className='chat-sender' onClick={this.handleClick}>
        <div className='chat-sender-username'>{this.props.chat.sender.username}</div>
        
      </div>
    )
  }
}

export default Chat;