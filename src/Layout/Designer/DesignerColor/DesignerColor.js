import React from 'react';
import { connect } from 'react-redux';

class DesignerColor extends React.Component{

    renderColor = () => {
        let clsName;
        const colors = Array.from(this.props.tshirts[this.props.gender].color.split(','));
        const selectedColor = this.props.color;
        const spans = colors.map(color => {
            if (selectedColor == color){
                clsName = color + " active";
            }
            else {
                clsName = color;
            }
            return <span data-color={color} title={clsName.toUpperCase()} className={clsName} key={color} onClick={this.handleColorChange}></span>
        });
        
        return spans;
        
    }

    handleColorChange = (e) => {   
        this.props.handleTshirtFeatureChange("color", e.target.getAttribute("data-color"));
        e.target.className+= "active";
    }

    render(){
        if(!this.props.tshirts){
            return null;
        }
            
        return(
            <div className="colors">
                <label>
                    <span>Color:</span>
                </label>
                <div>
                    {this.renderColor()}   
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        tshirts: state.tshirtReducer
    }
};
export default connect(mapStateToProps, null) (DesignerColor);