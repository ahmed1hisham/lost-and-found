import React, { Component } from 'react';
import './App.css';
import firebase from './firebase.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      posterEmail: '',
      foundItem: '',
      removalCode: '',
      items: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  
  handleSubmit(e) {
  e.preventDefault();
  const itemsRef = firebase.database().ref('items');
  const item = {
    posterEmail: this.state.posterEmail,
    foundItem: this.state.foundItem,
    removalCode: this.state.removalCode
  }
  itemsRef.push(item);
  this.setState({
    currentItem: '',
    username: ''
  });
}

componentDidMount() { // to fetch items from DB
  const itemsRef = firebase.database().ref('items');
  itemsRef.on('value', (snapshot) => {
    let items = snapshot.val();
    let newState = [];
    for (let item in items) {
      newState.push({
        id: item,
        posterEmail: items[item].posterEmail,
        foundItem: items[item].foundItem,
        removalCode: items[item].removalCode
      });
    }
    this.setState({
      items: newState
    });
  });
}
 
  render() {
    
    return (
      <div className='app'>
        <header>
            <div className='wrapper'>
              <h1>Lost and found</h1>
              
            </div>
        </header>
        <div className='container'>
          <section className='add-item'>
              <form onSubmit={this.handleSubmit}>
                <input type="text" name="posterEmail" placeholder="What's your Email?" onChange={this.handleChange} value={this.state.posterEmail} />
                <input type="text" name="foundItem" placeholder="What did you find?" onChange={this.handleChange} value={this.state.foundItem} />
                <input type="text" name="removalCode" placeholder="Choose a code for deletion" onChange={this.handleChange} value={this.state.removalCode} />
                <button>Add Item</button>
              </form>
          </section>
         <section className='display-item'>
  <div className="wrapper">
    <ul>
      {this.state.items.map((item) => {
        return (
          <li key={item.id}>
            <h3>{item.title}</h3>
            <p>brought by: {item.user}</p>
          </li>
        )
      })}
    </ul>
  </div>
</section>
              <ul>
              </ul>
            </div>
          </section>
        </div>
      </div>
    );
  }
}
export default App;
