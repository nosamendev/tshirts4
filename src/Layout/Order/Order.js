import React from 'react';
import { connect } from 'react-redux'; 
import { Link } from 'react-router-dom'; 
import DesignerImage from '../Designer/DesignerImage/DesignerImage';


import './Order.css';

class Order extends React.Component {

    toUpperLetter = (str) => {
        if (!str) {
            return null;
        }
        const firstLetter = str.charAt(0).toUpperCase();
        return str.replace(str.charAt(0), firstLetter);
    }

    render(){

        return(
            <React.Fragment>
                <h2>Order</h2>
                <div className="order-info">
                    <section id="tshirt-container">
                    <div className="tshirt">
                        <DesignerImage /> 
                    </div>
                        
                        <div>
                            <ul>
                                <li>{this.toUpperLetter(this.props.tshGender)} T-shirt</li>
                                <li>Size: {this.props.tshSize}</li>
                                <li>Cotton Type: {this.props.tshType}</li>
                                <li>Color: {this.toUpperLetter(this.props.tshColor)}</li>
                            </ul>
                        </div>
                    </section>
                    <div className="options">
                        <form>
                            <div>
                                <label>
                                    <span>Your Name:</span>
                                    <input />
                                </label>
                                <label>
                                    <span>Your Email:</span>
                                    <input />
                                </label>
                                <label>
                                    <span>Address:</span>
                                    <input />
                                </label>
                                <label>
                                    <span>ZIP:</span>
                                    <input />
                                </label>
                            </div>
                            <button>Buy Now (save to DB)</button>
                            <Link to="/" className="second-level-button" onClick={this.props.closeModal}>Cancel</Link>
                        </form>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        tshSize: state.orderReducer.tshirtSize,
        tshType: state.orderReducer.tshirtType,
        tshColor: state.orderReducer.tshirtColor,
        tshGender: state.orderReducer.tshirtGender
    }
}
export default connect(mapStateToProps, null) (Order);