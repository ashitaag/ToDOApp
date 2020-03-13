import React, {Component} from 'react';
import {MDBTable, MDBTableBody, MDBBtn, MDBIcon} from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

class CompletedList extends Component{
    constructor(props){
        super(props);
        this.state = {
            title: 'Completed List',
            items: this.props.items
        }
        const {handleNotCompleted, handleDelete} = this.props;
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
                <MDBTable>
                    <MDBTableBody>
                        {
                            items.map(item =>(
                                <tr>
                                    <td>{item.id}</td>
                                    <td>{item.title}</td>
                                    <td><MDBBtn rounded outline color="success" size="sm" onClick={() => this.props.handleNotCompleted(item.id)}><MDBIcon icon="hand-point-left" /> InComplete</MDBBtn></td>
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

export default CompletedList;