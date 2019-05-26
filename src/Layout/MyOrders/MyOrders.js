import React from 'react';
import { connect } from 'react-redux';
import { fetchOrders } from '../../actions';
import Loader from '../Loader/Loader';
import './MyOrders.css';

class MyOrders extends React.Component{

    componentDidMount(){
        this.props.fetchOrders(localStorage.token, localStorage.userId);
        
    }

    componentWillUnmount(){
        this.removeMyOrdersFromDOM();
    }

    componentDidUpdate(){
        this.renderMyOrders();
    }

    removeMyOrdersFromDOM() {
        const main = document.querySelector("#main");
        const orderItems = main.querySelectorAll("#main .order-item");
        for (let i = 0; i < orderItems.length; i++){
            main.removeChild(orderItems[i]);
        }    
    }

    toUpperLetter = (str) => {
        if (!str) {
            return null;
        }
        const firstLetter = str.charAt(0).toUpperCase();
        return str.replace(str.charAt(0), firstLetter);
    }

    displayOrder(order) {
        let tshirt;
        const len = order.length;
        const main = document.getElementById('main');

        for (let i = 0; i < len; i++) {
            tshirt = order[i];

            let root = document.createElement('div');
            root.setAttribute("class", "order-item");
            root.setAttribute("data-number", i);
            let el1 = document.createElement('div');
            el1.setAttribute("class", "order-info");
            root.appendChild(el1);

            let el2 = document.createElement('section');
            el2.setAttribute("id", "tshirt-container");
            el1.appendChild(el2);
            let el3 = document.createElement('div');
            el3.setAttribute("class", "tshirt " + tshirt.gender + " " + tshirt.color);
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
            el8.innerHTML = this.toUpperLetter(tshirt.gender) + " T-shirt";
            el7.appendChild(el8);
            let el9 = document.createElement('tbody');
            el5.appendChild(el9);
            let el10 = document.createElement('tr');
            el9.appendChild(el10);
            let el11 = document.createElement('td');
            el11.innerHTML = "Size:";
            el10.appendChild(el11);

            let el12 = document.createElement('td');
            el12.innerHTML = tshirt.size;
            el10.appendChild(el12);

            let el13 = document.createElement('tr');
            el9.appendChild(el13);
            let el14 = document.createElement('td');
            el14.innerHTML = "Cotton Type:";
            el13.appendChild(el14);

            let el15 = document.createElement('td');
            el15.innerHTML = tshirt.type;
            el13.appendChild(el15);

            let el16 = document.createElement('tr');
            el9.appendChild(el16);

            let el17 = document.createElement('td');
            el17.innerHTML = "Color:";
            el16.appendChild(el17);

            let el18 = document.createElement('td');
            el18.innerHTML = this.toUpperLetter(tshirt.color);
            el16.appendChild(el18);

            let el24 = document.createElement('tr');
            el9.appendChild(el24);

            let el25 = document.createElement('td');
            el25.innerHTML = "Quantity:";
            el24.appendChild(el25);

            let el26 = document.createElement('td');
            el26.innerHTML = tshirt.quantity;
            el24.appendChild(el26);


            let el19 = document.createElement('tr');
            el19.setAttribute("class", "price");
            el9.appendChild(el19);

            let el20 = document.createElement('td');
            el20.innerHTML = "Price:";
            el19.appendChild(el20);

            let el21 = document.createElement('td');
            el21.innerHTML = "$" + (tshirt.price * tshirt.quantity).toFixed(2);
            el19.appendChild(el21);

            main.appendChild(root);
            
        }
    }

    renderMyOrders(){
        
        if ( !this.props.loading && this.props.orders) {
            
            const orders = Object.values(this.props.orders);

            for (let i = 0; i < orders.length; i++){
                this.displayOrder(orders[i].tshirts);
            } 
        }
        else return <Loader />
    }  

    render(){
        let contents = <Loader />
        if ( !this.props.loading && this.props.orders) {
             contents = null;
             if (Object.values(this.props.orders).length === 0){
                contents = (<p>You have no orders yet.</p>);
             }
        }
        
        return (
            <React.Fragment>
                <h2>My orders</h2>   
                {contents}                        
            </React.Fragment>

        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.fetchOrdersReducer.loading,
        orders: state.fetchOrdersReducer.orders
    }
}

export default connect(mapStateToProps, { fetchOrders })(MyOrders);