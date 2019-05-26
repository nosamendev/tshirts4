import React from 'react';
import { connect } from 'react-redux';

class DesignerPrice extends React.Component{


    render(){
        if(!this.props.tshirts){
            return null;
        }
        return(
                            
                <p>Price: ${(Number(this.props.price) * Number(this.props.quantity)).toFixed(2)}</p>                
            
        );
    }
}
const mapStateToProps = (state) => {
    return {
        tshirts: state.tshirtReducer
    }
};
export default connect(mapStateToProps, null) (DesignerPrice);