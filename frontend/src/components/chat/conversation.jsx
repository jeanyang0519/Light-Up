import React from "react";
import { fetchMessages } from "../../actions/chat_actions";

class Conversation extends React.Component {




  render() {
      const { messages, user } = this.props 
        debugger
      const messageLis = messages.map(message => {
        //   const date = new Date(message.date).toLocaleDateString
          return (
              <li key={message._id}>
                {/* <div>{date}</div> */}
                <h2>
                {user.username}
                </h2>
                <p>
                {message.message}
                </p>
              </li>
          )
      })
      debugger
    return (
        <ul>
            {messageLis}
        </ul>
    );
  }
}

export default Conversation;
