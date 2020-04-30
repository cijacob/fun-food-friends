import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import firebase from './firebase'; 

class App extends Component{

  constructor(){
    super();
    this.state = {
      username: '', 
      currentItem: '', 
      items: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const itemsRef = firebase.database().ref('items');
    const item = {
      title: this.state.currentItem,
      user: this.state.username
    }
    itemsRef.push(item);
    this.setState({
      currentItem: '',
      username: ''
    });
  };

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  
  componentDidMount(){
    const itemsRef = firebase.database().ref('items');
    itemsRef.on('value', (snapchot) => {
      let items = snapchot.val();
      let newState = []; 
      for(let item in items){
        newState.push({
          id: item,
          title: items[item].title, 
          user: items[item].user
        });
      }
      this.setState({
        items: newState
      })
    })
  }
  
  removeItem(itemId) {
    const itemRef = firebase.database().ref(`/items/${itemId}`);
    itemRef.remove();
  }
  

  render(){
    return(
      <div className="app">
        <header>
          <div className="wrapper">
            <h2>Fun food friends</h2>
          </div>
        </header>
        <div className="container">
          <section className="add-item">
            <form onSubmit={ (e) => this.handleSubmit(e)}>
              <input type="text" name="username" placeholder="What's your name?" onChange={this.handleChange} value={this.state.username} />
              <input type="text" name="currentItem" placeholder="What are you bringing?" onChange={this.handleChange} value={this.state.currentItem} />
              <button>Add Item</button>
            </form>
          </section>
          
          <section className="displayItem" >
            <div className="wrapper">
              <ul>
                {this.state.items.map((item) => {
                  return(
                    <li key={item.id}>
                      <h4>{item.title}</h4>
                      <p>Brought by: {item.user}</p>
                      <button onClick={() => this.removeItem(item.id)}>Remove Item</button>
                    </li>
                  )
                })}
              </ul>
            </div>
          </section>
        </div>
      </div>
    )
  }
}

export default App;
