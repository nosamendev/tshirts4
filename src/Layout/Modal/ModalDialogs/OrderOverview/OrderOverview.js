import React from 'react';
import { connect } from 'react-redux'; 
import { Link } from 'react-router-dom';

import { closeModal, tshirtOrdering, cartItems, cartTotalPrice } from '../../../../actions';
import './OrderOverview.css';

class OrderOverview extends React.Component {
state={test: 123}
    handleContinue = () => {
        //this.props.tshirtOrdering(true);
        this.props.closeModal();

    }
    toUpperLetter = (str) => {
        const firstLetter = str.charAt(0).toUpperCase();
        return str.replace(str.charAt(0), firstLetter);
    }

    renderText(){
        if (this.props.text) {
            return <p>{this.props.text}</p>;
        }
    }

    render(){
        return(
            <div>
                <h2>{this.props.title}</h2>
                {this.renderText()}
                
                <div className="order-overview">
                    <table>
                        <thead>
                            <tr>
                                <th colSpan="2">{this.toUpperLetter(this.props.gender)} T-shirt</th>
                            </tr>
                            </thead>
                        <tbody>
                            <tr>
                                <td>Size:</td>
                                <td>{this.props.size}</td>
                            </tr>
                            <tr>
                                <td>Cotton Type:</td>
                                <td>{this.props.type}</td>
                            </tr>
                            <tr>
                                <td>Color:</td>
                                <td>{this.toUpperLetter(this.props.color)}</td>
                            </tr>
                            <tr>
                                <td>Quantity:</td>
                                <td>{this.props.quantity}</td>
                            </tr>
                            <tr className="price">
                                <td>Price:</td>
                                <td>${(this.props.price * this.props.quantity).toFixed(2)}</td>
                            </tr>
                            </tbody>
                    </table>
                </div>
                <div>
                    <Link 
                        to={{
                            pathname:"cart",
                            params: {
                                gender: this.props.gender,
                                size: this.props.size,
                                type: this.props.type,
                                color: this.props.color,
                                quantity: this.props.quantity,
                                price: this.props.price
                            }
                        }}
                        
                        className="button" onClick={this.handleContinue.bind(this)}>Continue</Link>
                    <button className="second-level-button" onClick={this.props.closeModal}>Cancel</button>
                </div>
            </div>  
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isModalOpen: state.modalReducer.isModalOpen,
        crtItems: state.cartReducer.cartItems,
        crtTotalPrice: state.cartReducer.cartTotalPrice
    }
}
export default connect(mapStateToProps, { closeModal, tshirtOrdering, cartItems, cartTotalPrice }) (OrderOverview);