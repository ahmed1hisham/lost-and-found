import React, { Component } from "react";
import "./App.css";
import firebase from "./firebase.js";
import ImageUploader from "react-images-upload";

import axios from "axios";
import Modal from "react-responsive-modal";

class App extends Component {
  constructor() {
    super();
    this.state = {
      posterEmail: "",
      foundItem: "",
      removalCode: "",
      foundIn: "",
      items: [],
      tempImage: [],
      open: false,
      open1: false,
      messageToPoster: ""
    };
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
    const itemsRef = firebase.database().ref("items");
    const item = {
      posterEmail: this.state.posterEmail,
      foundItem: this.state.foundItem,
      removalCode: this.state.removalCode,
      foundIn: this.state.foundIn
    };
    itemsRef.push(item);
    this.setState({
      posterEmail: "",
      foundItem: "",
      removalCode: "",
      foundIn: ""
    });
  }

  componentDidMount() {
    // to fetch items from DB
    const itemsRef = firebase.database().ref("items");
    itemsRef.on("value", snapshot => {
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

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  onOpenModal1 = () => {
    this.setState({ open1: true });
  };

  onCloseModal1 = () => {
    this.setState({ open1: false });
  };

  async sendEmail(item) {
    // var postmark = require("postmark");
    // var client = new postmark.Client("d15218b9-7bbc-4ec8-93ed-1d71b58a837d");
    // client.sendEmail({
    //   From: "noreply@ifound.com",
    //   To: "ahmed11rihan@gmail.com",
    //   Subject: "Test",
    //   TextBody: "Hello from Postmark!"
    // });

    const promise = await axios.post(
      "https://api.postmarkapp.com/email",

      {
        From: "ahmed.rihan@student.guc.edu.eg",

        To: item.posterEmail,

        Subject: "Lost and found",

        TextBody: this.state.messageToPoster
      },

      {
        headers: {
          Accept: "application/json",

          "X-Postmark-Server-Token": "7db32b81-b27d-458d-8703-a9fa2a7147f7",

          "Access-Control-Allow-Origin": "*"
        }
      }
    );

    console.log(promise);
  }

  render() {
    return (
      <div className="app">
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

        <div className="container">
          <section className="add-item">
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
              <input
                type="text"
                name="posterEmail"
                placeholder="What's your Email?"
                onChange={this.handleChange}
                value={this.state.posterEmail}
              />
              <input
                type="text"
                name="foundItem"
                placeholder="What did you find?"
                onChange={this.handleChange}
                value={this.state.foundItem}
              />
              <input
                type="text"
                name="foundIn"
                placeholder="Where did you find it?"
                onChange={this.handleChange}
                value={this.state.foundIn}
              />
              <input
                type="text"
                name="removalCode"
                placeholder="Choose a code for deletion"
                onChange={this.handleChange}
                value={this.state.removalCode}
              />

              <button>Add Item</button>
            </form>
          </section>
          <section className="display-item">
            <div className="wrapper">
              <h1>List of Items</h1>
              <hr />
              <ul>
                {this.state.items.map(item => {
                  return (
                    <li key={item.id}>
                      <img
                        className="card-img-top"
                        src={item.imageUrl}
                        alt="Card image cap"
                        style={{ width: "200px" }}
                      />
                      <div className="card-body">
                        <h5
                          className="card-title"
                          style={{ textAlign: "center" }}
                        >
                          {item.foundItem}
                        </h5>
                        <p>Found in: {item.foundIn}</p>
                        {/* <a
                          href=""
                          onClick={this.sendEmail}
                          className="btn btn-primary"
                          style={{ width: "100%" }}
                        >
                          This is mine!!
                        </a> */}
                        <div>
                          <button
                            className="btn btn-primary"
                            style={{ width: "100%" }}
                            onClick={this.onOpenModal}
                          >
                            This is mine!!
                          </button>
                          <Modal
                            open={this.state.open}
                            onClose={this.onCloseModal}
                            center
                          >
                            <input
                              type="text"
                              name="messageToPoster"
                              placeholder="write a short message with your contact info please"
                              onChange={this.handleChange}
                            />
                            <a
                              href=""
                              onClick={this.sendEmail(item)}
                              className="btn btn-primary"
                              style={{ width: "100%" }}
                            >
                              Contact Poster
                            </a>
                          </Modal>
                        </div>
                        {/* <a
                          href="#"
                          onClick={() => this.deleteItem(item.id)}
                          className="btn btn-danger"
                          style={{
                            width: "100%"
                          }}
                        >
                          Delete
                        </a> */}
                        <button
                          className="btn btn-danger"
                          style={{ width: "100%" }}
                          onClick={this.onOpenModal1}
                        >
                          Delete
                        </button>
                        <Modal
                          open={this.state.open1}
                          onClose={this.onCloseModal1}
                          center
                        >
                          <input
                            type="text"
                            name="secret"
                            placeholder="write secret code"
                          />
                          <a
                            href=""
                            onClick={() => this.deleteItem(item.id)}
                            className="btn btn-danger"
                            style={{ width: "100%" }}
                          >
                            Confirm Delete
                          </a>
                        </Modal>
                      </div>
                    </li>
                  );
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
