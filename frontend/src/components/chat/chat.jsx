import React from 'react';
import { Link } from 'react-router-dom';
import '../../stylesheets/reset.css';
import '../../stylesheets/chat.css'

import { socket, fetchChats, createNewMessage } from '../../actions/chat_actions';
import { selectChatMessages, selectUserChats } from '../../util/selectors';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.clicked = ""
    this.state = {
      clicked: ""
    }

    this.handleClick = this.handleClick.bind(this)
    this.selectParticipants = this.selectParticipants.bind(this)
  }

  componentDidMount() {
    socket.on('connect', () => {
      socket.emit('enter chat', {username: this.props.currentUser.username})
    })
    if (this.props.search && this.props.search.slice(1) === this.props.chat._id) {
      this.setState({
        clicked: "clicked"
      })
    }
    // socket.emit("enter chat", this.props.currentUser.username)
  }

  componentDidUpdate (prevProps) {
    const search = this.props.search.slice(1)
    const chatId = this.props.chat._id
    if (search && search === chatId && this.state.clicked === "") {
      this.setState({
        clicked: "clicked"
      })
    } else if (search && search !== chatId && this.state.clicked === "clicked") {
      this.setState({
        clicked: ""
      })
    }
  }
  

  componentWillUnmount() {
    const chatId = this.props.chat._id
    socket.emit("leave chat", chatId);
  }

  

  selectParticipants() {
    const names = selectUserChats(this.props.currentUser)


    const participants = this.props.chat.participants.filter((participant => participant !== this.props.currentUser.id))
    if (participants.length === 0) {
      return (
        <h2 key={0}>
          No Participants
        </h2>
      )
    } else {
      return participants.map((user, i) => {
        return (
          <h2 key={i}>{names[user]}</h2>
        )
      })
    }
  }

  handleClick() {
    const chatId = this.props.chat._id;
    // this.setState({
    //   clicked: "clicked"
    // })
    this.props.fetchMessages(chatId).then((res) => {
      this.props.handleMessages(this.props.currentUser, this.props.messages, this.props.chat._id)
    })
  }

  render() {
    const { currentUser, chat, messages } = this.props
    if (!currentUser) return null
    if (!chat.participants) return null
    return (
      <div className='chat-sender'  onClick={this.handleClick}>
        <div className={`chat-sender-username ${this.state.clicked}`} tabIndex="1">{this.selectParticipants()}</div>
        {/* <input className='chat-sender-username' >{this.selectParticipants()}</input> */}
        
      </div>
    )
  }
}

export default Chat;