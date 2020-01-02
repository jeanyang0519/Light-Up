import React from 'react';
import '../../stylesheets/option.css'


class LogoutOption extends React.Component {
    constructor(props) {
        super(props);

        this.handleLogout = this.handleLogout.bind(this)
    }

    handleLogout() {
        // debugger
        this.props.logout();
        this.props.closeModal();
        this.props.history.push('/');
    }



    render() {
        return (
            <div>
                <div className="option-1" onClick={this.handleLogout}>Log Out</div>
                <div className="option-2" onClick={() => (this.props.closeModal())}>Cancel</div>
            </div>
        )
    }
}
export default LogoutOption;