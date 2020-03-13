import React, {Component} from 'react';
import CompletedList from "./Components/CompletedList";
import InCompleteList from "./Components/InCompleteList";
import AddModal from "./Components/AddModal";

import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

import {MDBCol, MDBContainer, MDBRow} from "mdbreact";

class App extends Component{

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoaded: false,
            error: null,
            completedItems: [],
            inCompleteItems: []
        }
        this.handleCompleted = this.handleCompleted.bind(this);
        this.handleNotCompleted = this.handleNotCompleted.bind(this);
        this.handleInCompleteDelete = this.handleInCompleteDelete.bind(this);
        this.handleCompletedDelete = this.handleCompletedDelete.bind(this);
        this.refreshData = this.refreshData.bind(this);
        this.handleAddItem = this.handleAddItem.bind(this);

    }

    componentDidMount() {
        this.refreshData();
    }

    refreshData(){
        axios.get(`https://personal.utdallas.edu/~ary190000/todoapi/`)
            .then(res => {
                const res_items = res.data;

                console.log(res_items);
                const com = res_items.filter(item=>item.isCompleted === 1);
                const incom = res_items.filter(item=>item.isCompleted === 0);
                console.log(com);
                console.log(incom);

                this.setState({
                    isLoaded: true,
                    items: res_items,
                    completedItems: com,
                    inCompleteItems: incom
                });
            })
    }

    handleCompleted(id){
        axios.get(`https://personal.utdallas.edu/~ary190000/todoapi/toggleState/`+id)
            .then(res => {
                const res_items = res.data;
                console.log(res_items);
                if (res_items.result){
                    const filterdInCompleteItems = this.state.inCompleteItems.filter(item => item.id !== id);
                    const newCompletedItem = this.state.inCompleteItems.filter(item => item.id === id);
                    const newCompletedItems = this.state.completedItems.concat(newCompletedItem);
                    this.setState({
                        completedItems: newCompletedItems,
                        inCompleteItems: filterdInCompleteItems
                    });
                }
                else{
                    alert("Couldn't mark as completed, Network Error");
                }
        })
    }

    handleNotCompleted(id){
        axios.get(`https://personal.utdallas.edu/~ary190000/todoapi/toggleState/`+id)
            .then(res => {
                const res_items = res.data;
                console.log(res_items);
                if (res_items.result){
                    const filterdCompletedItems = this.state.completedItems.filter(item => item.id !== id);
                    const newInCompleteItem = this.state.completedItems.filter(item => item.id === id);
                    const newInCompleteItems = this.state.inCompleteItems.concat(newInCompleteItem);
                    this.setState({
                        completedItems: filterdCompletedItems,
                        inCompleteItems: newInCompleteItems
                    });
                }
                else{
                    alert("Couldn't mark as completed, Network Error");
                }
            })
    }

    handleInCompleteDelete(id){
        axios.delete(`https://personal.utdallas.edu/~ary190000/todoapi/`+id)
            .then(res => {
                const res_items = res.data;
                console.log(res_items);
                if (res_items.result){
                    const filterdInCompleteItems = this.state.inCompleteItems.filter(item => item.id !== id);
                    this.setState({
                        inCompleteItems: filterdInCompleteItems
                    });
                }
                else{
                    alert("Couldn't mark as completed, Network Error");
                }
            })
    }

    handleCompletedDelete(id){
        axios.delete(`https://personal.utdallas.edu/~ary190000/todoapi/`+id)
            .then(res => {
                const res_items = res.data;
                console.log(res_items);
                if (res_items.result){
                    const filterdCompletedItems = this.state.completedItems.filter(item => item.id !== id);
                    this.setState({
                        completedItems: filterdCompletedItems
                    });
                }
                else{
                    alert("Couldn't mark as completed, Network Error");
                }
            })
    }

    handleAddItem(data){
        axios.post('https://personal.utdallas.edu/~ary190000/todoapi/', data, {}).then(res => {

            if(res.data.result){
                var inc = this.state.inCompleteItems;
                inc.push(res.data.item);
                this.setState({
                    inCompleteItems: inc
                });
            }
            else{
                alert("Network Error while adding new task");
            }
        }).catch(error =>{

        });
    }

    render() {
        const {items, isLoaded, error, completedItems, inCompleteItems} = this.state;
        if (error){
            return(
                <h2>There is an Error: {error.message}</h2>
            );
        }
        else if(!isLoaded){
            return(
                <h1>Loading the Data.... </h1>
            );
        }
        else {
            return (
                <MDBContainer className="text-center">
                    <h1>To DO App</h1>
                    <AddModal handleSubmit={this.handleAddItem}/>
                    <MDBRow>
                        <MDBCol size="6">
                            <InCompleteList items = {inCompleteItems} handleCompleted={this.handleCompleted} handleDelete = {this.handleInCompleteDelete}/>
                        </MDBCol>
                        <MDBCol size="6">
                            <CompletedList items = {completedItems} handleNotCompleted={this.handleNotCompleted} handleDelete = {this.handleCompletedDelete} />
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            );
        }
    }
}


export default App;
