import React from 'react';
import { connect } from 'react-redux'; 
import { closeModal } from '../../../../actions';
import { withRouter } from 'react-router-dom';

class ConfirmGoHome extends React.Component {

    okayHandler = () => {
        this.props.history.push('/');
        this.props.closeModal();
    }

    render(){
        let content = (
            <div>
                <h2>{this.props.title}</h2>
                <p>{this.props.text}</p>
                <div>
                    <button onClick={this.okayHandler}>OK</button>      
                </div>
            </div>
        );

        return (
            <div>
                {content}
            </div>
            
        );
    }
}
const mapStateToProps = (state) => {
    return {isModalOpen: state.modalReducer.isModalOpen}
}
export default withRouter(connect(mapStateToProps, {closeModal})(ConfirmGoHome));
