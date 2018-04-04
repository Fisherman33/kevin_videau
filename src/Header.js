import React from 'react';
import './Header.css';
import { Navbar} from 'react-bootstrap';
import './Switch.css';

class Header extends React.Component {
    render() {
        return (
            <header   data-time={this.props.time}  className="component-header">
                <Navbar inverse collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand className="menu" data-time={this.props.time} >
                            <a href="#brand">Kévin Videau</a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
              
                </Navbar>
      </header>
        );
    }
}
export default Header;