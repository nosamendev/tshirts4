import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import './Designer.css';
import DesignerSize from './DesignerSize/DesignerSize';
import DesignerType from './DesignerType/DesignerType';
import DesignerColor from './DesignerColor/DesignerColor';
import DesignerDescription from './DesignerDescription/DesignerDescription';
import DesignerImage from './DesignerImage/DesignerImage';
import DesignerPrice from './DesignerPrice/DesignerPrice';
import DesignerQuantity from './DesignerQuantity/DesignerQuantity';
import Modal from '../Modal/Modal';
import OrderOverview from '../Modal/ModalDialogs/OrderOverview/OrderOverview';
import Loader from '../Loader/Loader';
import { fetchTshirts, tshirtGender, tshirtSize, tshirtType, tshirtColor, tshirtDescription,
tshirtPrice, tshirtQuantity, tshirtOrdering, cartItems, cartTotalPrice,
openDesignerMen, openDesignerWomen, openModal } from '../../actions';




class Designer extends React.Component {

    state= {
        size: 'S',
        type: 'Gildan',
        color: 'white',
        description: 'A great look. Priced right. And this t‑shirt feels softer with every wash ‑ it\'s no wonder our customers love this "ultra" popular style!',
        quantity: '1',
        price: '16.99',
        gender: 'men'
    };

    handleTshirtFeatureChange = (name, str) => {
        this.setState({[name]: str});
    }


    componentDidMount() {
        this.props.fetchTshirts();
    }

    componentWillMount(){
        if (localStorage.cart){
            const cartArr = JSON.parse(localStorage.cart);
            this.props.cartItems(cartArr.length);

            let totalPrice = 0;
            for (let i = 0; i < cartArr.length; i++){
                totalPrice += cartArr[i].quantity * cartArr[i].price;
            }
            this.props.cartTotalPrice(totalPrice);
        }   
        else { 
            localStorage.cart = "[]";
            
            this.props.cartItems(0); 
            this.props.cartTotalPrice(0);    
        }  
    }
    
    handleAddToCart(e) {
        e.preventDefault();
        this.props.openModal();   
    }

    changeTshirtFeature(feature){
        console.log('feature=', feature);
    }

    setDesignerMen = () => {
        this.setState({
            size: 'S',
            type: 'Gildan',
            color: 'white',
            description: 'A great look. Priced right. And this t‑shirt feels softer with every wash ‑ it\'s no wonder our customers love this "ultra" popular style!',
            quantity: '1',
            price: '16.99',
            gender: 'men'
        });
    }

    setDesignerWomen = () => {
        this.setState({
            size: 'XS',
            type: 'Gildan',
            color: 'white',
            description: 'A slimming lightweight t‑shirt that\'s cut just for the ladies. Easy on the wallet and brings a feminine touch to your next event!',
            quantity: '1',
            price: '15.99',
            gender: 'women'
        });
    }

    render() {
        if (this.props.loading) {
            return <Loader />
        }
        
        let form = null;
        if (this.props.tshError){
            form = <p>Error! Tshirts could't be loaded.</p>
        }
        else {
            
            if (this.props.tshirts[this.state.gender]){              
                form = (
                    <form>
                        <DesignerSize size={this.state.size} gender={this.state.gender} handleTshirtFeatureChange={this.handleTshirtFeatureChange} />
                        <DesignerType type={this.state.type} gender={this.state.gender} handleTshirtFeatureChange={this.handleTshirtFeatureChange} />
                        <DesignerColor color={this.state.color} gender={this.state.gender} handleTshirtFeatureChange={this.handleTshirtFeatureChange} />
                        <DesignerDescription description={this.state.description} type={this.state.type} gender={this.state.gender} />
                        <DesignerQuantity quantity={this.state.quantity} gender={this.state.gender} handleTshirtFeatureChange={this.handleTshirtFeatureChange} />
                        <DesignerPrice price={this.state.price} quantity={this.state.quantity} gender={this.state.gender} />
                        <button onClick={this.handleAddToCart.bind(this)}>Add To Cart</button>
                    </form>
                );
            }
        }

        
        return(
            <React.Fragment>
                <h1>T-Shirt Designer</h1>
                <div id="designer-container">
                    <section id="tshirt-container"> 
                        <DesignerImage gender={this.state.gender} color={this.state.color} />     
                    </section>
                    <section id="designer-options">
                        <div className="tabs">
                            <span className={this.state.gender === "men" ? "active" : ''} onClick={this.setDesignerMen}>Men</span>
                            <span className={this.state.gender === "women" ? "active" : ''} onClick={this.setDesignerWomen}>Women</span>
                        </div>
                        <div className="options">
                            {form}
                            <Modal>
                                <OrderOverview 
                                    title='Order Overview' 
                                    text=''
                                    gender={this.state.gender}
                                    size={this.state.size}
                                    type={this.state.type}
                                    color={this.state.color}
                                    description={this.state.description}
                                    quantity={this.state.quantity}
                                    price={this.state.price}
                                />
                            </Modal>
                        </div>
                    </section>
                </div>
            </React.Fragment>
        );
    }
}


const mapStateToProps = (state) => {
    return {      
        tshirts: state.tshirtReducer,
        tshError: state.tshirtReducer.error,
        loading: state.tshirtReducer.loading
    }
};
export default connect(mapStateToProps, { 
    fetchTshirts, cartItems, cartTotalPrice, openModal })(Designer);