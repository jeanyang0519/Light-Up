import React from 'react';
// import '../../stylesheets/reset.css';
import '../../stylesheets/footer.css';
import linked from './linkedin.png';
import git from './github.png';
import angel from './angellist.png';


class Footer extends React.Component {
 
  render() {
    return (
      <main className="footer">
        


        <div className="people">
        <div className="person">
          <div>
          <a href="https://alaizard.github.io/personal-site/" className="name" target="_blank">Jason Kopacz</a>
          </div>
          <div>
          <a href="https://www.linkedin.com/in/jason-kopacz-2917264a/" target="_blank">
            <img src={linked} alt=""/>
          </a>
          <a href="https://github.com/Alaizard" target="_blank">
            <img src={git} alt=""/>
          </a>
          <a href="https://angel.co/jason-kopacz" target="_blank">
            <img src={angel} alt=""/>
          </a>
          </div>
        </div>
        <div className="person">
          <div>
          <a href="https://jean-yang.com/" className="name" target="_blank">Jean Yang</a>
          </div>
          <div>
          <a href="https://www.linkedin.com/in/jeanyang-engineer/" target="_blank">
            <img src={linked} alt=""/>
          </a>
          <a href="https://github.com/jeanyang0519" target="_blank">
            <img src={git} alt=""/>
          </a>
          <a href="https://angel.co/jean-yang-5" target="_blank">
            <img src={angel} alt=""/>
          </a>
          </div>
        </div>
        <div className="person">
          <div>
          <a href="https://yorkisdiaz.com/" className="name" target="_blank">Yorkis Diaz</a>
          </div>
          <div>
          <a href="https://www.linkedin.com/in/yorkis-diaz-596958196/" target="_blank">
              <img src={linked} alt="" />
          </a>
          <a href="https://github.com/yorkis-diaz" target="_blank">
            <img src={git} alt=""/>
          </a>
          <a href="https://angel.co/yorkis-diaz" target="_blank">
            <img src={angel} alt=""/>
          </a>
          </div>
        </div>
        </div>
      </main>
    );
  }
}

export default Footer;