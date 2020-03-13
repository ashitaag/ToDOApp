import React, {Component} from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import axios from 'axios';
import {
    MDBContainer,
    MDBBtn,
    MDBModal,
    MDBModalBody,
    MDBModalHeader,
    MDBModalFooter,
    MDBIcon,
    MDBInput
} from 'mdbreact';

class AddModal extends Component{
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        }
        this.toggle = this.toggle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        const data = new FormData(event.target);
        this.props.handleSubmit(data);
        this.toggle();


    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    render(){
        return(
            <MDBContainer>
                <MDBBtn onClick={this.toggle}>Add Task <MDBIcon icon="external-link-square-alt" /></MDBBtn>
                <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                    <form onSubmit={this.handleSubmit} >
                        <MDBModalHeader toggle={this.toggle}>Add New Task</MDBModalHeader>
                        <MDBModalBody>
                            <MDBInput label="Enter Task" name={"title"}/>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color="secondary" onClick={this.toggle}>Close</MDBBtn>
                            <MDBBtn color="primary" type="submit">Add Task</MDBBtn>
                        </MDBModalFooter>
                    </form>
                </MDBModal>
            </MDBContainer>
        )
    }
}

export default AddModal;