import React from 'react';
import { connect } from 'react-redux';

class DesignerType extends React.Component{

    renderTypeSelect = () => {
        const types = Array.from(this.props.tshirts[this.props.gender].type.split(','));
        const options = types.map(option => <option value={option} key={option}>{option}</option>);
        return options;
    }

    handleTypeSelectChange = (e) => {
        this.props.handleTshirtFeatureChange("type", e.target.value);
    }

    render(){

        if(!this.props.tshirts){
            return null
        }

        return(
            <label>
                <span>Cotton Type:</span>
                    <select value={this.props.type} onChange={this.handleTypeSelectChange}>
                        {this.renderTypeSelect()}
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
export default connect(mapStateToProps, null) (DesignerType);