import React from 'react';
import Header from '../Layout/Header/Header';
import Footer from '../Layout/Footer/Footer';
import './Layout.css';

class Layout extends React.Component{

    render(){
        return(
            <React.Fragment>
                <Header />
                <main id="main">
                    {this.props.children}
                </main>
                <Footer />
            </React.Fragment>
            
        );
    }
}

export default Layout;