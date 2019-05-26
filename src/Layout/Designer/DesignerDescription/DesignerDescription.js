import React from 'react';
import { connect } from 'react-redux';
import { tshirtDescription } from '../../../actions';

class DesignerDescription extends React.Component{

    renderDescription = () => { 
        const type = this.props.type;
        const gender = this.props.gender;
        return this.props.tshirts[gender].description[type];
    }

    handleDescriptionChange(e){
        this.props.tshirtDescription(e.target.value);

    }

    render(){
        if(!this.props.tshirts){
            return null
        }

        return(
            <p>{this.renderDescription()}</p>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        tshirts: state.tshirtReducer
    }
   
};
export default connect(mapStateToProps, { tshirtDescription }) (DesignerDescription);