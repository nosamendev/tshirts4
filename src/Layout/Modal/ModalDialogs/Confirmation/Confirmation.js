import React from 'react';
import { connect } from 'react-redux'; 
import { closeModal } from '../../../../actions';

class Confirmation extends React.Component {

    okayAction = () => {
        console.log('okay');
        this.props.closeModal();
    }

    render(){
        return (
            <div>
                <h2>{this.props.title}</h2>
                <p>{this.props.text}</p>
                
                <div>
                    <button onClick={this.okayAction}>OK</button>
                    <button onClick={this.props.closeModal}>Cancel</button>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {isModalOpen: state.modalReducer.isModalOpen}
}
export default connect(mapStateToProps, {closeModal})(Confirmation);
