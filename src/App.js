import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      posterEmail: '',
      foundItem: '',
      removalCode: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
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
              <form>
                <input type="text" name="posterEmail" placeholder="What's your Email?" onChange={this.handleChange} value={this.state.posterEmail} />
                <input type="text" name="foundItem" placeholder="What did you find?" onChange={this.handleChange} value={this.state.foundItem} />
                <input type="text" name="removalCode" placeholder="Choose a code for deletion" onChange={this.handleChange} value={this.state.removalCode} />
                <button>Add Item</button>
              </form>
          </section>
          <section className='display-item'>
            <div className='wrapper'>
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