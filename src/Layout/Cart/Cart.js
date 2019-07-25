import React from 'react';
import { connect } from 'react-redux'; 
import { cartItems, cartTotalPrice, openModal, saveOrder } from '../../actions';
import Loader from '../Loader/Loader';
import Modal from '../Modal/Modal';
import ConfirmGoHome from '../Modal/ModalDialogs/ConfirmGoHome/ConfirmGoHome';
import ConfirmError from '../Modal/ModalDialogs/ConfirmError/ConfirmError';

import './Cart.css';

class Cart extends React.Component {
 
    componentDidMount(){
        this.saveToLocalStorageCart();
        this.loadLocalStorageCart();
        this.renderContactForm();
    }
    
    componentWillUnmount(){
        this.removeCartFromDOM();
    }

    removeCartFromDOM() {
        const main = document.querySelector("#main");
        const cartItems = main.querySelectorAll("#main .cart-item");
        for (let i = 0; i < cartItems.length; i++){
            main.removeChild(cartItems[i]);
        }
        const totals = main.querySelectorAll(".total");
        for (let i = 0; i < totals.length; i++){
            main.removeChild(totals[i]);
        }

        const orderForm = main.querySelector(".order-form");
        console.log('order-form=', orderForm);
        if (orderForm){
            main.removeChild(orderForm);
        }
        
    }

    toUpperLetter = (str) => {
        if (!str) {
            return null;
        }
        const firstLetter = str.charAt(0).toUpperCase();
        return str.replace(str.charAt(0), firstLetter);
    }

    saveToLocalStorageCart(){
        const propsFromOverview = this.props.location.params;
        let cartItem = null;

        if (propsFromOverview) {
            cartItem = {
                'gender': propsFromOverview.gender,
                'size': propsFromOverview.size,
                'type': propsFromOverview.type,
                'color': propsFromOverview.color,
                'price': propsFromOverview.price,
                'quantity': propsFromOverview.quantity
            };

            let cartArr;
        
            if (localStorage.cart){
                cartArr = JSON.parse(localStorage.cart);
            }
            else {
                cartArr = [];
            }
            
            const len = cartArr.length;
            cartArr[len] = cartItem;
            localStorage.cart = JSON.stringify(cartArr);
            console.log('len=', len, 'cartSrt=', JSON.stringify(cartArr));
        }  
    }

    removeFromLocalStorageCart(e){
        if (localStorage.cart && localStorage.cart !== "[]" ){
            let cartArr = JSON.parse(localStorage.cart);
            let len = cartArr.length;
            const i = e.target.getAttribute('data-number');
            
            cartArr.splice(i, 1);
            
            localStorage.cart = JSON.stringify(cartArr);

            let totalPrice = 0;
            for (let j = 0; j < cartArr.length; j++){
                totalPrice += +cartArr[j].price;
            }
            console.log('totalPrice=', totalPrice);

            this.removeCartFromDOM();
            this.loadLocalStorageCart();
            this.renderContactForm();
        }
            
    }
    
