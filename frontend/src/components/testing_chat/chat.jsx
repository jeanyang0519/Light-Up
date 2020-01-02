import React from 'react';

import { socket, fetchChats, createNewMessage } from '../../actions/chat_actions';

class Chat extends React.Component {
  constructor(props) {
    super(props);

    socket.emit("enter chat", "5e0d8f2119c96fcdcd15c2df");

    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    fetchChats("5e0a579d6a0bd7e29328b9b7")
  }

  componentWillUnmount() {
    socket.emit("leave chat", "5e0d8f2119c96fcdcd15c2df");
  }

  handleClick(e) {
      e.preventDefault();
      createNewMessage("5e0a579d6a0bd7e29328b9b7", {
        chatId: "5e0d8f2119c96fcdcd15c2df",
        message: "I want to respond also"
      })
  }

  render() {
        socket.on("refresh messages", data => {
        console.log("about to refresh messages", data);
        // fetch chat needs to go on chat_container
        fetchChats("5e0a579d6a0bd7e29328b9b7");
        });
    return (
        <main>
            Hello from chat
            <button onClick={this.handleClick}>
                create new message
            </button>
        </main>
    )
  }
}

export default Chat;