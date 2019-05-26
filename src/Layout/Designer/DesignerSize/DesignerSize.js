import React from 'react';
import { connect } from 'react-redux';
import Loader from '../../Loader/Loader';

class DesignerSize extends React.Component{

    state = {size: ''}

    renderSizeSelect = () => {
        const sizes = Array.from(this.props.tshirts[this.props.gender].size.split(','));
        const options = sizes.map(size => <option value={size} key={size}>{size}</option>);
        return options;
    }

    handleSizeSelectChange = (e) => {
        this.props.handleTshirtFeatureChange("size", e.target.value);
    }

    render(){

        if(!this.props.tshirts){
            return <Loader />
        }
        
        return(
            <label>
                <span>Size:</span>
                <select value={this.props.size} onChange={this.handleSizeSelectChange}>
                    {this.renderSizeSelect()}
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
export default connect(mapStateToProps, null) (DesignerSize);