    loadLocalStorageCart(){
        const main = document.getElementsByTagName("main")[0];
        let cartArr;
      
            if (!localStorage.cart) {
                localStorage.cart = "[]";
                cartArr = [];
            }
            else {
                if (localStorage.cart.length !== 0) {
                    
                    cartArr = JSON.parse(localStorage.cart);
                    const len = cartArr.length;

                    for (let i = len -1; i >=0; i--) {
                        let root = document.createElement('div');
                        root.setAttribute("class", "cart-item");
                        root.setAttribute("data-number", i);
                        let el1 = document.createElement('div');
                        el1.setAttribute("class", "order-info");
                        root.appendChild(el1);
        
                        let el2 = document.createElement('section');
                        el2.setAttribute("id", "tshirt-container");
                        el1.appendChild(el2);
                        let el3 = document.createElement('div');
                        el3.setAttribute("class", "tshirt " + cartArr[i].gender + " " + cartArr[i].color);
                        el2.appendChild(el3);
                        
                        let el4 = document.createElement('div');
                        el4.setAttribute("class", "order-overview");
                        el1.appendChild(el4);
                        let el5 = document.createElement('table');
                        el4.appendChild(el5);
                        let el6 = document.createElement('thead');
                        el5.appendChild(el6);
                        let el7 = document.createElement('tr');
                        el6.appendChild(el7);
                        let el8 = document.createElement('th');
                        el8.setAttribute("colspan", "2");
                        el8.innerHTML = this.toUpperLetter(cartArr[i].gender) + " T-shirt";
                        el7.appendChild(el8);
                        let el9 = document.createElement('tbody');
                        el5.appendChild(el9);
                        let el10 = document.createElement('tr');
                        el9.appendChild(el10);
                        let el11 = document.createElement('td');
                        el11.innerHTML = "Size:";
                        el10.appendChild(el11);
        
                        let el12 = document.createElement('td');
                        el12.innerHTML = cartArr[i].size;
                        el10.appendChild(el12);
        
                        let el13 = document.createElement('tr');
                        el9.appendChild(el13);
                        let el14 = document.createElement('td');
                        el14.innerHTML = "Cotton Type:";
                        el13.appendChild(el14);
        
                        let el15 = document.createElement('td');
                        el15.innerHTML = cartArr[i].type;
                        el13.appendChild(el15);
        
                        let el16 = document.createElement('tr');
                        el9.appendChild(el16);
        
                        let el17 = document.createElement('td');
                        el17.innerHTML = "Color:";
                        el16.appendChild(el17);
        
                        let el18 = document.createElement('td');
                        el18.innerHTML = this.toUpperLetter(cartArr[i].color);
                        el16.appendChild(el18);

                        let el24 = document.createElement('tr');
                        el9.appendChild(el24);

                        let el25 = document.createElement('td');
                        el25.innerHTML = "Quantity:";
                        el24.appendChild(el25);

                        let el26 = document.createElement('td');
                        el26.innerHTML = cartArr[i].quantity;
                        el24.appendChild(el26);

        
                        let el19 = document.createElement('tr');
                        el19.setAttribute("class", "price");
                        el9.appendChild(el19);
        
                        let el20 = document.createElement('td');
                        el20.innerHTML = "Price:";
                        el19.appendChild(el20);
        
                        let el21 = document.createElement('td');
                        el21.innerHTML = "$" + (cartArr[i].price * cartArr[i].quantity).toFixed(2);
                        el19.appendChild(el21);
                        /*
                        let el22 = document.createElement('button');
                        el22.innerHTML = "Buy Now (save to DB)";
                        root.appendChild(el22);
                        */
                        let el23 = document.createElement('span');
                        el23.setAttribute("class", "remove-button");
                        el23.setAttribute("title", "Remove from Cart");
                        el23.setAttribute("data-number", i);
                        root.appendChild(el23); 
                        el23.addEventListener("click", this.removeFromLocalStorageCart.bind(this));

                        main.insertAdjacentElement("beforeend", root);
                        
                    }   
                }  
            }
            this.renderTotalPrice();        
    }

    renderTotalPrice(){
        const main = document.querySelector("#main");
        const cartItems = main.querySelectorAll("#main .cart-item");

        let cartArr = JSON.parse(localStorage.cart);
        console.log(cartArr);
        let items = cartArr.length;

        let totalPrice = 0;
        for (let i = 0; i < cartArr.length; i++){
            totalPrice += +(cartArr[i].price * cartArr[i].quantity);
        }

        let root = document.createElement('div');
        root.setAttribute("class", "total");
        let el1 = document.createElement('span');
        el1.innerHTML = items + " items";
        root.appendChild(el1);

        let el2 = document.createElement('span');
        el2.innerHTML = "Total: " + "$" + totalPrice.toFixed(2);
        root.appendChild(el2);
       
        main.appendChild(root);
        
        if (localStorage.cart !== "[]") {
            let rootCopy = root.cloneNode(true);
            main.insertBefore(rootCopy, cartItems[0]);
        }

        this.props.cartTotalPrice(totalPrice);
        this.props.cartItems(cartArr.length);
    }

