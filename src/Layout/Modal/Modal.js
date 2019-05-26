import React from 'react';
import { connect } from 'react-redux'; 
import ReactDOM from 'react-dom';
import { closeModal } from '../../actions';
import './Modal.css';


class Modal extends React.Component {

    handleModal(e){
        
        this.props.closeModal();
    }

    
    render(){
        if (!this.props.isModalOpen) {
            return null;
        }
        return ReactDOM.createPortal(
            <div className="modal" onClick={this.handleModal.bind(this)}>
                <div onClick={(e) => e.stopPropagation()} className="buttons">
                    <span onClick={this.handleModal.bind(this)} className="close-button"></span>
                    
                    <div>{this.props.children}</div>
                    
                </div>
            </div>,
            document.querySelector('#modal-container')
        )
    }
}

const mapStateToProps = (state) => {
    return {isModalOpen: state.modalReducer.isModalOpen}
}

export default connect(mapStateToProps, { closeModal })(Modal);
