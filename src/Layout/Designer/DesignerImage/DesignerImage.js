import React from 'react';
import { connect } from 'react-redux';

import '../Designer.css';

class DesignerImage extends React.Component{
    
    render(){     
        if(!this.props.tshirts){
            return null;
        }
        const gender = this.props.gender;
        const color = this.props.color;
 
        return(
                <div className={"tshirt " + this.props.gender + " " + this.props.color}></div>  
        );
    }
}
const mapStateToProps = (state) => {
    return {
        tshirts: state.tshirtReducer
    }
    
};

export default connect(mapStateToProps, null) (DesignerImage);

