import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import Navigation from '../Navigation/Navigation';

const Header = () => {
    return (
        <React.Fragment>
            <header>
                <Navigation />
                <div id="logo-container">
                    <div id="logo">
                        <Link to="/"></Link>
                    </div>
                </div>
                
            </header>
        </React.Fragment>
    );
}

export default Header;