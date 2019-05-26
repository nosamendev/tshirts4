import React from 'react';
import { connect } from 'react-redux';

class TshirtQuantity extends React.Component{

    renderQuantitySelect = () => {
        let options = [];
        for (let i = 1; i <= 10; i++) {
            options[i] = <option value={i} key={i}>{i}</option>;
        }
        return options;
    }

    handleQuanitySelectChange = (e) => {
        this.props.handleTshirtFeatureChange("quantity", e.target.value);
    }

    render(){
        
            if(!this.props.tshirts){
                return null;
            }
            
            return(
                <label>
                    <span>Quantity:</span>
                    <select value={this.props.quantity} onChange={this.handleQuanitySelectChange}>
                        {this.renderQuantitySelect()}
                    </select>
                </label>
            );
        
    }
}
const mapStateToProps = (state) => {
    return {
        tshirts: state.tshirtReducer
    }
};
export default connect(mapStateToProps, null) (TshirtQuantity);