import React, {Component} from 'react';
import {MDBBtn, MDBTable, MDBTableBody, MDBIcon} from "mdbreact";

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

class InCompleteList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            title: 'InComplete List',
            items: this.props.items
        }
        // this.handleCompleted = this.props.handleCompleted;
        const {handleCompleted, handleDelete} = this.props;
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.items!==this.props.items){
            this.setState({
                items: nextProps.items
            })
        }
    }

    render() {
        const {title, items} = this.state;

        return (
            <div>
                <h2>{title}</h2>
                <MDBTable responsiveMd>
                    <MDBTableBody>
                        {
                            items.map(item =>(
                                <tr>
                                    <td>{item.id}</td>
                                    <td>{item.title}</td>
                                    <td><MDBBtn rounded outline color="success" size="sm" onClick={() => this.props.handleCompleted(item.id)}>Completed <MDBIcon icon="hand-point-right" /></MDBBtn></td>
                                    <td><MDBBtn rounded color="danger" size="sm" onClick={() => this.props.handleDelete(item.id)}>Delete</MDBBtn></td>
                                </tr>
                            ))
                        }
                    </MDBTableBody>
                </MDBTable>
            </div>
        )
    }
}

export default InCompleteList;