import React from "react";
import { fetchMessages, socket, createNewMessage } from "../../actions/chat_actions";

class Conversation extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.newMessages = []
    this.state = {
      newMessage: 0
    }
    
    socket.on("refresh messages", data => {
        this.newMessages.push(data)
        this.setState({
          newMessage: this.state.newMessage + 1
        })
        // console.log("I'm hearing it all")
      
    });
  }


  handleClick(e) {
    e.preventDefault();
    const data = {
      chatId: this.props.chatId,
      message: "it finally works"
    }
    this.props.createNewMessage(this.props.user.id, data).then(() => {

    })
  }

  render() {
      const { messages, user } = this.props
      let allMessages = messages.concat(this.newMessages)
      const messageLis = allMessages.map(message => {
          return (
              <li key={message._id}>
                <h2>
                {message.sender.username}
                </h2>
                <p>
                {message.message}
                </p>
              </li>
          )
      })
    return (
        <ul>
            {messageLis}

            <button onClick={this.handleClick}>
              New Message
            </button>
        </ul>
    );
  }
}

export default Conversation;
