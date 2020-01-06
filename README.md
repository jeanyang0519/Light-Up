# Light-Up

<h1 align="center">
	<img
		width="300"
		alt="LightUp"
		src="app/assets/images/logo.png">
</h1>

<h3 align="center">
	A mentorship community for students to connect over shared interests and goals.
</h3>

<p align="center">
	<strong>
		<a href="http://light--up.herokuapp.com/">Light Up</a>
	</strong>
</p>

<h1 align="center">
  <img
  alt="Profile Page"
  src="app/assets/images/prof.png">
</hi>

## Overview

- **Create your profile.** Become a mentor, or mentee. Include your interests and skills and find other people that share the same ones!
- **Connect** Connect with others so that you may learn more about their major, or teach highschoolers that are interested in your major!
- **Chat** Have a live chat with students to learn everything you need to know about any topic!

## Built With

- React
- Redux
- MongoDB
- HTML5
- CSS
- Express
- NodeJS

## Features

### **Profile Creation**
 Create a page to display all of the information about you and your interests, and whether you are a mentor or mentee.

```javascript
   connectButton () {
    let connected = "Connect"
    let event = this.props.requestConnection
    const { profile, currentUser } = this.props
    let disabled = false
    if (!profile) return ""
    const connections = this.props.currentUser.connections
    if (profile.id === currentUser.id) {
      return ""
    }
    connections.forEach(connection => {
      if ((connection.user._id === profile.id) && (connection.status === 2)) {
        connected = "Connected"
        event = ""
      } else if (connection.user._id === profile.id && connection.status === 0) {
        connected = "Pending"
        event = ""
      } else if (connection.user._id === profile.id && connection.status === 1) {
        connected = "Accept Request"
        event = this.props.acceptConnection
      }
    })
    if (connected === "Pending" || connected === "Connected") {
      disabled = true
    }
    return (
      <button onClick={(event !== "") ? ()=> event({
                userId: currentUser.id,
                connectionId: profile.id
              }) : event} className={(connected === "Accept Request") ? "Accept" : connected} 
        disabled={disabled}>{connected}</button>
    )
```






### **Live Chat**
Chat in real time with people you connect with!
image


