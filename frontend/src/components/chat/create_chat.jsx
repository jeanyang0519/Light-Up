import React from "react";
import { fetchMessages, socket, createNewMessage } from "../../actions/chat_actions";
import '../../stylesheets/chat.css';

class CreateChat extends React.Component {
    constructor(props) {
        super(props)
        this.newMessages = []
        this.state = {
            participants: [],
            message: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.update = this.update.bind(this);
    }


    handleSubmit(e) {
        e.preventDefault();

        const data = {
            participants: (this.state.participants.length === 1) ? this.state.participants[0] : this.state.participants,
            message: this.state.message
        }

        this.props.createChat(this.props.currentUser.id, data).then(() => {
            this.setState({
                participants: [],
                message: ""
            });
        });
    };

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



    render() {
        return(
            <form onSubmit={this.handleSubmit} className="chat-form">
                <input type="text" className="participants" onChange={this.update("participants")} placeholder="Type A Name or Multiple Names"/>

                <textarea name="message" className="form-message" cols="30" rows="10" onChange={this.update("message")} placeholder="Enter Message"></textarea>
                <button>
                    Send
                </button>
                {this.renderErrors()}
            </form>
        )
    }
}

export default CreateChat;