    renderContactForm(){
        let cartArr = JSON.parse(localStorage.cart);
        if (cartArr.length !== 0){
            const main = document.querySelector("#main");

            let root = document.createElement('div');
            let el1 = document.createElement('form');
            root.setAttribute("class", "order-form");
            root.appendChild(el1);
            el1.addEventListener("submit", this.onFormSubmit.bind(this));

            if (main) {
                if (!this.props.token) {
                    /*
                    let el2 = document.createElement('label');
                    el1.appendChild(el2);
                    let el3 = document.createElement('span');
                    el3.innerHTML = "Your Name:*";
                    el2.appendChild(el3);
                    let el4 = document.createElement('input');
                    el4.setAttribute("type", "text");
                    el4.setAttribute("name", "name");
                    el4.setAttribute("required", "required");
                    el2.appendChild(el4);

                    let el5 = document.createElement('label');
                    el1.appendChild(el5);
                    let el6 = document.createElement('span');
                    el6.innerHTML = "Your Email:*";
                    el5.appendChild(el6);
                    let el7 = document.createElement('input');
                    el7.setAttribute("type", "email");
                    el7.setAttribute("name", "email");
                    el7.setAttribute("required", "required");
                    el5.appendChild(el7);
                    
                    let el8 = document.createElement('label');
                    el1.appendChild(el8);
                    let el9 = document.createElement('span');
                    el9.innerHTML = "Your Address:*";
                    el8.appendChild(el9);
                    let el10 = document.createElement('input');
                    el10.setAttribute("type", "text");
                    el10.setAttribute("name", "address");
                    el10.setAttribute("required", "required");
                    el8.appendChild(el10);

                    let el11 = document.createElement('label');
                    el1.appendChild(el11);
                    let el12 = document.createElement('span');
                    el12.innerHTML = "ZIP:*";
                    el11.appendChild(el12);
                    let el13 = document.createElement('input');
                    el13.setAttribute("type", "text");
                    el13.setAttribute("name", "zip");
                    el13.setAttribute("required", "required");
                    el11.appendChild(el13);
                    */
                   let el15 = document.createElement('p');
                   el15.innerHTML = "Please authenticate to finish your order."
                   el1.appendChild(el15);
                   main.appendChild(root);
                }
                else {
                    let el14 = document.createElement('button');

                    el14.innerHTML = "Buy Now (save to DB)";
                    el14.setAttribute("type", "submit");
                    el1.appendChild(el14);
                
                    main.appendChild(root);
                }
                
                
            }
            
        }  
    }

    onFormSubmit(e){
        e.preventDefault();
        let cartArr = JSON.parse(localStorage.cart);

        const form = document.querySelector(".order-form form");

        let customr = {
            //name: form.name.value,
            email: localStorage.email,
            //address: form.address.value,
            //zip: form.zip.value
        }

        const order = {
            customer: customr,
            tshirts: cartArr,
            totalPrice: this.props.crtTotalPrice,
            userId: this.props.userId
        }

        this.props.saveOrder(order, this.props.token);
        this.props.openModal();
        if (!this.props.error) {
            localStorage.cart = "[]";
        }

    }
    
    initiateLocalStorageCart(){
        if (!localStorage.cart || localStorage.cart == "[]"){
            return (<p className="info">No items added into the Cart yet.</p>)
        }
    }


    render(){
        console.log(this.props.location.params);
        let content = null;

        if (this.props.loading == true){
            content = <Loader />
        }
        else {
            if (this.props.error){
                content = <ConfirmError title="Error!" text="Your order couldn't be saved." />
            }
            else {
                if (!this.props.error) {
                    content = <ConfirmGoHome title="Your Order has been saved." />;
                }
            }   
        }


        return(
            <React.Fragment>
                <h2>Shopping Cart</h2>                
                {this.initiateLocalStorageCart()}
                <Modal>
                    {content}
                </Modal>   
            </React.Fragment>
            
        );
        
    }
}

const mapStateToProps = (state) => {
    return {
        crtTotalPrice: state.cartReducer.cartTotalPrice,
        error: state.cartReducer.error,
        loading: state.cartReducer.loading,
        token: state.authReducer.token,
        userId: state.authReducer.userId
    }
}

export default connect(mapStateToProps, { cartItems, cartTotalPrice, openModal, saveOrder })(Cart);
