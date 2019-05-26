import React from 'react';
import { connect } from 'react-redux'; 
import { NavLink } from 'react-router-dom'; 
import './Navigation.css';
import { cartItems } from '../../actions';

class Navigation extends React.Component {

    componentDidMount(){
        if (!localStorage.cart){
            localStorage.cart="[]";  
        }    
    }

    countCartItems(){
        if (localStorage.cart){
            const cartArr = JSON.parse(localStorage.cart);
            return cartArr.length;
        }
    }


    render(){

        return (
            <React.Fragment>
                <nav>
                    <div>
                        <div>
                            <ul>
                                <li><NavLink to="/" exact>DESIGNER</NavLink></li>
                                <li><NavLink to="/about" exact>ABOUT</NavLink></li>
                            </ul>
                        </div>
                        <div>
                            <ul>
                                
                                {this.props.isAuthenticated
                                    ? <li><span className="user-email">({localStorage.email})</span><NavLink to="/orders" exact>My Orders</NavLink></li>
                                    : null
                                }
                                {!this.props.isAuthenticated
                                    ? <li><NavLink to="/auth" exact>Authenticate</NavLink></li>
                                    : <li><NavLink to="/logout" exact>Logout</NavLink></li>
                                }
                                
                                <li className="cart">
                                    <NavLink to="/cart" exact title="Shopping Cart"> 
                                        <span>({this.props.crtItems})</span>
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        crtItems: state.cartReducer.cartItems,
        isAuthenticated: state.authReducer.token !== null,
        email: state.authReducer.email
    }
}

export default connect(mapStateToProps, { cartItems }) (Navigation);