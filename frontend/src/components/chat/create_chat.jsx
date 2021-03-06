import React from "react";
import { fetchMessages, socket, createNewMessage } from "../../actions/chat_actions";
import '../../stylesheets/chat.css';

class CreateChat extends React.Component {
    constructor(props) {
        super(props)
        this.newMessages = []
        this.state = {
            participants: {},
            message: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.update = this.update.bind(this);
        this.selectOptions = this.selectOptions.bind(this);
        this.optionClick = this.optionClick.bind(this);
    }


    handleSubmit(e) {
        e.preventDefault();
        const participants = Object.keys(this.state.participants)
        const data = {
            participants: (participants.length === 1) ? participants[0] : participants,
            message: this.state.message
        }

        this.props.createChat(this.props.currentUser.id, data).then((chat) => {
            if (this.props.errors.length === 0) {
                this.props.handleMessages(this.props.currentUser, this.props.messages, chat._id)
            }
        });
    };

    componentWillUnmount () {
        this.setState({
          participants: {},
          message: ""
        });
    }

    update(message) {
        return e => {
            this.setState({ [message]: e.target.value })
        }
    }

    renderErrors() {
        return (
            <ul className="login-errors">
                {this.props.errors.map((error, i) => (
                    <li key={`error-${i}`}>
                        {error}
                    </li>
                ))}
            </ul>
        );
    }

    optionClick (e) {
        e.preventDefault();
        const options = e.currentTarget.children
        
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected  === true && !(options[i].value in this.state.participants)) {
                this.setState({
                    participants: { ...this.state.participants, [options[i].value]: options[i].text } 
                })
            } else if (options[i].selected === true && options[i].value in this.state.participants) {
                let currentParticipants = this.state.participants;
                delete currentParticipants[options[i].value]
                this.setState({
                    participants: currentParticipants
                })
            }
        }
        
    }
    selectOptions () {
        let { connections } = this.props.currentUser
        return connections.filter(connection => connection.status === 2).map((connection, i) => {
            return (
              <option value={connection.user._id} key={i}>
                {connection.user.first_name} {connection.user.last_name}
              </option>
            );
        })
    }




    render() {
        return(
            <form onSubmit={this.handleSubmit} className="chat-form">
                <select name="" id="" defaultValue="Select Connection" onChange={this.optionClick}>
                    <option value="Select Connection" disabled>Select Connection</option>
                    {this.selectOptions()}
                </select>
                <input type="text" disabled className="participants" onChange={this.update("participants")} value={Object.values(this.state.participants).join(", ")} placeholder="Selected Connection(s)"/>

                <textarea name="message" className="form-message" cols="30" rows="10" onChange={this.update("message")} placeholder="Write a message..."></textarea>
                <button>
                    Send
                </button>
                {this.renderErrors()}
            </form>
        )
    }
}

export default CreateChat;
