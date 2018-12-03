import React, { Component } from 'react';
import './App.css';
import firebase from './firebase.js';
import ImageUploader from "react-images-upload";


class App extends Component {
  constructor() {
    super();
    this.state = {
      posterEmail: '',
      foundItem: '',
      removalCode: '',
      foundIn:'',
      items: [],
      tempImage: []
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
    removalCode: this.state.removalCode,
    foundIn: this.state.foundIn
  }
  itemsRef.push(item);
  this.setState({
    posterEmail: '',
    foundItem: '',
    removalCode: '',
    foundIn:''
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
        removalCode: items[item].removalCode,
        foundIn: items[item].foundIn
      });
    }
    this.setState({
      items: newState
    });
  });
}
  
  deleteItem(itemId) {
  const itemRef = firebase.database().ref(`/items/${itemId}`);
  itemRef.remove();
}

onDrop = picture => {
  this.setState({
    tempImage: this.state.tempImage.concat(picture)
  });
};
sendEmail() {
  var postmark = require("postmark");
  var client = new postmark.Client("d15218b9-7bbc-4ec8-93ed-1d71b58a837d");
  client.sendEmail({
    From: "noreply@ifound.com",
    To: "ahmed11rihan@gmail.com",
    Subject: "Test",
    TextBody: "Hello from Postmark!"
  });
}
 
  render() {
    
    return (
      <div className='app'>

                  <div
            style={{
              textAlign: "center",
              paddingTop: "30px",
              paddingBottom: "30px",
              backgroundColor: "#5e548e",
              color: "white"
            }}
          >
            <h1>Lost and Found App</h1>
          </div>

        <div className='container'>
          <section className='add-item'>
          <h1>Add an item</h1>
              <hr />
              <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                  <label for="imageUploader">Upload Image</label>
                  <ImageUploader
                    withIcon={true}
                    id="imageUploader"
                    buttonText="Choose image"
                    onChange={this.onDrop}
                    imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                    maxFileSize={5242880}
                  />
                </div>
                <input type="text" name="posterEmail" placeholder="What's your Email?" onChange={this.handleChange} value={this.state.posterEmail} />
                <input type="text" name="foundItem" placeholder="What did you find?" onChange={this.handleChange} value={this.state.foundItem} />
                <input type="text" name="foundIn" placeholder="Where did you find it?" onChange={this.handleChange} value={this.state.foundIn} />
                <input type="text" name="removalCode" placeholder="Choose a code for deletion" onChange={this.handleChange} value={this.state.removalCode} />

                <button>Add Item</button>
              </form>
          </section>
          <section className='display-item'>
  <div className="wrapper" >
  <h1>List of Items</h1>
              <hr />
    <ul>
      {this.state.items.map((item) => {
        return (
          <li key={item.id}>
            <img
              className="card-img-top"
              src={item.imageUrl}
              alt="Card image cap"
              style={{ width: "200px" }}
            />
            <div className="card-body">
              <h5 className="card-title" style={{ textAlign: "center" }}>
                {item.foundItem}
              </h5>
              <p>Found in: {item.foundIn}</p>
              <a
                href="#"
                onClick={this.sendEmail}
                className="btn btn-primary"
                style={{ width: "100%" }}
                
              >
              This is mine!!
              </a>
              <br />
              <br />
              <a
              href="#"
              onClick={() => this.deleteItem(item.id)}
              className="btn btn-danger"
              style={{
              width: "100%"
               }}
              >
               Delete
              </a>
            </div>
          </li>
        )
      })}
    </ul>
  </div>
</section>
        </div>
      </div>
    );
  }
}
export default App;
